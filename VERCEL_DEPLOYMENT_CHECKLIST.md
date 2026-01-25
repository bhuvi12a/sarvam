# Vercel Deployment Checklist

## 🚀 Complete Guide to Deploy Your Next.js App on Vercel

### ✅ Prerequisites

- [x] Code builds successfully locally (`npm run build`)
- [ ] GitHub repository is up to date
- [ ] MongoDB connection string is ready
- [ ] Vercel account is set up

---

## 📋 Step-by-Step Deployment Process

### 1. Configure Environment Variables on Vercel

> [!IMPORTANT]
> Environment variables from `.env.local` are **NOT** automatically deployed. You must configure them manually in Vercel.

#### How to Add Environment Variables:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (or create a new one)
3. Click **Settings** in the top navigation
4. Click **Environment Variables** in the left sidebar
5. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://bhuvaneshb2002b_db_user:Sarvam%40123@sarvam.c3miriq.mongodb.net/sarvam_db` | Production, Preview, Development |
| `NEXT_PUBLIC_API_BASE_URL` | `https://sarvambuilders.com/api` | Production |
| `NEXT_PUBLIC_BASE_URL` | `https://sarvambuilders.com` | Production |

> [!WARNING]
> **Ensure `NEXT_PUBLIC_BASE_URL` is set to `https://sarvambuilders.com`!**
> 
> After your first deployment, update your environment variables if they were set to anything else.

#### For Preview and Development Environments:

- **Preview**: Use `https://YOUR-VERCEL-URL.vercel.app/api` (or leave as localhost if testing)
- **Development**: Use `http://localhost:3000/api`

---

### 2. Verify Build Settings

1. In your Vercel project, go to **Settings** → **General**
2. Scroll to **Build & Development Settings**
3. Verify the following:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `.` (current directory, NOT `re-main`) |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm install` |

> [!TIP]
> If you see `re-main` as the root directory, change it to `.` and save.

---

### 3. Set Node.js Version (Optional but Recommended)

1. In **Settings** → **General**
2. Scroll to **Node.js Version**
3. Select **18.x** or **20.x** (recommended)

---

### 4. Deploy Your Project

#### Option A: Redeploy Existing Project

1. Go to **Deployments** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. Check **Use existing Build Cache** (optional, faster builds)
5. Click **Redeploy**

#### Option B: New Deployment

1. Push your latest code to GitHub
2. Vercel will automatically trigger a new deployment
3. Monitor the build logs in the **Deployments** tab

---

### 5. Monitor Build Logs

1. Click on the deployment that's in progress
2. Click **Building** to see live logs
3. Look for any errors or warnings

#### Common Build Errors:

| Error | Solution |
|-------|----------|
| `MONGODB_URI is not defined` | Add environment variable in Vercel dashboard |
| `Module not found` | Run `npm install` locally and push `package-lock.json` |
| `Type error: ...` | Check TypeScript errors locally with `npm run build` |
| `404 on deployment` | Verify Root Directory is set to `.` not `re-main` |

---

### 6. Update Environment Variables After First Deploy

> [!IMPORTANT]
> After your first successful deployment, you'll get a Vercel URL. Update these environment variables:

1. Go to **Settings** → **Environment Variables**
2. Edit `NEXT_PUBLIC_API_BASE_URL`:
   - Change from `http://localhost:3000/api`
   - To `https://your-actual-vercel-url.vercel.app/api`
3. Edit `NEXT_PUBLIC_BASE_URL`:
   - Change from `http://localhost:3000`
   - To `https://your-actual-vercel-url.vercel.app`
4. **Redeploy** for changes to take effect

---

## 🔍 Troubleshooting

### Build Succeeds Locally but Fails on Vercel

**Possible Causes:**

1. **Missing Environment Variables**
   - Solution: Add all required env vars in Vercel dashboard

2. **Different Node.js Version**
   - Solution: Set Node.js version to 18.x or 20.x in Vercel settings

3. **TypeScript Strict Mode Issues**
   - Solution: Run `npm run build` locally to catch errors first

4. **Missing Dependencies**
   - Solution: Ensure `package-lock.json` is committed to Git

### Deployment Returns 404

**Possible Causes:**

1. **Wrong Root Directory**
   - Solution: Set Root Directory to `.` in Vercel settings

2. **Build Output Not Found**
   - Solution: Verify Output Directory is `.next`

### API Routes Not Working

**Possible Causes:**

1. **Environment Variables Not Set**
   - Solution: Add `MONGODB_URI` and other vars in Vercel

2. **CORS Issues**
   - Solution: Check API route configurations

3. **Wrong API URL**
   - Solution: Update `NEXT_PUBLIC_API_BASE_URL` to production URL

---

## 📝 Post-Deployment Checklist

- [ ] Deployment succeeded without errors
- [ ] Homepage loads correctly
- [ ] All pages are accessible (about, contact, services, etc.)
- [ ] API routes respond correctly
- [ ] Database connection works (test by submitting a contact form)
- [ ] Images load properly
- [ ] No console errors in browser
- [ ] Environment variables are set correctly
- [ ] Custom domain configured (if applicable)

---

## 🎯 Quick Reference

### Required Environment Variables

```bash
# Production Environment Variables (Vercel Dashboard)
MONGODB_URI=mongodb+srv://bhuvaneshb2002b_db_user:Sarvam%40123@sarvam.c3miriq.mongodb.net/sarvam_db
NEXT_PUBLIC_API_BASE_URL=https://YOUR-VERCEL-URL.vercel.app/api
NEXT_PUBLIC_BASE_URL=https://YOUR-VERCEL-URL.vercel.app
```

### Local Development (.env.local)

```bash
# Keep these for local development only
MONGODB_URI=mongodb+srv://bhuvaneshb2002b_db_user:Sarvam%40123@sarvam.c3miriq.mongodb.net/sarvam_db
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🆘 Need More Help?

1. **Check Vercel Build Logs**: Most errors are shown in the build logs
2. **Vercel Documentation**: https://vercel.com/docs
3. **Next.js Deployment Docs**: https://nextjs.org/docs/deployment

---

**Last Updated**: January 13, 2026
