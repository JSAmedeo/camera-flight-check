// Camera Flight Check — location directory.
//
// Mall names and the regional/district manager contacts come from the company
// location feed rather than being typed into every station by hand. IT is the
// admin here and isn't on site, so a mid-season manager change has to land at
// the venue with nobody touching anything.
//
// Why a local directory file at all: venues run on cellular routers that drop
// out for hours at a time, and the check has to work straight through that.
// The feed is fetched once per launch in the background; everything the app
// actually reads comes from the boiled-down copy on disk, which NEVER expires.
// A station that hasn't been online in a month still shows its mall name and
// both managers. A failed fetch is a no-op, never a reason to show less.
//
// Only the mall name and six contact fields are kept. The raw feed record also
// carries last-year sales, contract net, minimum wage and free-text commission
// notes -- none of that is ever written to disk or logged. Keep it that way:
// boilDown() is the only thing that should ever touch a parsed feed row.

const path = require("path");
const fs = require("fs");

const DIRECTORY_VERSION = 1;
const DIRECTORY_FILE = "location-directory.json";

const FETCH_TIMEOUT_MS = 20000;
// The real feed is ~2.3MB for 552 locations. The cap is pure protection
// against a misconfigured URL streaming something enormous at us.
const MAX_RESPONSE_BYTES = 32 * 1024 * 1024;

// Retry schedule used ONLY while no directory has ever been stored. Normally
// one attempt per launch is right -- the app starts several times a day, so a
// missed refresh costs nothing. But a station with no directory at all shows
// no mall name and no managers, and a cellular router that's down at 9am is
// often back by 9:20, so the cold-start case gets a few more chances before
// giving up until the next launch.
const COLD_START_RETRIES_MS = [30 * 1000, 2 * 60 * 1000, 5 * 60 * 1000];

// ------------------------------------------------------------------ helpers

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

// Location numbers are zero-padded 4-digit in both hostnames (MALL0189-Camera)
// and the feed ("0189"), with a handful of 6-digit ones -- so the two already
// agree and this is belt-and-braces. It exists so a hand-typed "189" in the
// admin Settings screen still matches. Never parseInt: a non-numeric location
// would silently become NaN and match everything or nothing.
function normalizeLocationKey(value) {
  const raw = String(value == null ? "" : value).trim();
  if (!raw) return "";
  if (/^\d+$/.test(raw)) return raw.replace(/^0+/, "") || "0";
  return raw.toLowerCase();
}

// A manager is only usable if we know who they are AND how to reach them --
// a card with a name and no number is worse than no card, and ~3% of venues
// genuinely have no regional or no district manager listed.
function person(nameObj, phone, email, areaObj) {
  const name = text(nameObj && nameObj.name);
  const p = text(phone);
  const e = text(email);
  if (!name || (!p && !e)) return null;
  return { name, phone: p, email: e, area: text(areaObj && areaObj.name) };
}

function unwrapRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    for (const key of ["results", "data", "records", "items"]) {
      if (Array.isArray(payload[key])) return payload[key];
    }
  }
  return null;
}

// ------------------------------------------------------------------ seasons

// The feed is published per season: S2026 is Santa 2026, B2027 is Bunny (Easter)
// 2027. Santa runs Aug 1 - Jan 31 and carries the year of ITS Christmas, so a
// check run during a January teardown still asks for the season that's ending
// rather than flipping to Bunny at New Year. Bunny runs Feb 1 - Jul 31.
//
//   Sep 2026 -> S2026     Jan 2027 -> S2026 (still Santa)
//   Feb 2027 -> B2027     Aug 2027 -> S2027
function currentSeasonCode(date) {
  const d = date || new Date();
  const month = d.getMonth() + 1; // 1-12
  const year = d.getFullYear();
  if (month === 1) return "S" + (year - 1); // January belongs to the Santa season that just ran
  if (month >= 8) return "S" + year;
  return "B" + year;
}

// The admin-configured URL is a template: any {season} in it is replaced with
// the code above, or with an explicit override when IT has set one (a season
// running long, a one-off backfill). A URL with no {season} in it is used
// verbatim, so pointing this at a fixed file still works.
function resolveFeedUrl(settings, date) {
  const auto = (settings && settings.helpAuto) || {};
  const url = text(auto.feedUrl);
  if (!url) return "";
  const season = text(auto.seasonOverride) || currentSeasonCode(date);
  return url.replace(/\{season\}/g, season);
}

