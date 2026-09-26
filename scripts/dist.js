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
const IGNORES = [
  "^/(dist|build|camera-host|\\.claude|sessions|field-test logs)",
  "^/(full-)?location-json-example\\.json$",
  "^/(CLAUDE|CONTEXT|README|DEPLOY|REMEDIATION-PLAN|DESIGN-SNAPSHOT.*)\\.md$",
  "__verify\\.html",
];
run(
  'npx electron-packager . "Camera Flight Check" --platform=win32 --arch=x64 --out=dist --overwrite ' +
  IGNORES.map((re) => `--ignore="${re}" `).join("") +
  '--icon="assets/icon.ico" ' +
  '--extra-resource="build/camera-host"'
);

console.log("\nPackaged: dist\\Camera Flight Check-win32-x64\\Camera Flight Check.exe");
