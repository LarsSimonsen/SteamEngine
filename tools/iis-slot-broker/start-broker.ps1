$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

Start-Service -Name "SteamEngineIisSlotBroker"
Get-Service -Name "SteamEngineIisSlotBroker" | Select-Object Name, Status, StartType
