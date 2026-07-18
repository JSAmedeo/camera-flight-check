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
run(
  'npx electron-packager . "Camera Flight Check" --platform=win32 --arch=x64 --out=dist --overwrite ' +
  '--ignore="^/(dist|build|camera-host|\\.claude)" --ignore="__verify\\.html" ' +
  '--extra-resource="build/camera-host"'
);

console.log("\nPackaged: dist\\Camera Flight Check-win32-x64\\Camera Flight Check.exe");
