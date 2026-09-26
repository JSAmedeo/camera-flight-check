// Verifies the run log the app WRITES, not the screens it shows.
// Usage: npm run verify:runlog
//
// Why this exists: on 2026-09-24 every station was found to be logging
// locationName: null. Retiring assets/malls.csv moved the mall name from a
// stored field to a derived one, the Welcome screen was updated to read the
// derived value, and the run-log writer was not. Nothing surfaced it, because
// the run log has no UI -- the project verifies with headless screenshots,
// which are blind to an artifact nobody looks at. It took field logs from
// three venues to notice.
//
// The guard therefore drives a real run and then reads the file back. It runs
// entirely inside a temp --user-data-dir, so it never touches the real
// %APPDATA% settings, the real check-runs.jsonl, or C:\preflight-ops-check.

const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.join(__dirname, "..");
const LOCATION = { number: "1126", expectedName: "Columbia Mall" };

let tmp = null;
let verifyHtml = null;

function cleanup() {
  // Exact paths only -- never a glob or a sweep (CLAUDE.md gotcha #22).
  if (verifyHtml) { try { fs.rmSync(verifyHtml, { force: true }); } catch {} }
  if (tmp) { try { fs.rmSync(tmp, { recursive: true, force: true }); } catch {} }
}

function fail(msg, detail) {
  console.error("\nFAIL: " + msg);
  if (detail) console.error(detail);
  cleanup();
  process.exit(1);
}

try {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cfc-runlog-"));

  // A minimal directory: one location, enough to resolve a name. Deliberately
  // hand-written rather than boiled from a feed sample, so the check is
  // self-contained and works on a machine that has never fetched anything.
  fs.writeFileSync(path.join(tmp, "location-directory.json"), JSON.stringify({
    version: 1,
    fetchedAt: new Date().toISOString(),
    sourceUrl: "verify-runlog fixture",
    count: 1,
    locations: { "1126": { mall: LOCATION.expectedName, rm: null, dm: null } },
  }));

  // feedUrl blank so the run makes no network call; paths kept inside tmp so
  // nothing lands in the real output folders.
  fs.writeFileSync(path.join(tmp, "settings.json"), JSON.stringify({
    location: { number: LOCATION.number, name: "", station: "Camera" },
    paths: {
      completionLogs: path.join(tmp, "Logs"),
      testPhotos: path.join(tmp, "Photos"),
      diagnostics: path.join(tmp, "Diagnostics"),
    },
    helpAuto: { feedUrl: "", seasonOverride: "", fetchRegional: true, fetchDistrict: true, placeholderRemoved: true },
    settingsPasswordEnabled: false,
  }, null, 2));

  // Drive a run: the Start button is what emits check_started.
  verifyHtml = path.join(root, "__verify.html");
  const html = fs.readFileSync(path.join(root, "Camera Flight Check.html"), "utf8");
  fs.writeFileSync(verifyHtml, html.replace("</body>", `<script>
    setTimeout(() => {
      const b = [...document.querySelectorAll("button")].find((x) => /^Start/.test((x.textContent || "").trim()));
      if (b) b.click();
    }, 4000);
  </script></body>`));

  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE; // gotcha #1
  console.log("Driving a check run in a scratch profile…");
  execFileSync("npx", [
    "electron", ".",
    "--verify", "--simulate",
    "--screenshot=" + path.join(tmp, "shot.png"),
    "--shot-delay=8000",
    "--user-data-dir=" + tmp,
  ], { cwd: root, env, stdio: "ignore", shell: true, timeout: 120000 });

  const logFile = path.join(tmp, "check-runs.jsonl");
  if (!fs.existsSync(logFile)) fail("no check-runs.jsonl was written — the run never started");

  const started = fs.readFileSync(logFile, "utf8").trim().split(/\r?\n/)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter((o) => o && o.type === "check_started");

  if (!started.length) fail("check-runs.jsonl has no check_started record");
  const rec = started[started.length - 1];

  const problems = [];
  if (!rec.runId) problems.push("runId is missing");
  if (!rec.startedAt) problems.push("startedAt is missing");
  if (rec.locationNumber !== LOCATION.number) {
    problems.push(`locationNumber is ${JSON.stringify(rec.locationNumber)}, expected ${JSON.stringify(LOCATION.number)}`);
  }
  // The regression this file exists for.
  if (rec.locationName !== LOCATION.expectedName) {
    problems.push(
      `locationName is ${JSON.stringify(rec.locationName)}, expected ${JSON.stringify(LOCATION.expectedName)}` +
      (rec.locationName === null
        ? "\n         null means the writer read settings.location.name (the override, normally blank)" +
          "\n         instead of settings.locationNameResolved (the answer). See CLAUDE.md § Run log."
        : ""));
  }

  if (problems.length) fail("check_started is malformed:", problems.map((p) => "  - " + p).join("\n") +
    "\n\n  record: " + JSON.stringify(rec));

  console.log("PASS: check_started wrote " + JSON.stringify(rec.locationNumber) +
    " / " + JSON.stringify(rec.locationName));
  cleanup();
} catch (e) {
  fail("verification could not run: " + e.message);
}
