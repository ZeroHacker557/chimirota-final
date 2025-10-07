# Backend Repository Creation Script
# Run this script in PowerShell

Write-Host "🚀 Creating Backend Repository for Render Deployment" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Create backend directory
Write-Host "`n📁 Step 1: Creating backend directory..." -ForegroundColor Yellow
if (Test-Path "chimirota-backend") {
    Remove-Item -Recurse -Force "chimirota-backend"
    Write-Host "   Removed existing directory" -ForegroundColor Gray
}
New-Item -ItemType Directory -Name "chimirota-backend" | Out-Null
Set-Location "chimirota-backend"
Write-Host "   ✅ Created chimirota-backend directory" -ForegroundColor Green

# Copy required files
Write-Host "`n📋 Step 2: Copying backend files..." -ForegroundColor Yellow

# Copy server.js
if (Test-Path "../server.js") {
    Copy-Item "../server.js" "./server.js"
    Write-Host "   ✅ Copied server.js" -ForegroundColor Green
} else {
    Write-Host "   ❌ server.js not found!" -ForegroundColor Red
}

# Copy and rename backend-package.json to package.json
if (Test-Path "../backend-package.json") {
    Copy-Item "../backend-package.json" "./package.json"
    Write-Host "   ✅ Copied backend-package.json as package.json" -ForegroundColor Green
} else {
    Write-Host "   ❌ backend-package.json not found!" -ForegroundColor Red
}

# Copy render.yaml
if (Test-Path "../render.yaml") {
    Copy-Item "../render.yaml" "./render.yaml"
    Write-Host "   ✅ Copied render.yaml" -ForegroundColor Green
} else {
    Write-Host "   ❌ render.yaml not found!" -ForegroundColor Red
}

# Copy DEPLOYMENT-GUIDE.md
if (Test-Path "../DEPLOYMENT-GUIDE.md") {
    Copy-Item "../DEPLOYMENT-GUIDE.md" "./DEPLOYMENT-GUIDE.md"
    Write-Host "   ✅ Copied DEPLOYMENT-GUIDE.md" -ForegroundColor Green
} else {
    Write-Host "   ❌ DEPLOYMENT-GUIDE.md not found!" -ForegroundColor Red
}

# Copy and rename backend-README.md to README.md
if (Test-Path "../backend-README.md") {
    Copy-Item "../backend-README.md" "./README.md"
    Write-Host "   ✅ Copied backend-README.md as README.md" -ForegroundColor Green
} else {
    Write-Host "   ❌ backend-README.md not found!" -ForegroundColor Red
}

# Copy and rename backend.gitignore to .gitignore
if (Test-Path "../backend.gitignore") {
    Copy-Item "../backend.gitignore" "./.gitignore"
    Write-Host "   ✅ Copied backend.gitignore as .gitignore" -ForegroundColor Green
} else {
    Write-Host "   ❌ backend.gitignore not found!" -ForegroundColor Red
}

# Initialize Git
Write-Host "`n🔧 Step 3: Initializing Git repository..." -ForegroundColor Yellow
git init | Out-Null
Write-Host "   ✅ Git repository initialized" -ForegroundColor Green

git add . | Out-Null
Write-Host "   ✅ Files added to Git" -ForegroundColor Green

git commit -m "Initial backend setup for Render deployment" | Out-Null
Write-Host "   ✅ Initial commit created" -ForegroundColor Green

git branch -M main | Out-Null
Write-Host "   ✅ Set main branch" -ForegroundColor Green

# Add remote origin
Write-Host "`n🌐 Step 4: Setting up GitHub remote..." -ForegroundColor Yellow
git remote add origin https://github.com/ZeroHacker557/chimirota-backend.git
Write-Host "   ✅ Remote origin added" -ForegroundColor Green

# List created files
Write-Host "`n📄 Step 5: Verifying created files..." -ForegroundColor Yellow
$files = Get-ChildItem -Name
foreach ($file in $files) {
    Write-Host "   ✅ $file" -ForegroundColor Green
}

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create GitHub repository: https://github.com/ZeroHacker557/chimirota-backend.git" -ForegroundColor White
Write-Host "2. Run: git push -u origin main" -ForegroundColor White
Write-Host "3. Deploy to Render.com" -ForegroundColor White
Write-Host "4. Test API: https://chimirota-backend.onrender.com/" -ForegroundColor White

Write-Host "`n🚀 Backend repository is ready for deployment!" -ForegroundColor Green