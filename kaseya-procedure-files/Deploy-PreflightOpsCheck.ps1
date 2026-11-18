<#
.SYNOPSIS
    Deploys the CameraFlightCheck (Pre-Flight Ops Check) portable app via Kaseya VSA.

.DESCRIPTION
    1. Creates C:\preflight-ops-check
    2. Finds the newest .zip in the pre-flight listing, downloads it, clears Mark of the Web,
       extracts it directly into C:\preflight-ops-check (no subfolder)
    3. Clears Mark of the Web on every extracted file (removes the "untrusted" / SmartScreen prompt)
    4. Creates a shortcut on the Public desktop (shows for every user)
    5. Optionally downloads the training videos to C:\Options

    Version check: the installed zip name is saved in C:\preflight-ops-check\installed-version.txt.
    If the newest zip on the server matches it, the app is not downloaded, and videos that are
    already present (same size) are skipped.

    Pre-Flight is closed on EVERY run if it is open (update or not), for all logged-in users.

    Designed to run as SYSTEM from a Kaseya agent procedure. Log: C:\preflight-ops-check\deploy.log

.PARAMETER Videos
    All   = download every .mp4 in the training folder (default)
    None  = skip videos
    Or a comma-separated list of file names, e.g. "pre-flight-app-tutorial.mp4"

.PARAMETER VideoShortcut
    "Yes" also puts a "Pre-Flight Training Videos" folder shortcut on the desktop.
    Default "No" (the app plays the videos itself); "No" also removes one left by earlier runs.

.PARAMETER ExeName
    Exe to point the shortcut at. Falls back to auto-detect if not found.

.PARAMETER Force
    Reinstall the app and re-download videos even if they are already up to date.

.EXAMPLE
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File Deploy-PreflightOpsCheck.ps1 -Videos All -VideoShortcut No
#>
param(
    [string]$Videos        = 'All',
    [string]$VideoShortcut = 'No',
    [string]$ExeName       = 'Camera Flight Check.exe',
    [string]$ShortcutName  = 'Pre-Flight Ops Check',
    [switch]$Force                                   # reinstall even if already up to date
)

$ErrorActionPreference = 'Stop'
$ProgressPreference    = 'SilentlyContinue'   # Invoke-WebRequest is ~10x faster without the progress bar
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$AppUrl    = 'https://0bk.net/chp/pre-flight/'
$VideoUrl  = 'https://0bk.net/chp/training/'
$Root      = 'C:\preflight-ops-check'   # app files are extracted directly in here
$Staging   = Join-Path $env:TEMP 'preflight-ops-check-staging'
$VideoDir  = 'C:\Options'   # the app loads its training videos from here
$Desktop   = [Environment]::GetFolderPath('CommonDesktopDirectory')   # C:\Users\Public\Desktop
$Log       = Join-Path $Root 'deploy.log'
$VersionFile = Join-Path $Root 'installed-version.txt'   # name of the zip currently installed

function Write-Log([string]$Msg) {
    $line = '{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Msg
    Write-Output $line
    Add-Content -Path $Log -Value $line -ErrorAction SilentlyContinue
}

function Get-ListingFiles([string]$Url, [string]$Extension) {
    $html = (Invoke-WebRequest -Uri $Url -UseBasicParsing).Content
    [regex]::Matches($html, 'href="([^"?/]+\.' + $Extension + ')"', 'IgnoreCase') |
        ForEach-Object { [uri]::UnescapeDataString($_.Groups[1].Value) } |
        Select-Object -Unique
}

function Clear-MarkOfTheWeb([string]$Path) {
    Get-ChildItem -Path $Path -Recurse -File -Force | Unblock-File
}

function Get-PreflightProcesses {
    # Match by install path, or by exe name in case it was started from somewhere else
    $exeBase = [IO.Path]::GetFileNameWithoutExtension($ExeName)
    Get-Process | Where-Object {
        ($_.Path -and $_.Path -like "$Root\*") -or $_.ProcessName -eq $exeBase
    }
}

