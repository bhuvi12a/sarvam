# SSL/TLS Error Fix Guide

## Problem
You were experiencing the following SSL/TLS error:
```
Error: 18330000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

This error occurs when connecting to MongoDB (especially MongoDB Atlas) due to SSL/TLS certificate validation issues.

## Solutions Implemented

### 1. Enhanced MongoDB Client Configuration
Updated `src/lib/dataStore.ts` with comprehensive SSL/TLS options:
- Added `tls: true` to explicitly enable TLS
- Added `tlsInsecure: true` for development environments
- Added `tlsAllowInvalidCertificates: true` for development
- Added `tlsAllowInvalidHostnames: true` for development
- Increased timeout values for better connection stability
- Added proper error handling for connection failures

### 2. Next.js Configuration
Updated `next.config.js` to handle SSL/TLS issues in webpack configuration.

### 3. Development Scripts
Created multiple ways to run the development server with SSL bypass:

#### Option A: Use the new npm script (Recommended)
```bash
npm run dev:ssl
```

#### Option B: Use the PowerShell script
```bash
.\dev-ssl-bypass.ps1
```

#### Option C: Set environment variable manually
```bash
# PowerShell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
npm run dev

# CMD
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev
```

## How to Use

1. **Stop your current dev server** (if running)
   - Press `Ctrl+C` in the terminal where `npm run dev` is running

2. **Restart using one of the SSL bypass methods:**
   ```bash
   npm run dev:ssl
   ```

3. **Your application should now connect to MongoDB without SSL errors**

## Important Notes

⚠️ **Security Warning**: The SSL bypass options (`NODE_TLS_REJECT_UNAUTHORIZED=0` and `tlsInsecure`) should **ONLY** be used in development environments. They are automatically disabled in production.

✅ **Production Safety**: The code checks `process.env.NODE_ENV !== 'production'` to ensure SSL validation is enforced in production.

## Troubleshooting

### If you still see SSL errors:

1. **Check your MongoDB URI**
   - Ensure your `.env.local` file has the correct `MONGODB_URI`
   - For MongoDB Atlas, the URI should look like:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
     ```

2. **Verify MongoDB Atlas IP Whitelist**
   - Go to MongoDB Atlas → Network Access
   - Add your IP address or use `0.0.0.0/0` for development (allows all IPs)

3. **Check MongoDB Atlas User Permissions**
   - Ensure the database user has proper read/write permissions

4. **Fallback System**
   - The application has a fallback system that uses in-memory storage if MongoDB fails
   - Check console logs to see if it's using the fallback

## Additional Resources

- [MongoDB Connection String Documentation](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [MongoDB Atlas Setup Guide](https://www.mongodb.com/docs/atlas/getting-started/)
- [Node.js TLS Documentation](https://nodejs.org/api/tls.html)

## Changes Made

1. ✅ Enhanced SSL/TLS configuration in `src/lib/dataStore.ts`
2. ✅ Updated `next.config.js` with webpack configuration
3. ✅ Added `dev:ssl` script to `package.json`
4. ✅ Created `dev-ssl-bypass.ps1` PowerShell script
5. ✅ Created this documentation

---

**Next Steps**: Restart your development server using `npm run dev:ssl` and the SSL errors should be resolved!
