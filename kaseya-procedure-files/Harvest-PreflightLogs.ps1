<#
.SYNOPSIS
    Collects the Pre-Flight Ops Check (Camera Flight Check) logs from a station into one zip
    for a Kaseya VSA procedure to upload with getFile.

.DESCRIPTION
    Copies -- never moves or deletes -- every useful log and context file into a single zip.
    Until the app posts to the company API, these files only exist on the station, so the
    originals are always left in place.

    Collected (missing items are listed in manifest.txt, not treated as errors):
      Per user profile, C:\Users\<user>\AppData\Roaming\Camera Flight Check\
        check-runs.jsonl            run log, every run on this machine
        settings.json               location number, camera limits, output folders
        settings.json.before-reset  what the station had before the 1.5.6 level-set
        camera-host.log             only there when the Diagnostics folder was unusable
        Crashpad\reports\           app crash dumps, if any
      App folder, C:\preflight-ops-check\
        version, installed-version.txt, deploy.log
      Completion logs folder (from settings.json, default C:\preflight-ops-check\Logs)
        sessions\*.jsonl            one file per run
      Diagnostics folder (from settings.json, default C:\preflight-ops-check\Diagnostics)
        camera-host.log             camera helper start-ups, exits, errors
        calibrations\<run>\         grey-card attempts (see -Calibrations)
      Desktop
        camera-helper-report_*\     left by "Check Camera Helper" run with -Report

    The output folders are read from each profile's settings.json because an admin can move
    them in Settings > File Output Paths; the defaults are always checked as well.

    Safe to run while the app is open and a check is in progress: it never closes the app or
    touches the camera, reads files without locking them against the app's own writes, and runs
    at idle priority. Run as SYSTEM it has no window on the operator's desktop.

    Designed to run as SYSTEM from a Kaseya agent procedure. Output goes to stdout so the
    procedure can write it to the procedure log.

.PARAMETER OutFile
    Where to write the zip. The procedure passes a path in the agent's temp folder.

.PARAMETER Calibrations
    Json  = only analysis.json from each grey-card attempt, a few KB each (default)
    All   = also the grey-card photo, 1-3 MB each, up to 30 per station
    None  = skip grey-card attempts

.EXAMPLE
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File Harvest-PreflightLogs.ps1 -OutFile C:\temp\PreflightLogs.zip
#>
param(
    [string]$OutFile      = (Join-Path $env:TEMP 'PreflightLogs.zip'),
    [ValidateSet('Json', 'All', 'None')]
    [string]$Calibrations = 'Json',
    [string]$Root         = 'C:\preflight-ops-check'
)

$ErrorActionPreference = 'Stop'

$AppDataName = 'Camera Flight Check'
$Bundle      = '{0}_{1}' -f $env:COMPUTERNAME, (Get-Date -Format 'yyyy-MM-dd_HHmm')
$StagingBase = Join-Path $env:TEMP 'preflight-log-harvest'
$Staging     = Join-Path $StagingBase $Bundle

$found   = New-Object System.Collections.Generic.List[string]
$missing = New-Object System.Collections.Generic.List[string]
$failed  = New-Object System.Collections.Generic.List[string]

