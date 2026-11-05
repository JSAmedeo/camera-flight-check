@echo off
rem ===========================================================================
rem  Camera Flight Check - camera helper diagnostic
rem
rem  Copied to the ROOT of the portable folder by scripts/package.js, so it
rem  ends up next to Camera Flight Check.exe in the zip.
rem
rem  Run this when the app says "We can't find the camera" with the sub-line
rem  "Camera helper is not running". That message means CameraHost.exe was
rem  found and launched and then EXITED - so the install is fine and the
rem  question is why the helper died. This finds out.
rem
rem  Read-only: it inspects the install and launches the helper once to ask
rem  it for a camera. It changes no settings and deletes nothing.
rem ===========================================================================

setlocal
title Camera Flight Check - camera helper diagnostic

rem The app owns the helper, so it has to be closed for the launch test.
tasklist /FI "IMAGENAME eq Camera Flight Check.exe" 2>nul | find /I "Camera Flight Check.exe" >nul
if not errorlevel 1 (
  echo.
  echo  Camera Flight Check is still running.
  echo  Close it first - it owns the camera and the helper - then run this again.
  echo.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0diagnose-camera-helper.ps1"

echo.
echo  Send the output above to IT if it did not resolve the problem.
echo.
pause
endlocal
exit /b 0