function Stop-PreflightApp {
    $procs = @(Get-PreflightProcesses)
    if (-not $procs) { Write-Log 'Pre-Flight is not running'; return }

    Write-Log "Pre-Flight is open ($($procs.Count) process(es)), closing it"
    $procs | Stop-Process -Force -ErrorAction SilentlyContinue

    # Wait up to 15 seconds for every process to exit so no files are locked
    for ($i = 0; $i -lt 15 -and @(Get-PreflightProcesses).Count; $i++) { Start-Sleep -Seconds 1 }
    if (@(Get-PreflightProcesses).Count) {
        # Stop before deleting anything so a half-removed install is never left behind
        throw 'Pre-Flight could not be closed; update cancelled, old version left in place'
    }
    Write-Log 'Pre-Flight closed'
    Start-Sleep -Seconds 1
}

function New-Shortcut([string]$LinkPath, [string]$Target, [string]$WorkDir) {
    $shell = New-Object -ComObject WScript.Shell
    if (Test-Path $LinkPath) {
        # Leave a correct shortcut alone so Explorer keeps its cached icon
        if ($shell.CreateShortcut($LinkPath).TargetPath -eq $Target) {
            [Runtime.InteropServices.Marshal]::ReleaseComObject($shell) | Out-Null
            return $false
        }
        # Delete rather than overwrite: Explorer refreshes the icon for a new file,
        # but can keep showing a blank icon for one rewritten in place
        Remove-Item $LinkPath -Force
        Start-Sleep -Seconds 1
    }
    $lnk = $shell.CreateShortcut($LinkPath)
    $lnk.TargetPath       = $Target
    $lnk.WorkingDirectory = $WorkDir
    if ($Target -like '*.exe') { $lnk.IconLocation = "$Target,0" }
    $lnk.Save()
    [Runtime.InteropServices.Marshal]::ReleaseComObject($shell) | Out-Null
    return $true
}

