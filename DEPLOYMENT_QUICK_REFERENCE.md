# 🎯 DEPLOYMENT QUICK REFERENCE CARD

**Print this page for quick reference during deployment!**

---

## ⚡ Build Command

```bash
cd src/frontend
npm install          # First time only
npm run build        # Creates dist/ folder
```

---

## 🚀 Deploy in 60 Seconds

### **OPTION 1: Vercel (Easiest)**
```bash
npm i -g vercel
vercel --prod
```
**Result:** yourapp.vercel.app ✅

### **OPTION 2: Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```
**Result:** yourapp.netlify.app ✅

### **OPTION 3: Docker**
```bash
docker build -t gocareer-admin .
docker run -p 80:80 gocareer-admin
```
**Result:** http://localhost ✅

### **OPTION 4: Docker Compose**
```bash
docker-compose up -d
```
**Result:** http://localhost:8080 ✅

### **OPTION 5: Railway.app**
```bash
npm i -g @railway/cli
railway login
railway up
```
**Result:** Auto-generated URL ✅

---

## 📋 Pre-Deployment Checklist

- [ ] Run: `npm run build` ✅
- [ ] Test: `npm run preview` ✅
- [ ] Check: `npm run typecheck` ✅
- [ ] Lint: `npm run check` ✅
- [ ] `.env` file created ✅
- [ ] No console.logs left ✅
- [ ] No secrets in code ✅

---

## 📊 Build Output

```
src/frontend/dist/
├── index.html (main file)
├── assets/
│   ├── index.js (bundled code)
│   ├── index.css (styles)
│   ├── vendor.js (dependencies)
│   └── images/
└── env.json (config)
```

**Size:** ~1.5MB total | ~400KB gzip ✨

---

## 🔍 Environment Variables

Create `.env` file with:
```
VITE_API_URL=https://your-api.com
VITE_ENVIRONMENT=production
```

(See `.env.example` for all options)

---

## 🆘 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| **Port in use** | `lsof -i :3000 \ kill -9 <PID>` |
| **Out of memory** | `NODE_OPTIONS=--max-old-space-size=4096 npm run build` |
| **Module not found** | `rm -rf node_modules && npm install` |
| **Build fails** | Check BUILD_AND_DEPLOY.md → Troubleshooting |
| **Blank screen** | Check browser console + network tab |

---

## 📚 Documentation Files

All files in project root:
- ✅ **QUICK_START_DEPLOY.md** - Start here
- ✅ **BUILD_AND_DEPLOY.md** - Full reference
- ✅ **DEPLOYMENT_CHECKLIST.md** - QA checklist
- ✅ **READY_TO_DEPLOY.md** - Overview

---

## 🎯 Recommended Path

1. **Build:** `npm run build`
2. **Test:** `npm run preview`
3. **Deploy:** Choose from options above
4. **Success:** Your app is live! 🎉

---

## 💾 Files for Different Platforms

**Vercel/Netlify:** Just `dist/` folder ✅

**Docker:** All files + Dockerfile ✅

**Linux Server:** Just `dist/` folder + nginx ✅

**Your own server:** Just `dist/` folder ✅

---

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] No hardcoded passwords
- [ ] CORS configured
- [ ] Security headers set
- [ ] Sensitive data in .env only

---

## 📊 Performance Targets

- Load time: < 3s ✅
- Lighthouse: > 80 ✅
- Gzip enabled ✅
- Cache headers set ✅

---

## 🚨 Rollback (If needed)

**Vercel:** Go to deployments → Redeploy previous

**Docker:** `docker run -p 80:80 gocareer-admin:previous-version`

**Server:** `cp /backup/dist/* /var/www/ && restart nginx`

---

## 📞 Quick Links

- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Docker: https://docker.com
- Railway: https://railway.app

---

## ✅ Success Indicators

✅ Build completes without errors
✅ dist/ folder created with index.html
✅ Preview loads without errors
✅ App deployed and accessible
✅ HTTPS working
✅ No console errors
✅ Forms/buttons working

---

**Ready to deploy? Start with Option 1 above!** 🚀

**Print & Keep Handy!** 📋
