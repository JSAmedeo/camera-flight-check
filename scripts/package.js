// Builds the deployable field artifacts:
//   1. dist\Camera Flight Check-win32-x64\        (raw packaged app — `npm run dist`)
//   2. dist\CameraFlightCheck-<version>-portable.zip   (unzip-and-run)
//   3. dist\installer\Camera Flight Check Setup.exe    (one-click per-user installer)
// Usage: npm run package

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, "..");
const version = require(path.join(root, "package.json")).version;
const appDir = path.join(root, "dist", "Camera Flight Check-win32-x64");

const run = (cmd) => {
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  execSync(cmd, { stdio: "inherit", cwd: root, env });
};

async function main() {
  // 1. fresh packaged app (builds camera-host too)
  run("node scripts/dist.js");

  // 1b. drop the field-tech helpers at the ROOT of the packaged folder, next
  // to the exe, so they're there when the zip is extracted. They can't be
  // shipped via electron-packager (that only places files under resources/),
  // and the folder is rebuilt from scratch by dist.js on every run, so this
  // has to happen after step 1 and before the zip in step 2.
  //
  // Both are read-only or self-contained on purpose. Note what is NOT here:
  // reset-settings-keys.ps1 rewrites a station's config, and an operator
  // double-clicking that is a worse problem than the one it solves.
  const rootFiles = [
    ["first-launch.bat", "First Launch.bat"],
    ["check-camera-helper.bat", "Check Camera Helper.bat"],
    // The diagnostic itself. A station has the deploy folder and nothing
    // else, so a tool that lives only in the repo cannot be run where it is
    // actually needed -- which is exactly how it failed first time out.
    ["diagnose-camera-helper.ps1", "diagnose-camera-helper.ps1"],
  ];
  for (const [src, dest] of rootFiles) {
    fs.copyFileSync(path.join(root, "scripts", src), path.join(appDir, dest));
    console.log("Added: " + dest);
  }

  // 2. portable zip (remove zips from older versions so only the current one exists)
  for (const f of fs.readdirSync(path.join(root, "dist"))) {
    if (/^CameraFlightCheck-.*-portable\.zip$/.test(f)) {
      fs.rmSync(path.join(root, "dist", f), { force: true });
    }
  }
  const zipPath = path.join(root, "dist", `CameraFlightCheck-${version}-portable.zip`);
  console.log("\nCreating portable zip…");
  run(
    `powershell -NoProfile -Command "Compress-Archive -Path '${appDir}\\*' -DestinationPath '${zipPath}' -Force"`
  );
  console.log("Portable zip: " + zipPath);

  // 3. Squirrel one-click installer
  console.log("\nCreating installer (this takes a few minutes)…");
  const { createWindowsInstaller } = require("electron-winstaller");
  const outDir = path.join(root, "dist", "installer");
  fs.rmSync(outDir, { recursive: true, force: true });
  await createWindowsInstaller({
    appDirectory: appDir,
    outputDirectory: outDir,
    name: "CameraFlightCheck", // nupkg id — no spaces allowed
    title: "Camera Flight Check",
    authors: "Cherry Hill Programs",
    description: "Camera pre-flight utility — daily station readiness check",
    exe: "Camera Flight Check.exe",
    setupExe: "Camera Flight Check Setup.exe",
    // The Setup.exe's own icon. The desktop and Start Menu shortcuts Squirrel
    // creates take their icon from the exe itself (embedded by
    // electron-packager --icon in dist.js), so they're covered without doing
    // anything here.
    //
    // No iconUrl on purpose: it only drives the Add-or-Remove-Programs entry,
    // it has to be a URL resolvable ON THE TARGET MACHINE, and a file:// path
    // to this build machine's dist folder would simply be missing everywhere
    // else. Without it that one entry shows a generic icon. If that ever
    // matters, host the .ico at a real https URL and set it here.
    setupIcon: path.join(root, "assets", "icon.ico"),
    noMsi: true,
  });
  console.log("Installer: " + path.join(outDir, "Camera Flight Check Setup.exe"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
