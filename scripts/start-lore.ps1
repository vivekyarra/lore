$ErrorActionPreference = "Stop"
$repoPath = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoPath

if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    throw "Node.js and npm are required to run Lore."
}

if (-not (Test-Path -LiteralPath (Join-Path $repoPath "node_modules"))) {
    npm ci
}

if (-not (Test-Path -LiteralPath (Join-Path $repoPath ".next\BUILD_ID"))) {
    npm run build
}

$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if (-not $listener) {
    $stdoutPath = Join-Path $env:TEMP "lore-server.out.log"
    $stderrPath = Join-Path $env:TEMP "lore-server.err.log"
    Start-Process -FilePath "npm.cmd" -ArgumentList "start" -WorkingDirectory $repoPath -WindowStyle Hidden -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath
}

$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:3000/api/state" -TimeoutSec 2
        if ($response.StatusCode -eq 200) { $ready = $true; break }
    } catch {
        Start-Sleep -Seconds 1
    }
}

if (-not $ready) {
    throw "Lore did not start. Check $env:TEMP\lore-server.err.log for details."
}

Start-Process "http://localhost:3000"
Write-Host "Lore is running at http://localhost:3000" -ForegroundColor Green
