<#
.SYNOPSIS
  Diagnoses "We can't find the camera / Camera helper is not running" on a
  field station.

.DESCRIPTION
  That message means something specific. It is thrown by camera-bridge.js only
  when the helper CHILD PROCESS is gone -- which also means CameraHost.exe was
  found on disk and the app is in hardware mode (a missing exe falls back to
  the simulator and shows a "Simulator" badge instead). So the build is fine
  and the real question is why CameraHost.exe exited.

  This script answers that by checking, in order:
    1. Is the app still running (it must be closed -- it owns the helper)
    2. Are there orphaned CameraHost.exe processes holding the USB session
    3. Does CameraHost.exe exist where the app expects it
    4. Is it still carrying Windows' Mark of the Web (the #1 field cause --
       the main exe can be clicked past, a hidden child process cannot)
    5. Is .NET Framework 4.8 installed (the helper will not start without it)
    6. Are the vendored native DLLs present
    7. Is another app holding the camera (EOS Utility, RPS, etc.)
    8. What the helper's own log says about the last spawn
    9. ACTUALLY LAUNCHING the helper and sending it a detect -- the decisive
       test, because it surfaces the error Windows hides when the app spawns
       it with windowsHide

  This file SHIPS INSIDE the portable build, next to the exe, because a
  diagnostic that is not on the machine when you need it is useless -- the
  station has the deploy folder and nothing else. Double-click
  "Check Camera Helper.bat" beside it, or run this directly.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File "C:\preflight-ops-check\diagnose-camera-helper.ps1"

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File diagnose-camera-helper.ps1 -InstallRoot "D:\preflight-ops-check"
#>
param(
  [string] $InstallRoot = "",
  [switch] $SkipLaunchTest
)

# Work out which install to inspect. When this file sits beside the exe (the
# shipped case) its own folder IS the install, so the script works wherever
# the build was extracted rather than assuming the standard path. Run from the
# repo's scripts\ folder there is no exe next to it, so fall back to the path
# the Kaseya procedure creates.
if (-not $InstallRoot) {
  if (Test-Path -LiteralPath (Join-Path $PSScriptRoot "Camera Flight Check.exe")) {
    $InstallRoot = $PSScriptRoot
  } else {
    $InstallRoot = "C:\preflight-ops-check"
  }
}

$ErrorActionPreference = 'Continue'
$problems = @()
$notes    = @()

function Section($t) { Write-Host ""; Write-Host "== $t" -ForegroundColor Cyan }
function Good($t)    { Write-Host "   OK   $t" -ForegroundColor Green }
function Bad($t)     { Write-Host "   BAD  $t" -ForegroundColor Red }
function Warn($t)    { Write-Host "   --   $t" -ForegroundColor Yellow }

Write-Host ""
Write-Host "Camera helper diagnostic" -ForegroundColor White
Write-Host "Install root: $InstallRoot"

# --------------------------------------------------------------- 1. app running
Section "App and helper processes"
$app = @(Get-Process -Name "Camera Flight Check" -ErrorAction SilentlyContinue)
if ($app.Count -gt 0) {
  Bad "The app is still running ($($app.Count) process(es))."
  Warn "Close it before the launch test -- it owns the camera and the helper."
  $problems += "Close the app, then re-run this script."
} else {
  Good "App is not running."
}

$orphans = @(Get-Process -Name "CameraHost" -ErrorAction SilentlyContinue)
if ($orphans.Count -gt 0) {
  Bad "$($orphans.Count) orphaned CameraHost.exe still running (holds the USB session)."
  foreach ($o in $orphans) { Write-Host "        PID $($o.Id)  started $($o.StartTime)" }
  $problems += "Kill orphans:  taskkill /F /IM CameraHost.exe"
} else {
  Good "No orphaned CameraHost.exe."
}

# --------------------------------------------------------------- 2. helper present
Section "Helper files"
$helperDir = Join-Path $InstallRoot "resources\camera-host"
$exe       = Join-Path $helperDir "CameraHost.exe"

