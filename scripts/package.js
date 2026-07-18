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
    noMsi: true,
  });
  console.log("Installer: " + path.join(outDir, "Camera Flight Check Setup.exe"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
