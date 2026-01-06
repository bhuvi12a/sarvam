# Deployment Fix Script

# 1. Ensure we are clean in re-main
Write-Host "Cleaning up nested git configurations..."
if (Test-Path ".git") {
    Remove-Item -Path ".git" -Recurse -Force
    Write-Host "Removed nested .git folder."
}

# 2. Go to parent repo
cd ..
Write-Host "Switched to parent directory: $(Get-Location)"

# 3. remove the broken submodule reference if it exists
# We use try/catch or ignore errors because it might not exist
try {
    git rm --cached re-main -r
} catch {
    Write-Host "re-main was not in index or not a gitlink (this is fine)."
}

# 4. Add the files again
Write-Host "Adding re-main files to the main repository..."
git add re-main

# 5. Commit
git commit -m "Fix: Deployable project structure"

# 6. Push
Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "--------------------------------------------------------"
Write-Host "✅ Git repository fixed and pushed!"
Write-Host ""
Write-Host "⚠️  IMPORTANT DEPLOYMENT STEP:"
Write-Host "If you are using Vercel/Netlify, you MUST change the"
Write-Host "'Root Directory' setting to: re-main"
Write-Host ""
Write-Host "Because your package.json is inside the 're-main' folder,"
Write-Host "the deployment (and the 404 error) happens because it"
Write-Host "cannot find your project in the root."
Write-Host "--------------------------------------------------------"
