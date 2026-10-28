<#
.SYNOPSIS
  Removes named keys from a station's saved settings.json so the app's current
  defaults take over again.

.DESCRIPTION
  A saved settings.json always outranks defaultSettings(). That is correct for
  a configured station, but during pre-launch iteration it means a changed
  default is invisible on any machine that has ever saved Settings -- the new
  build looks like it "lost" the change when it simply never gets consulted.
  Scalars lose to the saved value, and arrays are replaced wholesale, so a
  changed list (skipReasons, helpDocs, helpContacts) never appears either.

  Removing just the stale keys is better than deleting the whole file: the
  station keeps its location number, station name, output paths and feed
  settings, and only the keys you name fall back to the defaults.

  This is an IT/dev tool. It is deliberately NOT shipped in the portable build
  -- an operator double-clicking something that rewrites station config is a
  worse problem than the one it solves.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts\reset-settings-keys.ps1
  Resets the two keys that changed on 2026-10-19 (settingsPassword, skipReasons).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts\reset-settings-keys.ps1 -Keys helpDocs,helpContacts
  Resets the Need Help content instead.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts\reset-settings-keys.ps1 -WhatIf
  Shows what would change without writing.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [string[]] $Keys = @('settingsPassword', 'skipReasons'),
  [string]   $SettingsPath = "$env:APPDATA\Camera Flight Check\settings.json"
)

if (-not (Test-Path -LiteralPath $SettingsPath)) {
  Write-Host "No settings.json at $SettingsPath"
  Write-Host "Nothing to do -- this station is already running on defaults."
  exit 0
}

try {
  $json = Get-Content -LiteralPath $SettingsPath -Raw | ConvertFrom-Json
} catch {
  Write-Error "Could not read $SettingsPath as JSON: $($_.Exception.Message)"
  exit 1
}

$found = @($Keys | Where-Object { $json.PSObject.Properties.Name -contains $_ })
if ($found.Count -eq 0) {
  Write-Host "None of those keys are saved here, so defaults already apply:"
  $Keys | ForEach-Object { Write-Host "  - $_" }
  exit 0
}

Write-Host "Saved values that are currently overriding the defaults:"
foreach ($k in $found) {
  $v = $json.$k
  $shown = if ($v -is [array]) { '[' + ($v -join ', ') + ']' } else { "$v" }
  Write-Host "  $k = $shown"
}

if ($PSCmdlet.ShouldProcess($SettingsPath, "remove $($found -join ', ')")) {
  # Keep a copy. These files hold a station's real configuration.
  $backup = "$SettingsPath.bak"
  Copy-Item -LiteralPath $SettingsPath -Destination $backup -Force
  foreach ($k in $found) { $json.PSObject.Properties.Remove($k) }
  $json | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $SettingsPath -Encoding UTF8
  Write-Host ""
  Write-Host "Removed $($found.Count) key(s). Previous file kept as settings.json.bak"
  Write-Host "Everything else (location, station, paths, feed settings) is untouched."
  Write-Host "Restart the app -- those keys now come from the build's defaults."
}
