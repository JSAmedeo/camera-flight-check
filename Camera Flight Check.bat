@echo off
rem Launches Camera Flight Check as a desktop app (dev mode — requires `npm install` once).
rem For deployment, use the packaged exe in dist\ instead (built with `npm run dist`).
set ELECTRON_RUN_AS_NODE=
start "" /D "%~dp0" "%~dp0node_modules\electron\dist\electron.exe" "%~dp0."