if (-not (Test-Path -LiteralPath $exe)) {
  Bad "CameraHost.exe NOT found at $exe"
  $problems += "The helper is missing from this install -- re-extract the portable zip."
  Warn "Note: if it were really missing the app would show a 'Simulator' badge,"
  Warn "so check -InstallRoot is the folder the app actually runs from."
} else {
  Good "CameraHost.exe present ($((Get-Item $exe).Length) bytes)"

  # Vendored natives -- EDSDK needs the VC++140 runtimes beside it.
  $need = @("CameraControl.Devices.dll","EDSDK.dll","EdsImage.dll","Newtonsoft.Json.dll",
            "msvcp140.dll","vcruntime140.dll","vccorlib140.dll","concrt140.dll")
  $missing = @($need | Where-Object { -not (Test-Path -LiteralPath (Join-Path $helperDir $_)) })
  if ($missing.Count -gt 0) {
    Bad "Missing native DLLs: $($missing -join ', ')"
    $problems += "Re-extract the portable zip -- the helper folder is incomplete."
  } else {
    Good "All vendored DLLs present."
  }
}

# --------------------------------------------------------------- 3. Mark of the Web
Section "Mark of the Web (SmartScreen)"
if (Test-Path -LiteralPath $helperDir) {
  $blocked = @(Get-ChildItem -LiteralPath $helperDir -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { Get-Item $_.FullName -Stream Zone.Identifier -ErrorAction SilentlyContinue })
  if ($blocked.Count -gt 0) {
    Bad "$($blocked.Count) helper file(s) still blocked by Windows."
    $blocked | Select-Object -First 8 | ForEach-Object { Write-Host "        $($_.Name)" }
    Write-Host "   >> THIS IS ALMOST CERTAINLY THE CAUSE." -ForegroundColor Red
    Write-Host "      The app's own exe can be clicked past with 'Run anyway'."
    Write-Host "      CameraHost.exe is spawned hidden, so there is nothing to click"
    Write-Host "      -- Windows just kills it, and the app reports it as missing."
    $problems += "Run:  Get-ChildItem `"$InstallRoot`" -Recurse -File | Unblock-File"
  } else {
    Good "Nothing in the helper folder is blocked."
  }

  # The whole install matters too, not just the helper folder.
  $allBlocked = @(Get-ChildItem -LiteralPath $InstallRoot -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { Get-Item $_.FullName -Stream Zone.Identifier -ErrorAction SilentlyContinue })
  if ($allBlocked.Count -gt 0) {
    Warn "$($allBlocked.Count) blocked file(s) elsewhere in $InstallRoot -- unblock the whole folder."
  }
}

# --------------------------------------------------------------- 4. .NET 4.8
Section ".NET Framework 4.8"
$ndp = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full' -ErrorAction SilentlyContinue
if ($null -eq $ndp -or $null -eq $ndp.Release) {
  Bad ".NET Framework 4.x not detected. The helper cannot start without 4.8."
  $problems += "Install .NET Framework 4.8: https://dotnet.microsoft.com/download/dotnet-framework/net48"
} elseif ($ndp.Release -lt 528040) {
  Bad ".NET Framework present but older than 4.8 (Release $($ndp.Release), need 528040+)."
  $problems += "Install .NET Framework 4.8: https://dotnet.microsoft.com/download/dotnet-framework/net48"
} else {
  Good ".NET Framework 4.8+ installed (Release $($ndp.Release))."
}

# --------------------------------------------------------------- 5. camera owners
Section "Other apps that could hold the camera"
$rivals = @("EOS Utility","EOSUtility","EOS Utility 2","EOS Utility 3","Nikon Transfer 2",
            "CameraControl","digiCamControl","obs64","obs32","RPS","Skype","Teams","Zoom")
$found = @()
foreach ($r in $rivals) {
  $p = Get-Process -Name $r -ErrorAction SilentlyContinue
  if ($p) { $found += $r }
}
if ($found.Count -gt 0) {
  Warn "Running: $($found -join ', ')"
  Warn "Only one app can own the camera's USB session. Close these and retry."
  $notes += "Close camera-owning apps: $($found -join ', ')"
} else {
  Good "No known camera-owning app running."
}

# --------------------------------------------------------------- 6. the helper log
Section "Helper log (what happened on the last spawn)"
$logCandidates = @(
  (Join-Path $InstallRoot "Diagnostics\camera-host.log"),
  (Join-Path $env:APPDATA "Camera Flight Check\camera-host.log")
)
$log = $logCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $log) {
  Warn "No camera-host.log found. Looked in:"
  $logCandidates | ForEach-Object { Write-Host "        $_" }
  Warn "No log at all usually means the helper never spawned on this machine,"
  Warn "or Diagnostics points somewhere else (Settings > File Output Paths)."
} else {
  Good "Log: $log"
  Write-Host ""
  Write-Host "   --- last 25 lines ---" -ForegroundColor DarkGray
  Get-Content -LiteralPath $log -Tail 25 | ForEach-Object { Write-Host "   $_" -ForegroundColor DarkGray }
  Write-Host "   --- end ---" -ForegroundColor DarkGray

  $exitLine = Get-Content -LiteralPath $log -Tail 200 |
    Where-Object { $_ -match 'helper exited (-?\d+)' } | Select-Object -Last 1
  if ($exitLine -and $exitLine -match 'helper exited (-?\d+)') {
    $code = [int]$Matches[1]
    Write-Host ""
    switch ($code) {
      0           { Warn "Last exit code 0 -- a CLEAN shutdown. The helper was told to quit (end of a run, or app handoff) and the screen was reached again without relaunching the app. Restarting the app fixes this one." }
      -1073741515 { Bad  "Exit 0xC0000135 -- a required DLL could not be loaded. Usually .NET 4.8 or the VC++140 runtimes." }
      -1073741701 { Bad  "Exit 0xC000007B -- bad image format. A 64-bit DLL got mixed into the 32-bit helper folder." }
      -532462766  { Bad  "Exit 0xE0434352 -- unhandled .NET exception at startup. The lines above should name it." }
      -1073741819 { Bad  "Exit 0xC0000005 -- access violation, usually inside EDSDK. Replug the camera and retry." }
      default     { Warn "Last exit code $code. See the lines above for the cause." }
    }
  }
}

# --------------------------------------------------------------- 7. launch test
if (-not $SkipLaunchTest -and (Test-Path -LiteralPath $exe) -and $app.Count -eq 0) {
  Section "Launch test (running the helper directly)"
  Write-Host "   Starting CameraHost.exe and sending it a detect..."

  # Make sure the helper's stdin does not start with a byte-order mark.
  #
  # .NET builds Process.StandardInput as a StreamWriter with AutoFlush = true,
  # and the AutoFlush setter calls Flush(), which writes Console.InputEncoding's
  # PREAMBLE straight away. So on a machine whose PowerShell profile sets a
  # BOM-carrying input encoding, simply READING $proc.StandardInput puts EF BB BF
  # on the pipe before we send anything -- CameraHost's JObject.Parse then dies
  # with "Unexpected character encountered while parsing value" and the helper
  # looks broken when it is fine. Writing raw bytes to .BaseStream does NOT
  # avoid this, because evaluating .StandardInput.BaseStream runs the getter.
  #
  # If there is no console the setter throws -- harmless, because that is also
  # the case where the default encoding has no preamble to begin with.
  $prevInputEncoding = $null
  try {
    $prevInputEncoding = [Console]::InputEncoding
    [Console]::InputEncoding = New-Object System.Text.UTF8Encoding $false
  } catch { $prevInputEncoding = $null }

  try {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName               = $exe
    $psi.WorkingDirectory       = $helperDir
    $psi.UseShellExecute        = $false
    $psi.CreateNoWindow         = $true
    $psi.RedirectStandardInput  = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError  = $true

    $proc = [System.Diagnostics.Process]::Start($psi)
    $errTask = $proc.StandardError.ReadToEndAsync()

    # NB: write raw bytes to BaseStream, never $proc.StandardInput.WriteLine().
    # PowerShell 5.1 hands StandardInput a UTF-8 encoder WITH a preamble, so
    # the first line the helper receives starts with a BOM and Newtonsoft
    # rejects it before it ever sees the command. StandardInputEncoding is
    # PS6+, so it is not an option on a field station -- hence the byte write,
    # inline rather than via a helper scriptblock (which did not take).
    $detectBytes = [System.Text.Encoding]::ASCII.GetBytes('{"id":1,"cmd":"detect"}' + "`n")
    $quitBytes   = [System.Text.Encoding]::ASCII.GetBytes('{"id":0,"cmd":"quit"}' + "`n")

    if ($proc.WaitForExit(2000)) {
      Bad "The helper exited immediately (code $($proc.ExitCode)) without being asked to."
      $problems += "CameraHost.exe cannot start on this machine -- see the stderr below."
    } else {
      $proc.StandardInput.BaseStream.Write($detectBytes, 0, $detectBytes.Length)
      $proc.StandardInput.BaseStream.Flush()
      $read = $proc.StandardOutput.ReadLineAsync()
      if ($read.Wait(40000)) {
        $line = $read.Result
        Write-Host "   Reply: $line" -ForegroundColor White
        if ($line -match '"connected"\s*:\s*true') {
          Good "The helper works and SEES THE CAMERA."
          $notes += "The helper is healthy on its own -- if the app still fails, restart the app (see below)."
        } elseif ($line -match '"connected"\s*:\s*false') {
          Warn "The helper works but reports NO camera attached."
          $notes += "Helper is fine. Check cable, power, and that the mode dial is on M."
        } else {
          Bad "Unexpected reply (above) -- the helper started but did not answer a detect."
          $problems += "Helper replied but not with a detect result. Send the reply line and stderr below to the dev team."
        }
      } else {
        Bad "No reply within 40s -- the helper started but is not answering."
        $problems += "Helper hangs on detect. Replug the camera and check for orphan processes."
      }
      try {
        $proc.StandardInput.BaseStream.Write($quitBytes, 0, $quitBytes.Length)
        $proc.StandardInput.BaseStream.Flush()
      } catch {}
      $null = $proc.WaitForExit(4000)
    }

    # Always clean up -- a stuck test process is exactly the orphan that
    # causes this symptom next time.
    if (-not $proc.HasExited) { try { $proc.Kill() } catch {} }

    $stderr = ""
    if ($errTask.Wait(2000)) { $stderr = $errTask.Result }
    if ($stderr -and $stderr.Trim()) {
      Write-Host ""
      Write-Host "   --- helper stderr ---" -ForegroundColor DarkGray
      $stderr.Trim() -split "`n" | Select-Object -First 25 | ForEach-Object { Write-Host "   $_" -ForegroundColor DarkGray }
      Write-Host "   --- end ---" -ForegroundColor DarkGray
    }
  } catch {
    Bad "Could not start CameraHost.exe: $($_.Exception.Message)"
    $problems += "Windows refused to start the helper. This is usually Mark of the Web or antivirus."
  }
  if ($null -ne $prevInputEncoding) {
    try { [Console]::InputEncoding = $prevInputEncoding } catch {}
  }
  # belt and braces -- a stuck test process is the orphan that causes this
  # same symptom on the next launch (it holds the camera's USB session).
  Get-Process -Name "CameraHost" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
} elseif ($app.Count -gt 0) {
  Section "Launch test"
  Warn "Skipped -- close the app first, then re-run."
}

# --------------------------------------------------------------- verdict
Section "What to do"
if ($problems.Count -eq 0 -and $notes.Count -eq 0) {
  Write-Host "   Nothing obviously wrong was found."
  Write-Host "   Restart the app and try again. If it still fails, send the"
  Write-Host "   camera-host.log shown above to the dev team."
} else {
  $n = 1
  foreach ($p in $problems) { Write-Host "   $n. $p" -ForegroundColor Yellow; $n++ }
  foreach ($p in $notes)    { Write-Host "   $n. $p" -ForegroundColor Yellow; $n++ }
}
Write-Host ""
Write-Host "   Note: 'Try again' on that screen cannot recover once the helper"
Write-Host "   has exited -- the app only spawns it at startup. After fixing"
Write-Host "   anything above, CLOSE AND REOPEN the app."
Write-Host ""
