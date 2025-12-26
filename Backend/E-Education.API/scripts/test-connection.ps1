# Script test kết nối PostgreSQL
Write-Host "=== Test PostgreSQL Connection ===" -ForegroundColor Cyan

$hostName = "localhost"
$port = "5432"
$database = "EEducationDb"
$username = "postgres"
$password = "12345"

Write-Host "`nConnection String:" -ForegroundColor Yellow
Write-Host "Host: $hostName"
Write-Host "Port: $port"
Write-Host "Database: $database"
Write-Host "Username: $username"
Write-Host "Password: *****`n"

# Kiểm tra PostgreSQL service
Write-Host "Checking PostgreSQL service..." -ForegroundColor Yellow
$services = Get-Service | Where-Object {$_.Name -like "*postgresql*"}
if ($services) {
    foreach ($service in $services) {
        Write-Host "  Found: $($service.Name) - Status: $($service.Status)" -ForegroundColor $(if ($service.Status -eq "Running") {"Green"} else {"Red"})
    }
} else {
    Write-Host "  PostgreSQL service not found!" -ForegroundColor Red
}

# Test connection bằng psql nếu có
Write-Host "`nTesting connection with psql..." -ForegroundColor Yellow
$env:PGPASSWORD = $password
$result = & psql -h $hostName -p $port -U $username -d postgres -c "SELECT version();" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "  Connection successful!" -ForegroundColor Green
    Write-Host $result
    
    # Kiểm tra database
    Write-Host "`nChecking if database '$database' exists..." -ForegroundColor Yellow
    $dbCheck = & psql -h $hostName -p $port -U $username -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$database';" 2>&1
    
    if ($dbCheck.Trim() -eq "1") {
        Write-Host "  Database '$database' exists!" -ForegroundColor Green
    } else {
        Write-Host "  Database '$database' does NOT exist!" -ForegroundColor Red
        Write-Host "  Run: CREATE DATABASE `"$database`";" -ForegroundColor Yellow
    }
} else {
    Write-Host "  Connection failed!" -ForegroundColor Red
    Write-Host $result
    Write-Host "`nPossible issues:" -ForegroundColor Yellow
    Write-Host "  1. PostgreSQL service not running"
    Write-Host "  2. Wrong password"
    Write-Host "  3. PostgreSQL not installed"
    Write-Host "  4. Port $port not accessible"
}

$env:PGPASSWORD = ""

