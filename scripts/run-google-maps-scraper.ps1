# =============================================================================
# AI Dynamic Pro — Google Maps Lead Scraper Runner (gosom/google-maps-scraper)
# =============================================================================
# Usage:
#   .\scripts\run-google-maps-scraper.ps1 -Mode cli
#   .\scripts\run-google-maps-scraper.ps1 -Mode webui
# =============================================================================

param(
    [ValidateSet("cli", "webui")]
    [string]$Mode = "cli",
    [int]$Depth = 2,
    [int]$Concurrency = 4
)

$RepoRoot = Split-Path -Parent $PSScriptRoot
$QueriesFile = Join-Path $PSScriptRoot "miami-queries.txt"
$LeadsDir = Join-Path $RepoRoot "public\leads"
$OutputFile = Join-Path $LeadsDir "miami-gmaps-scraped.csv"

if (-not (Test-Path $LeadsDir)) {
    New-Item -ItemType Directory -Path $LeadsDir -Force | Out-Null
}

Write-Host "Checking Docker status..." -ForegroundColor Cyan
$dockerVersion = docker info --format '{{.ServerVersion}}' 2>$null
if (-not $dockerVersion) {
    Write-Host "Docker Desktop is not currently running." -ForegroundColor Yellow
    Write-Host "Please start Docker Desktop and re-run this script, or use the pre-extracted dataset at:" -ForegroundColor Yellow
    Write-Host "  $LeadsDir\miami-b2b-leads.csv" -ForegroundColor Green
    exit 0
}

if ($Mode -eq "webui") {
    Write-Host "Starting Google Maps Scraper Web UI on http://localhost:8080 ..." -ForegroundColor Green
    docker run -d --name aidynamic-gmaps-scraper -p 8080:8080 -v "${LeadsDir}:/gmapsdata" gosom/google-maps-scraper -data-folder /gmapsdata
    Start-Process "http://localhost:8080"
} else {
    Write-Host "Running Google Maps Scraper CLI with Email Extraction (-email -depth $Depth)..." -ForegroundColor Green
    docker run --rm `
        -v "${QueriesFile}:/queries.txt" `
        -v "${LeadsDir}:/out" `
        gosom/google-maps-scraper `
        -input /queries.txt `
        -results /out/miami-gmaps-scraped.csv `
        -email `
        -depth $Depth `
        -c $Concurrency `
        -lang en `
        -exit-on-inactivity 3m
    Write-Host "Scraping complete! Results saved to: $OutputFile" -ForegroundColor Green
}