// ------------------------------------------------------------- boiling down

// Turns a parsed feed payload into the small map the app stores. Throws on a
// shape it doesn't recognize -- callers treat that as a failed refresh and
// keep whatever directory they already had.
function boilDown(payload, sourceUrl) {
  const rows = unwrapRows(payload);
  if (!rows) throw new Error("unrecognized payload shape");

  const locations = {};
  let duplicates = 0;
  for (const row of rows) {
    const c = row && row.columns;
    if (!c || c.isinactive) continue;
    const key = normalizeLocationKey(c.name);
    if (!key) continue;
    // Two kiosks at one mall would collide; first non-inactive wins.
    if (locations[key]) { duplicates++; continue; }
    locations[key] = {
      mall: text(c.custrecord_tnp_location_mall_name),
      rm: person(c.custrecord_tnp_mall_list_regional, c.rm_phone, c.rm_email, c.custrecord_tnp_location_region),
      dm: person(c.district_manager, c.dm_phone, c.dm_email, c.custrecord_tnp_location_district),
    };
  }

  const count = Object.keys(locations).length;
  if (!count) throw new Error("payload contained no usable locations");
  return {
    version: DIRECTORY_VERSION,
    fetchedAt: new Date().toISOString(),
    sourceUrl: sourceUrl || "",
    count,
    duplicates,
    locations,
  };
}

// ----------------------------------------------------------------- storage

function directoryPath(userDataDir) {
  return path.join(userDataDir, DIRECTORY_FILE);
}

