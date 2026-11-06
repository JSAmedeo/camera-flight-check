// Builds the camera helper, stages it, and packages the desktop app.
// Usage: npm run dist

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const run = (cmd) => {
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE; // breaks electron tooling when inherited from IDEs
  execSync(cmd, { stdio: "inherit", cwd: root, env });
};

// 1. build the .NET camera helper
run("dotnet build camera-host -c Release -v q");

// 2. stage its output as a folder named camera-host (extra-resource keeps the basename)
const stage = path.join(root, "build", "camera-host");
fs.rmSync(stage, { recursive: true, force: true });
fs.cpSync(path.join(root, "camera-host", "bin", "Release"), stage, { recursive: true });

// 3. package the Electron app with the helper embedded under resources/camera-host
//
// The ignore list is a DATA-EXPOSURE control, not just size trimming. This app
// ships unpacked (no asar), so anything left in the project root is readable on
// every station PC. `full-location-json-example.json` alone is 2.3MB of live
// company data -- last-year sales, contract net, minimum wage, commission
// notes -- and `field-test logs/` holds real venue evidence including manager
// contact details and grey-card captures. Both were reaching the field build
// until 2026-09-26; .gitignore does NOT cover this, the packager has its own
// list. Anything new in the root that holds real data must be added here.
//
// LICENSE and THIRD-PARTY-NOTICES.md deliberately stay in: they need to ship
// with the binaries they cover.
//
// NO `|` ALTERNATION IN THESE PATTERNS. The command below goes through a
// shell, and cmd.exe splits on a pipe that PowerShell's quoting does not
// protect, so the build failed with "'CONTEXT' is not recognized as an
// internal or external command" when run from PowerShell while working fine
// from Git Bash. One regex per line costs nothing, is easier to grep when
// asking "is this file excluded?", and keeps the build shell-independent.
const IGNORES = [
  // build output and tooling
  "^/dist",
  "^/build",
  "^/camera-host",
  "^/\\.claude",
  "^/sessions",
  // The whole scripts folder stays out. Nothing in it is needed at runtime,
  // and reset-settings-keys.ps1 rewrites a station's settings.json -- an
  // operator finding that is a worse problem than the one it solves. The two
  // field-tech tools people DO need (Check Camera Helper.bat and
  // diagnose-camera-helper.ps1) are copied from here to the packaged ROOT by
  // scripts/package.js, next to the exe, which is the only place a support
  // agent should be looking. Caught 2026-11-05 by checking the packaged
  // output rather than the repo -- see gotcha #26.
  "^/scripts",
  // real field/company data -- see the note above, this is the control
  "^/field-test logs",
  "^/location-json-example\\.json$",
  "^/full-location-json-example\\.json$",
  // internal docs
  "^/CLAUDE\\.md$",
  "^/CONTEXT\\.md$",
  "^/README\\.md$",
  "^/DEPLOY\\.md$",
  "^/REMEDIATION-PLAN\\.md$",
  "^/DESIGN-SNAPSHOT.*\\.md$",
  // headless-verification scratch copy (gotcha #19)
  "__verify\\.html",
];
run(
  'npx electron-packager . "Camera Flight Check" --platform=win32 --arch=x64 --out=dist --overwrite ' +
  IGNORES.map((re) => `--ignore="${re}" `).join("") +
  '--icon="assets/icon.ico" ' +
  '--extra-resource="build/camera-host"'
);

// 4. electron-packager writes a root-level `version` file holding the
// ELECTRON version (31.7.7), which reads like the app's version to anyone
// checking a station. Nothing reads it at runtime, so it carries ours instead,
// with Electron's kept underneath for reference.
const outDir = path.join(root, "dist", "Camera Flight Check-win32-x64");
const versionFile = path.join(outDir, "version");
const electronVersion = fs.readFileSync(versionFile, "utf8").trim();
const appVersion = require(path.join(root, "package.json")).version;
fs.writeFileSync(versionFile, `Camera Flight Check ${appVersion}\r\nElectron ${electronVersion}\r\n`);

console.log("\nPackaged: dist\\Camera Flight Check-win32-x64\\Camera Flight Check.exe");