function Write-Log([string]$Msg) {
    Write-Output ('{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Msg)
}

# Copy-Item opens the source allowing other readers only, so an app write landing during the
# copy fails -- and the app's run-log append isn't retried, so that run's record would be lost.
# Opening with ReadWrite+Delete sharing lets the app keep appending (and rotating) while we read.
function Copy-SharedFile([string]$Source, [string]$Target) {
    New-Item -ItemType Directory -Force -Path (Split-Path $Target) | Out-Null
    $in = [IO.File]::Open($Source, 'Open', 'Read', [IO.FileShare]'ReadWrite, Delete')
    try {
        $out = [IO.File]::Create($Target)
        try { $in.CopyTo($out) } finally { $out.Dispose() }
    } finally { $in.Dispose() }
}

# Copies a file or folder into the bundle at $Dest (relative), recording the outcome
function Add-ToBundle([string]$Source, [string]$Dest) {
    if (-not (Test-Path -LiteralPath $Source)) { $missing.Add($Source); return }
    $target = Join-Path $Staging $Dest
    try {
        $item = Get-Item -LiteralPath $Source -Force
        if ($item.PSIsContainer) {
            foreach ($f in @(Get-ChildItem -LiteralPath $Source -Recurse -File -Force)) {
                Copy-SharedFile $f.FullName (Join-Path $target $f.FullName.Substring($item.FullName.Length).TrimStart('\'))
            }
        } else {
            Copy-SharedFile $Source $target
        }
        $found.Add("$Dest  <-  $Source")
    } catch {
        $failed.Add("$Source : $($_.Exception.Message)")
    }
}

# Folder path -> safe single folder name, e.g. C:\preflight-ops-check\Logs -> C_preflight-ops-check_Logs
function ConvertTo-FolderName([string]$Path) {
    ($Path.TrimEnd('\') -replace '[:\\/]+', '_')
}

function Read-SettingsFile([string]$Path) {
    try {
        # A file saved from Notepad/PowerShell can carry a BOM, which ConvertFrom-Json rejects
        $text = [IO.File]::ReadAllText($Path).TrimStart([char]0xFEFF)
        return $text | ConvertFrom-Json
    } catch {
        $failed.Add("$Path : could not read as JSON ($($_.Exception.Message))")
        return $null
    }
}

try {
    # Stay out of the way if an operator is mid-check: lowest CPU priority, so the app and
    # camera transfers always win. Unlike the deploy, this never closes the app or touches the camera.
    try { (Get-Process -Id $PID).PriorityClass = 'Idle' } catch {}
    Write-Log "=== Log harvest started on $env:COMPUTERNAME (Calibrations=$Calibrations) ==="
    New-Item -ItemType Directory -Force -Path $Staging | Out-Null

    # Output folders to check: the defaults, plus whatever each profile's settings.json says
    $logDirs  = New-Object System.Collections.Generic.List[string]
    $diagDirs = New-Object System.Collections.Generic.List[string]
    $logDirs.Add((Join-Path $Root 'Logs'))
    $diagDirs.Add((Join-Path $Root 'Diagnostics'))

    # --- 1. Per-profile app data -------------------------------------------
    $profiles = @(Get-ChildItem -Path 'C:\Users' -Directory -Force -ErrorAction SilentlyContinue |
        Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "AppData\Roaming\$AppDataName") })
    if (-not $profiles) { $missing.Add("C:\Users\*\AppData\Roaming\$AppDataName (no profile has run the app)") }

    foreach ($p in $profiles) {
        $ad   = Join-Path $p.FullName "AppData\Roaming\$AppDataName"
        $dest = "AppData-$($p.Name)"
        Write-Log "App data found for user $($p.Name)"
        foreach ($f in 'check-runs.jsonl', 'settings.json', 'settings.json.before-reset', 'camera-host.log') {
            Add-ToBundle (Join-Path $ad $f) (Join-Path $dest $f)
        }
        Add-ToBundle (Join-Path $ad 'Crashpad\reports') (Join-Path $dest 'Crashpad-reports')

        $settingsPath = Join-Path $ad 'settings.json'
        if (Test-Path -LiteralPath $settingsPath) {
            $s = Read-SettingsFile $settingsPath
            if ($s -and $s.paths) {
                if ($s.paths.completionLogs -and -not $logDirs.Contains($s.paths.completionLogs))  { $logDirs.Add($s.paths.completionLogs) }
                if ($s.paths.diagnostics    -and -not $diagDirs.Contains($s.paths.diagnostics))    { $diagDirs.Add($s.paths.diagnostics) }
            }
        }
    }

    # --- 2. App folder ------------------------------------------------------
    foreach ($f in 'version', 'installed-version.txt', 'deploy.log') {
        Add-ToBundle (Join-Path $Root $f) (Join-Path 'AppFolder' $f)
    }

    # --- 3. Completion logs (per-run session files) -------------------------
    foreach ($d in $logDirs) {
        Add-ToBundle (Join-Path $d 'sessions') (Join-Path 'CompletionLogs' (Join-Path (ConvertTo-FolderName $d) 'sessions'))
    }

    # --- 4. Diagnostics: helper log + grey-card attempts --------------------
    foreach ($d in $diagDirs) {
        $dest = Join-Path 'Diagnostics' (ConvertTo-FolderName $d)
        Add-ToBundle (Join-Path $d 'camera-host.log') (Join-Path $dest 'camera-host.log')

        $calDir = Join-Path $d 'calibrations'
        if ($Calibrations -eq 'None' -or -not (Test-Path -LiteralPath $calDir)) { continue }
        # .trash holds attempts already pruned by the app; leave those out
        foreach ($run in @(Get-ChildItem -LiteralPath $calDir -Directory -Force | Where-Object Name -ne '.trash')) {
            $runDest = Join-Path $dest (Join-Path 'calibrations' $run.Name)
            if ($Calibrations -eq 'All') {
                Add-ToBundle $run.FullName $runDest
            } else {
                Add-ToBundle (Join-Path $run.FullName 'analysis.json') (Join-Path $runDest 'analysis.json')
            }
        }
    }

    # --- 5. Camera-helper reports left on any desktop -----------------------
    $reports = @(Get-ChildItem -Path 'C:\Users\*\Desktop' -Directory -Filter 'camera-helper-report_*' -Force -ErrorAction SilentlyContinue)
    foreach ($r in $reports) {
        $user = Split-Path (Split-Path $r.FullName) | Split-Path -Leaf
        Add-ToBundle $r.FullName (Join-Path 'HelperReports' "$user-$($r.Name)")
    }

    # --- 6. Manifest --------------------------------------------------------
    $appVersion = ''
    $versionFile = Join-Path $Root 'version'
    if (Test-Path -LiteralPath $versionFile) { $appVersion = (Get-Content -LiteralPath $versionFile -TotalCount 1).Trim() }
    $manifest = @(
        "Computer:      $env:COMPUTERNAME"
        "Harvested:     $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')"
        "App version:   $appVersion"
        "Calibrations:  $Calibrations"
        ''
        "COLLECTED ($($found.Count))"
        ($found | ForEach-Object { "  $_" })
        ''
        "NOT PRESENT ($($missing.Count)) -- normal for most of these"
        ($missing | ForEach-Object { "  $_" })
        ''
        "COULD NOT COPY ($($failed.Count))"
        ($failed | ForEach-Object { "  $_" })
    )
    [IO.File]::WriteAllLines((Join-Path $Staging 'manifest.txt'), [string[]]$manifest)

    # --- 7. Zip -------------------------------------------------------------
    if (Test-Path -LiteralPath $OutFile) { Remove-Item -LiteralPath $OutFile -Force }
    New-Item -ItemType Directory -Force -Path (Split-Path $OutFile) | Out-Null
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    # includeBaseDirectory: the zip opens to one COMPUTERNAME_date folder, so many can be extracted side by side
    [IO.Compression.ZipFile]::CreateFromDirectory($Staging, $OutFile, [IO.Compression.CompressionLevel]::Optimal, $true)

    $sizeKb = [math]::Round((Get-Item -LiteralPath $OutFile).Length / 1KB)
    Write-Log "Collected $($found.Count) item(s), $($missing.Count) not present, $($failed.Count) could not be copied"
    $failed | ForEach-Object { Write-Log "WARNING: $_" }
    Write-Log "Zip written: $OutFile ($sizeKb KB)"
    Write-Log '=== Log harvest completed ==='
    $exitCode = 0
}
catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    $exitCode = 1
}
finally {
    # Only the staging folder this run created -- never the source folders
    if (Test-Path -LiteralPath $Staging) { Remove-Item -LiteralPath $Staging -Recurse -Force -ErrorAction SilentlyContinue }
    if ((Test-Path -LiteralPath $StagingBase) -and -not (Get-ChildItem -LiteralPath $StagingBase -Force)) {
        Remove-Item -LiteralPath $StagingBase -Force -ErrorAction SilentlyContinue
    }
}
exit $exitCode
