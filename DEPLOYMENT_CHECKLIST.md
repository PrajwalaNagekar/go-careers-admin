# GoCareer Admin - Deployment Checklist

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All code changes committed to git
- [ ] No console.log() statements left in production code
- [ ] No sensitive credentials in code (API keys, tokens, etc.)
- [ ] No TODO or FIXME comments blocking deployment
- [ ] All linting errors resolved (`npm run check`)
- [ ] All TypeScript errors resolved (`npm run typecheck`)
- [ ] No security vulnerabilities (`npm audit`)

### Environment Configuration
- [ ] Create `.env` file from `.env.example`
- [ ] Set correct `VITE_API_URL` for production
- [ ] Set correct `VITE_ENVIRONMENT=production`
- [ ] All API endpoints are correct
- [ ] CORS headers configured if needed
- [ ] Rate limiting configured appropriately
- [ ] Feature flags set correctly

### Frontend Build
- [ ] Delete old `dist/` folder: `rm -rf src/frontend/dist`
- [ ] Clean node_modules: `rm -rf node_modules` (optional)
- [ ] Reinstall dependencies: `npm install`
- [ ] Build succeeds: `npm run build`
- [ ] No build warnings that can't be ignored
- [ ] Build artifacts are in `src/frontend/dist/`
- [ ] `index.html` exists and is correct size (< 50KB)
- [ ] Assets are hash-named for cache busting

### Performance Testing
- [ ] Local preview works: `npm run preview`
- [ ] All pages load without errors
- [ ] No images show as broken
- [ ] Navigation works smoothly
- [ ] Forms submit correctly
- [ ] API calls succeed (if backend available)
- [ ] Page load time is acceptable (< 3s)
- [ ] Mobile responsiveness verified

### Security Review
- [ ] Remove any hardcoded passwords/keys
- [ ] Verify HTTPS will be enabled
- [ ] Check Content Security Policy headers
- [ ] Verify CORS is properly configured
- [ ] Check for form validation vulnerabilities
- [ ] No exposed environment variables in frontend
- [ ] Auth tokens handled securely
- [ ] API calls use HTTPS only

### Deployment Preparation
- [ ] Choose deployment platform
- [ ] Cloud account created and configured
- [ ] Domain name registered (if using custom domain)
- [ ] DNS configured (if using custom domain)
- [ ] SSL/TLS certificate obtained (for HTTPS)
- [ ] Backup plan documented
- [ ] Rollback procedure documented
- [ ] Monitoring/alerting configured

### Testing in Production Build
- [ ] Test build locally: `npm run preview`
- [ ] Check no localhost references in dist
- [ ] All external resources load correctly
- [ ] Analytics tracking works (if enabled)
- [ ] Error logging works (if enabled)
- [ ] Feature flags function correctly

## 🚀 Deployment Steps

### Step 1: Final Build
```bash
cd src/frontend
npm ci                    # Install exact dependencies
npm run typecheck         # Verify no TS errors
npm run check            # Run linter
npm run build            # Build for production
```

### Step 2: Test Build Locally
```bash
npm run preview
# Visit http://localhost:4173
# Verify everything works
```

### Step 3: Choose Platform & Deploy

**Easiest (Vercel/Netlify):**
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist
```

**Docker:**
```bash
docker build -t gocareer-admin .
docker run -p 80:80 gocareer-admin
# Visit http://localhost
```

**Self-hosted:**
```bash
# Copy dist folder to your server's web root
scp -r dist/ user@server:/var/www/gocareer/
```

### Step 4: Post-Deployment Tests
- [ ] Visit production URL
- [ ] Check all pages load
- [ ] Test form submissions
- [ ] Verify analytics in backend
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Check Lighthouse score (target > 80)
- [ ] Verify HTTPS working
- [ ] Check security headers

### Step 5: Monitor
- [ ] Watch error logs for 30 minutes
- [ ] Monitor resource usage
- [ ] Check performance metrics
- [ ] Verify user traffic
- [ ] Review any error reports

## 🔄 Rollback Plan

If something goes wrong:

### Vercel/Netlify:
1. Go to deployment history
2. Find previous working deployment
3. Click "Redeploy"
4. Confirm

### Docker:
```bash
# Find previous image
docker images | grep gocareer-admin

# Run previous version
docker run -d -p 80:80 gocareer-admin:previous-tag
```

### Self-hosted:
```bash
# Restore from backup
cp -r /backups/gocareer-dist-backup/* /var/www/gocareer/
systemctl reload nginx
```

## 📊 Post-Deployment Verification

### Performance Metrics
- Page Load Time: < 3 seconds
- Time to Interactive: < 5 seconds
- Lighthouse Score: > 80
- Gzip Compression: Enabled
- Cache Headers: Set correctly

### Uptime & Monitoring
- [ ] Uptime monitoring configured
- [ ] Error tracking enabled (Sentry, etc.)
- [ ] Performance monitoring enabled
- [ ] Alert thresholds set
- [ ] Alert notifications working

### Security Verification
- [ ] HTTPS certificate valid
- [ ] Security headers present
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] X-XSS-Protection
  - [ ] Content-Security-Policy
- [ ] No console errors
- [ ] No security warnings in browser

## 🐛 Troubleshooting Common Issues

### Blank White Screen
1. Check browser console for errors
2. Verify API endpoints in network tab
3. Check CORS headers
4. Clear browser cache

### 404 on Page Refresh
- Configure server to serve index.html for all routes (SPA routing)
- Vercel/Netlify: Auto-configured
- Nginx: Use `try_files $uri $uri/ /index.html;`

### Slow Initial Load
1. Check bundle size: `npm run build` then check `dist/` size
2. Enable gzip compression on server
3. Use CDN for static assets
4. Optimize images

### API Not Responding
1. Verify API_URL is correct in .env
2. Check CORS headers on API
3. Verify firewall allows requests
4. Check network tab in DevTools

### Out of Memory During Build
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## 📞 Support

- **Build issues:** Check BUILD_AND_DEPLOY.md
- **Platform docs:** See links in QUICK_START_DEPLOY.md
- **Code issues:** Check project README
- **Production issues:** Review error logs and monitoring dashboard

## ✅ Final Sign-Off

- [ ] All checklist items completed
- [ ] Build tested locally
- [ ] Code reviewed by team
- [ ] Deployment approved by manager
- [ ] Monitoring configured
- [ ] Backup available
- [ ] Team notified
- [ ] Ready to deploy!

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Version/Tag:** _______________

**Notes:** 

_______________________________________________________________

_______________________________________________________________
