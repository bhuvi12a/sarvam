# Powershell script to fix nested git repository structure

# 1. Navigate to the parent directory (sarvam)
Write-Host "Navigating to parent directory..."
cd ..

# 2. Key Step: Remove the inner .git folder so the outer repo can track the files
# Checks if the folder exists first to avoid errors
if (Test-Path "re-main\.git") {
    Write-Host "Removing nested .git directory..."
    Remove-Item -Path "re-main\.git" -Recurse -Force
}

# 3. Remove the gitlink from the outer repo's index if it was added as a submodule/nested repo
# We use --cached to keep the files on disk
Write-Host "Cleaning up git index..."
git rm --cached re-main

# 4. Add all files in re-main to the outer repository
Write-Host "Adding project files to main repository..."
git add re-main

# 5. Commit the changes
Write-Host "Committing changes..."
git commit -m "Fix: Add re-main project source code to repository"

# 6. Push to GitHub
Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "---------------------------------------------------"
Write-Host "✅ Success! Your code is now correctly pushed to GitHub."
Write-Host "   You can now build your project by running:"
Write-Host "   cd re-main"
Write-Host "   npm run build"
Write-Host "---------------------------------------------------"