try {
    # --- 1. Directory -------------------------------------------------------
    New-Item -ItemType Directory -Force -Path $Root | Out-Null
    Write-Log "=== Deploy started (Videos=$Videos, VideoShortcut=$VideoShortcut) ==="

    # --- 2. Download newest zip ---------------------------------------------
    $zips = @(Get-ListingFiles $AppUrl 'zip')
    if (-not $zips) { throw "No .zip found at $AppUrl" }
    # Pick highest version number in the file name (e.g. 1.5.2), falling back to name order
    $zipName = $zips | Sort-Object {
        $m = [regex]::Match($_, '\d+(\.\d+)+')
        if ($m.Success) { [version]$m.Value } else { [version]'0.0' }
    }, { $_ } | Select-Object -Last 1
    # --- Version check: skip the download if this zip is already installed ---
    $installed = if (Test-Path $VersionFile) { (Get-Content $VersionFile -TotalCount 1).Trim() } else { '' }
    $exeThere  = [bool](Get-ChildItem -Path $Root -Recurse -Filter *.exe -ErrorAction SilentlyContinue | Select-Object -First 1)

    # Close Pre-Flight if it's open (for every logged-in user) on every run, update or not
    Stop-PreflightApp

    if ($installed -eq $zipName -and $exeThere -and -not $Force) {
        Write-Log "Already up to date ($zipName), skipping app download"
    } else {
        if ($installed) { Write-Log "Update found: $installed -> $zipName" } else { Write-Log "No version recorded, installing $zipName" }

        $zipPath = Join-Path $env:TEMP $zipName
        Write-Log "Downloading $zipName"
        Invoke-WebRequest -Uri ($AppUrl + [uri]::EscapeDataString($zipName)) -OutFile $zipPath -UseBasicParsing

        # Clear MOTW on the zip *before* extracting so extracted files don't inherit it
        Unblock-File -Path $zipPath

        # --- 3. Extract to staging, then move into C:\preflight-ops-check ---
        if (Test-Path $Staging) { Remove-Item $Staging -Recurse -Force }
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $Staging)
        Remove-Item $zipPath -Force

        # If the zip wraps everything in one top-level folder, use that folder's contents
        $source = $Staging
        $top = @(Get-ChildItem -Path $Staging -Force)
        if ($top.Count -eq 1 -and $top[0].PSIsContainer) { $source = $top[0].FullName }

        # Clear the old version (keeps the log and version file; also removes the old app\ folder)
        Get-ChildItem -Path $Root -Force | Where-Object { $_.FullName -ne $Log -and $_.FullName -ne $VersionFile } | Remove-Item -Recurse -Force

        Write-Log "Extracting to $Root"
        Get-ChildItem -Path $source -Force | Move-Item -Destination $Root -Force
        Remove-Item $Staging -Recurse -Force

        # --- 4. Clear Mark of the Web on everything -------------------------
        Clear-MarkOfTheWeb $Root
        Write-Log 'Mark of the Web cleared'

        Set-Content -Path $VersionFile -Value $zipName -Encoding ASCII
        Write-Log "Installed version recorded: $zipName"
    }

    # Files unpacked in SYSTEM's temp folder keep its locked-down permissions when moved,
    # so normal users couldn't read the exe (blank shortcut icon). Reset everything to
    # inherit from C:\. Runs every time so machines installed before this fix get repaired.
    & icacls.exe $Root /reset /T /C /Q | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Log "WARNING: icacls permission reset returned $LASTEXITCODE" }
    else { Write-Log 'Folder permissions reset (users can read and run the app)' }

    # --- 5. Find the exe & create desktop shortcut --------------------------
    $exes = Get-ChildItem -Path $Root -Recurse -Filter *.exe |
        Where-Object { $_.Name -notmatch 'unins|uninstall|update|crash|helper|elevate|squirrel' }
    $exe = $exes | Where-Object Name -eq $ExeName | Select-Object -First 1
    if (-not $exe) {
        Write-Log "'$ExeName' not found, auto-detecting exe"
        # Prefer an exe named like the app, closest to the top of the folder tree
        $exe = $exes | Sort-Object @{ e = { if ($_.Name -match 'flight') { 0 } else { 1 } } },
                                    @{ e = { $_.FullName.Split('\').Count } } |
               Select-Object -First 1
    }
    if (-not $exe) { throw "No application .exe found under $Root" }
    Write-Log "Application exe: $($exe.FullName)"

    if (New-Shortcut (Join-Path $Desktop "$ShortcutName.lnk") $exe.FullName $exe.DirectoryName) {
        Write-Log "Desktop shortcut created: $Desktop\$ShortcutName.lnk"
    } else {
        Write-Log 'Desktop shortcut already correct, left unchanged'
    }

    # --- 6. Optional videos -------------------------------------------------
    if ($Videos -and $Videos -ne 'None') {
        New-Item -ItemType Directory -Force -Path $VideoDir | Out-Null
        $available = @(Get-ListingFiles $VideoUrl 'mp4')
        if ($Videos -eq 'All') {
            $wanted = $available
        } else {
            $wanted = $Videos.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
            $wanted | Where-Object { $available -notcontains $_ } | ForEach-Object { Write-Log "WARNING: video not found on server: $_" }
            $wanted = $wanted | Where-Object { $available -contains $_ }
        }
        foreach ($v in $wanted) {
            $url   = $VideoUrl + [uri]::EscapeDataString($v)
            $local = Join-Path $VideoDir $v
            if ((Test-Path $local) -and -not $Force) {
                # Skip if the local copy is the same size as the one on the server
                $remoteSize = [long](Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing).Headers['Content-Length']
                if ($remoteSize -eq (Get-Item $local).Length) {
                    Write-Log "Video already up to date: $v"
                    continue
                }
            }
            Write-Log "Downloading video $v"
            Invoke-WebRequest -Uri $url -OutFile $local -UseBasicParsing
        }
        Clear-MarkOfTheWeb $VideoDir

        if ($VideoShortcut -eq 'Yes') {
            if (New-Shortcut (Join-Path $Desktop 'Pre-Flight Training Videos.lnk') $VideoDir $VideoDir) {
                Write-Log 'Videos folder shortcut created'
            }
        }
    } else {
        Write-Log 'Videos skipped'
    }

    # Remove the videos shortcut left by earlier runs when it's no longer wanted
    $videoLnk = Join-Path $Desktop 'Pre-Flight Training Videos.lnk'
    if ($VideoShortcut -ne 'Yes' -and (Test-Path $videoLnk)) {
        Remove-Item $videoLnk -Force
        Write-Log 'Removed old videos folder shortcut'
    }

    Write-Log '=== Deploy completed successfully ==='
    exit 0
}
catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    exit 1
}