// Returns null when there's no usable directory. A read/parse failure is
// deliberately NOT a delete -- the file stays put so it can be looked at.
function readDirectory(userDataDir) {
  try {
    const parsed = JSON.parse(fs.readFileSync(directoryPath(userDataDir), "utf8"));
    if (!parsed || !parsed.locations || typeof parsed.locations !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

// Write to a temp file and rename over the target: a rename within one
// directory is atomic on NTFS, so a crash or a pulled plug mid-write can
// never leave a half-written directory behind. Never unlink the target first
// -- that would open a window where the station has nothing.
function writeDirectory(userDataDir, directory) {
  const target = directoryPath(userDataDir);
  const tmp = target + ".tmp";
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(tmp, JSON.stringify(directory));
    fs.renameSync(tmp, target);
    return true;
  } catch (e) {
    // Exact path only, never a glob or a sweep of the directory -- see
    // CLAUDE.md gotcha #22.
    try { fs.rmSync(tmp, { force: true }); } catch {}
    throw e;
  }
}

// ----------------------------------------------------------------- lookups

function lookupRecord(directory, locationNumber) {
  const key = normalizeLocationKey(locationNumber);
  if (!key || !directory || !directory.locations) return null;
  return directory.locations[key] || null;
}

// The directory's mall name wins unless IT typed something different into the
// Settings screen. Checking "saved === directory name" rather than a one-time
// migration flag means stations whose saved name came from the retired
// malls.csv (identical strings) silently resume tracking the feed, a mall
// renamed at source updates itself, and a genuinely custom name is preserved.
function resolveLocationName(settings, directory) {
  const saved = text(settings && settings.location && settings.location.name);
  const record = lookupRecord(directory, settings && settings.location && settings.location.number);
  const fromFeed = text(record && record.mall);
  if (!fromFeed) return saved;
  if (!saved || saved === fromFeed) return fromFeed;
  return saved;
}

// ----------------------------------------------------------------- fetching

// `net` is Electron's net module, passed in rather than required here so this
// file stays plain Node (and so it can be exercised without an Electron app).
// electron.net is deliberate: it uses Chromium's stack, so it honors the
// machine's proxy/PAC settings and the Windows certificate store. node:https
// does neither, which matters on mall networks.
function fetchFeed(net, url) {
  return new Promise((resolve, reject) => {
    let parsedUrl;
    try { parsedUrl = new URL(url); } catch { return reject(new Error("invalid feed URL")); }
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return reject(new Error("feed URL must be http or https"));
    }

    let settled = false;
    const finish = (err, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      err ? reject(err) : resolve(value);
    };

    const request = net.request({ url, method: "GET", redirect: "follow" });
    const timer = setTimeout(() => {
      try { request.abort(); } catch {}
      finish(new Error("timed out after " + Math.round(FETCH_TIMEOUT_MS / 1000) + "s"));
    }, FETCH_TIMEOUT_MS);

    request.on("response", (response) => {
      if (response.statusCode !== 200) {
        try { request.abort(); } catch {}
        return finish(new Error("HTTP " + response.statusCode));
      }
      const chunks = [];
      let bytes = 0;
      response.on("data", (chunk) => {
        bytes += chunk.length;
        if (bytes > MAX_RESPONSE_BYTES) {
          try { request.abort(); } catch {}
          return finish(new Error("response exceeded size cap"));
        }
        chunks.push(chunk);
      });
      response.on("end", () => {
        // A parse failure is just a failed refresh. Never try to repair or
        // leniently parse a truncated body -- half a directory is worse than
        // yesterday's whole one.
        try {
          finish(null, JSON.parse(Buffer.concat(chunks).toString("utf8")));
        } catch (e) {
          finish(new Error("could not parse feed JSON: " + e.message));
        }
      });
      response.on("error", (e) => finish(e instanceof Error ? e : new Error(String(e))));
    });
    request.on("error", (e) => finish(e instanceof Error ? e : new Error(String(e))));
    request.end();
  });
}

// Writes to the first directory that accepts it. `dirs` is ordered by
// preference -- for a portable build that's the folder holding the exe, with
// userData behind it in case the deploy folder turns out to be read-only
// (Program Files, a locked-down share, a UNC path). Returns the path written.
function writeDirectoryToFirst(dirs, directory) {
  let lastError = null;
  for (const dir of dirs) {
    try {
      writeDirectory(dir, directory);
      return dir;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("no writable location for the directory file");
}

// Reads from the first directory that has a usable file, same order as above.
function readDirectoryFromFirst(dirs) {
  for (const dir of dirs) {
    const found = readDirectory(dir);
    if (found) return { directory: found, dir };
  }
  return { directory: null, dir: null };
}

// One refresh attempt. Resolves { ok, directory, error } and never throws --
// a station being offline is an ordinary state here, not an error path.
async function refreshOnce({ net, url, dirs, log }) {
  try {
    const payload = await fetchFeed(net, url);
    const directory = boilDown(payload, url);
    const written = writeDirectoryToFirst(dirs, directory);
    log && log("location directory written to " + written);
    log && log("location directory updated: " + directory.count + " locations" +
      (directory.duplicates ? " (" + directory.duplicates + " duplicate numbers ignored)" : ""));
    return { ok: true, directory, error: null };
  } catch (e) {
    // Never log the response body -- see the file header.
    log && log("location directory refresh failed: " + e.message);
    return { ok: false, directory: null, error: e.message };
  }
}

// Kicks off the background refresh. Fire-and-forget by design: nothing on the
// operator's path ever awaits this. `onUpdated` is called with the new
// directory after a successful fetch so the running session can pick it up
// without waiting for the next launch.
function startRefresh({ net, url, dirs, hasDirectory, log, onUpdated, onStatus }) {
  const attempts = hasDirectory ? [0] : [0, ...COLD_START_RETRIES_MS];
  let index = 0;

  const attempt = async () => {
    const result = await refreshOnce({ net, url, dirs, log });
    onStatus && onStatus({
      lastAttemptAt: new Date().toISOString(),
      lastError: result.ok ? null : result.error,
    });
    if (result.ok) {
      onUpdated && onUpdated(result.directory);
      return;
    }
    index += 1;
    if (index < attempts.length) setTimeout(attempt, attempts[index]);
  };

  setTimeout(attempt, attempts[0]);
}

module.exports = {
  DIRECTORY_FILE,
  COLD_START_RETRIES_MS,
  normalizeLocationKey,
  currentSeasonCode,
  resolveFeedUrl,
  boilDown,
  directoryPath,
  readDirectory,
  writeDirectory,
  readDirectoryFromFirst,
  writeDirectoryToFirst,
  lookupRecord,
  resolveLocationName,
  fetchFeed,
  refreshOnce,
  startRefresh,
};
