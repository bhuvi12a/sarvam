# Fix for SSL/TLS errors in development
# This script sets NODE_TLS_REJECT_UNAUTHORIZED=0 to bypass SSL certificate validation

Write-Host "Starting Next.js development server with SSL bypass..." -ForegroundColor Green
Write-Host "Note: This is for development only. Do not use in production!" -ForegroundColor Yellow

# Set environment variable to bypass SSL certificate validation
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"

# Run the development server
npm run dev
