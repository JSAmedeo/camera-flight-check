@echo off
rem ===========================================================================
rem  Camera Flight Check - camera helper diagnostic (support agent tool)
rem
rem  Copied to the ROOT of the portable folder by scripts/package.js, so it
rem  ends up next to Camera Flight Check.exe in the zip.
rem
rem  Written for a support agent, not a developer: double-click, read the
rem  verdict, send the folder it drops on the Desktop. It is READ-ONLY - it
rem  changes no settings and deletes nothing.
rem
rem  Run it when the app shows "We can't find the camera" with the sub-line
rem  "Camera helper is not running". That sub-line means CameraHost.exe was
rem  found and launched and then exited, so the install is fine and the
rem  question is why the helper died.
rem ===========================================================================

setlocal
title Camera Flight Check - Camera Helper Diagnostic

set "PS1=%~dp0diagnose-camera-helper.ps1"
set "EXTRA="

echo.
echo  ============================================================
echo    Camera Flight Check - camera helper diagnostic
echo  ============================================================
echo.
echo   Use this when the app says:
echo.
echo       "We can't find the camera"
echo       "Camera helper is not running"
echo.
echo   This only reads. It changes no settings and deletes nothing.
echo   A report folder is saved to the Desktop to send to IT.
echo.

if not exist "%PS1%" goto :nops1

rem The app owns the camera helper, so the final live test needs it closed.
rem Everything else - including the log scan that names the cause - works
rem fine with the app open, so offer that rather than turning the agent away.
tasklist /FI "IMAGENAME eq Camera Flight Check.exe" 2>nul | find /I "Camera Flight Check.exe" >nul
if errorlevel 1 goto :run

echo  ------------------------------------------------------------
echo   NOTE: Camera Flight Check is still running.
echo.
echo   The last test starts the camera helper directly, and the app
echo   is holding it. Closing the app first gives the full check.
echo   Everything else still works with it open.
echo  ------------------------------------------------------------
echo.
choice /C YN /M "Continue now without that last test"
if errorlevel 2 goto :closefirst
set "EXTRA=-SkipLaunchTest"
goto :run

:closefirst
echo.
echo   Close Camera Flight Check, then run this file again.
echo.
pause
exit /b 0

:nops1
echo  ------------------------------------------------------------
echo   ERROR: diagnose-camera-helper.ps1 is not in this folder.
echo.
echo   This file has to sit beside the app, in the folder that was
echo   unzipped - the same folder as "Camera Flight Check.exe".
echo.
echo   This folder: %~dp0
echo  ------------------------------------------------------------
echo.
pause
exit /b 1

:run
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%" -Report %EXTRA%
if errorlevel 1 (
  echo.
  echo   The diagnostic did not finish cleanly. Tell IT what is on screen.
  echo.
)

echo.
echo  ============================================================
echo    Done. Send the report folder named above to IT.
echo  ============================================================
echo.
pause
endlocal
exit /b 0
