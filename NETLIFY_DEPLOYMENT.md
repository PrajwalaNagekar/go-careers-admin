# Netlify Deployment Guide for GoCareer Admin

## Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- GitHub account with your repo pushed
- Netlify account (free tier available)

---

## Step 1: Prepare Your Project

### 1.1 Install Dependencies
```bash
cd src/frontend
npm install
# or if using pnpm
pnpm install
```

### 1.2 Build Your Project
```bash
npm run build
# or
pnpm build
```

Your build files are now in `src/frontend/dist/`

---

## Step 2: Push to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Update UI with colorful KPI cards and split-screen login"
git push origin main
```

---

## Step 3: Deploy to Netlify

### Option A: Using Netlify CLI (Recommended)

#### 3A.1 Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### 3A.2 Authenticate with Netlify
```bash
netlify login
```
This opens your browser to authorize the CLI with your Netlify account.

#### 3A.3 Configure Netlify
Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "cd src/frontend && npm install && npm run build"
  publish = "src/frontend/dist"

[build.environment]
  NODE_VERSION = "18.17.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "cd src/frontend && npm run dev"
  port = 3000
```

#### 3A.4 Deploy
```bash
netlify deploy --prod
```

---

### Option B: Using Netlify Web Dashboard (Easiest)

#### 3B.1 Connect Your GitHub Repository
1. Go to [netlify.com](https://netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Select your `gocareer-admin` repository

#### 3B.2 Configure Build Settings
- **Build command:** `cd src/frontend && npm install && npm run build`
- **Publish directory:** `src/frontend/dist`
- **Node version:** 18.17.0 (or latest)

#### 3B.3 Add Environment Variables (if needed)
In Netlify Dashboard → Site settings → Build & deploy → Environment:
```
VITE_API_HOST=https://your-api.com
VITE_CANISTER_ID=your-canister-id
```

#### 3B.4 Click Deploy
Netlify will automatically build and deploy to a live URL like:
```
https://your-site-name.netlify.app
```

---

## Step 4: Configure Redirects (Important for SPA)

If you haven't added `netlify.toml`, configure redirects manually:

1. Create `src/frontend/public/_redirects` file:
```
/*    /index.html   200
```

2. Or in Netlify Dashboard → Redirects & rewrites → Add rule:
   - **From:** `/*`
   - **To:** `/index.html`
   - **Status:** 200 (rewrite)

This ensures all routes work correctly (fixing 404 errors on page refresh).

---

## Step 5: Deployment Success Verification

### Check These to Confirm Successful Deployment:

✅ **Build Logs**
- Netlify Dashboard → Deploys → Check build logs for errors
- Should see "Site is live" message

✅ **Live Site URL**
- Your site is live at a URL like: `https://your-site-name.netlify.app`

✅ **Page Navigation**
- Test all dashboard pages (Overview, Recruiters, Candidates, etc.)
- Test login page with split-screen layout
- Click KPI cards (should show colorful backgrounds)
- Click notification bell (should show alert)

✅ **No 404 Errors**
- Try refreshing page at `/recruiters` or other routes
- Should work without 404 errors

✅ **Performance**
- Netlify Dashboard → Analytics → Check load times
- Should be under 3 seconds

---

## Step 6: Custom Domain (Optional)

### Connect Custom Domain to Netlify

1. In Netlify Dashboard → Site settings → Domain management
2. Click **Add custom domain**
3. Enter your domain (e.g., `admin.gocareer.com`)
4. Update your domain's DNS records to point to Netlify

**DNS Configuration:**
```
Nameservers:
dns1.netlify.com
dns2.netlify.com
dns3.netlify.com
dns4.netlify.com
```

Or update A records to Netlify's IP addresses (Netlify will provide specific instructions).

---

## Step 7: SSL Certificate (Automatic)

✅ **Automatically Included:**
- Netlify provides FREE SSL/TLS certificates
- HTTPS is enabled by default
- Auto-renewal included

---

## Step 8: Environment Variables

### Set Environment Variables in Netlify

1. **Dashboard Method:**
   - Site settings → Build & deploy → Environment
   - Add variables as key-value pairs

2. **netlify.toml Method:**
```toml
[build.environment]
  VITE_API_HOST = "https://api.gocareer.com"
  VITE_CANISTER_ID = "your-canister-id"
  VITE_ENV = "production"
```

---

## Step 9: Continuous Deployment (Auto-Deploy)

✅ **Automatic Deploys:**
- Every push to GitHub (`main` branch) automatically deploys
- Netlify monitors your repo for changes
- No manual deployments needed

### To Disable Auto-Deploy:
- Netlify Dashboard → Build & deploy → Deploy settings
- Turn off auto-publish

### To Deploy Manually:
```bash
netlify deploy --prod
```

---

## Step 10: Rollback Previous Versions

If something breaks after deployment:

1. **Dashboard Method:**
   - Netlify Dashboard → Deploys
   - Click the previous successful deploy
   - Click **Publish deploy**

2. **CLI Method:**
```bash
netlify deploys list
netlify deploy --prod --restore
```

---

## Troubleshooting

### Issue: 404 Errors on Page Refresh
**Solution:** Check redirects are configured (Step 4)

### Issue: Build Fails
**Check:**
- Node version (should be 18+)
- Dependencies installed: `npm install`
- No TypeScript errors: `npm run typecheck`
- Build succeeds locally: `npm run build`

### Issue: Environment Variables Not Working
**Solution:**
- Restart deploy after setting variables
- Use `VITE_` prefix for Vite variables
- Access in code: `import.meta.env.VITE_VAR_NAME`

### Issue: Slow Performance
**Check:**
- Netlify Analytics → Performance
- Check bundle size: `npm run build` shows final size
- Consider image optimization (use WebP format)

### Issue: API Calls Failing
**Solution:**
- Check CORS settings on your backend
- Verify API URLs in environment variables
- Check browser console for specific errors

---

## Advanced: Monorepo Setup

Since you have `src/frontend` structure:

### Option 1: Build from Subdirectory (Current)
Already configured in `netlify.toml` with:
```toml
command = "cd src/frontend && npm install && npm run build"
publish = "src/frontend/dist"
```

### Option 2: Workspace Root Build
If you want to build from project root using pnpm workspaces:

```toml
[build]
  command = "pnpm install && pnpm build"
  publish = "src/frontend/dist"

[build.environment]
  NODE_VERSION = "18.17.0"
```

---

## Security Best Practices

✅ **Enable:**
1. **Deploy previews** (automatic)
   - Test changes before production
   - Netlify creates preview URL for each PR

2. **Password protection** (optional)
   - Netlify Dashboard → Site settings → Access control
   - Add password for staging environments

3. **Rate limiting** (optional)
   - Netlify Dashboard → Security settings
   - Prevent DDoS attacks

4. **HTTPS enforcement** (automatic)
   - Always redirects HTTP → HTTPS
   - Enabled by default

---

## Monitoring & Analytics

### View Site Analytics
- Netlify Dashboard → Analytics tab
- Track:
  - Page views
  - Unique visitors
  - Loading times
  - Error rates

### View Build Status
- Netlify Dashboard → Deploys tab
- See all build history and logs

---

## Quick Reference Commands

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod

# Create preview deploy
netlify deploy

# View site information
netlify sites

# Open Netlify dashboard
netlify open

# Check deployment logs
netlify logs

# Delete a site
netlify sites:delete
```

---

## Deployment Checklist

Before going live, verify:

- ✅ Code pushed to GitHub
- ✅ `package.json` has correct build script
- ✅ `netlify.toml` created with correct paths
- ✅ Build succeeds locally (`npm run build`)
- ✅ Netlify connected to GitHub repo
- ✅ Build settings configured correctly
- ✅ No environment variable secrets exposed
- ✅ Redirects configured for SPA routing
- ✅ Custom domain configured (if applicable)
- ✅ SSL certificate active (auto-provisioned)
- ✅ Site opens without 404 errors
- ✅ Navigation works on page refresh
- ✅ All dashboard features functional

---

## Support & Resources

### Netlify Documentation
- [Netlify Docs](https://docs.netlify.com/)
- [Vite + Netlify Guide](https://vitejs.dev/guide/ssr.html#netlify)
- [SPA Routing Guide](https://docs.netlify.com/routing/overview/)

### React + Vite Deployment
- [React Vite Docs](https://vitejs.dev/guide/)
- [Netlify + React](https://docs.netlify.com/integrations/frameworks/react/)

### Getting Help
- Netlify Dashboard → Support
- Email: support@netlify.com
- Community: [Netlify Community Forums](https://community.netlify.com/)

---

## Next Steps After Deployment

1. **Setup Custom Domain** (Optional)
   - Configure your domain to point to Netlify

2. **Enable Deploy Previews** (Recommended)
   - Automatic preview for each GitHub PR
   - Test changes before merging to main

3. **Setup Analytics Monitoring** (Optional)
   - Track traffic and performance
   - Set up performance budgets

4. **Configure CI/CD** (Optional)
   - Integrate with other tools (GitHub Actions, etc.)
   - Set up status checks for PRs

5. **Backup Strategy** (Recommended)
   - Keep GitHub as source of truth
   - Test rollback procedure

---

**Your site will be live within 2-3 minutes!** 🚀
