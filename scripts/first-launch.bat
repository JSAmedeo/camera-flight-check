@echo off
rem ===========================================================================
rem  Camera Flight Check - first launch helper
rem
rem  Copied to the ROOT of the portable folder by scripts/package.js, so it
rem  ends up next to Camera Flight Check.exe in the zip.
rem
rem  A zip that arrived over a network carries Windows' "Mark of the Web", and
rem  Windows copies that tag onto every file it extracts. That tag - not the
rem  app - is what makes SmartScreen say "Windows protected your PC". This
rem  clears it for everything in this folder and then starts the app, so a
rem  tech setting up a machine by hand gets the same clean first launch the
rem  Kaseya procedure produces (see DEPLOY.md step 5).
rem
rem  Needs no admin rights. Safe to run again - it does nothing on files that
rem  are already clear. Run it again after dropping in a new version.
rem ===========================================================================

setlocal
title Camera Flight Check - first launch

echo.
echo  Preparing Camera Flight Check for first use...
echo  Folder: %~dp0
echo.

rem -ExecutionPolicy Bypass isn't needed for -Command, but costs nothing and
rem avoids surprises on a machine with a restrictive policy set.
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$t = Get-ChildItem -LiteralPath '%~dp0' -Recurse -File -ErrorAction SilentlyContinue;" ^
  "$b = @($t | Where-Object { Get-Item $_.FullName -Stream Zone.Identifier -ErrorAction SilentlyContinue });" ^
  "if ($b.Count -eq 0) { Write-Host '  Nothing was blocked - already clear.' } else { $b | Unblock-File; Write-Host ('  Unblocked ' + $b.Count + ' file(s).') }"

if errorlevel 1 (
  echo.
  echo  WARNING: the unblock step did not finish cleanly.
  echo  If Windows shows "Windows protected your PC", choose More info - Run anyway,
  echo  then tell IT this machine could not be unblocked automatically.
  echo.
  pause
)

if not exist "%~dp0Camera Flight Check.exe" (
  echo.
  echo  ERROR: "Camera Flight Check.exe" is not in this folder.
  echo  This file has to sit next to the app, in the folder you unzipped.
  echo.
  pause
  exit /b 1
)

echo  Starting Camera Flight Check...
start "" "%~dp0Camera Flight Check.exe"
endlocal
exit /b 0
