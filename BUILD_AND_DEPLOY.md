# GoCareer Admin Dashboard - Build & Deployment Guide

## 📦 Build Instructions

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **pnpm**: v7.0.0 or higher
- **dfx** (for Internet Computer deployment)
- **Git**: for version control

### Step 1: Install Dependencies

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Go to project root
cd gocareer-admin

# Install all workspace dependencies
pnpm install
```

### Step 2: Build Frontend Only (Recommended for simple deployment)

```bash
cd src/frontend

# Build the application
pnpm build

# This creates a production build in: src/frontend/dist/
```

**Output Directory**: `src/frontend/dist/`

The dist folder contains:
- `index.html` - Main entry point
- `assets/` - Bundled JS, CSS, and images
- `env.json` - Configuration file

### Step 3: Build Full Project (Backend + Frontend)

```bash
# From project root
pnpm build

# For full IC deployment with Motoko backend
./build.sh
```

## 🚀 Deployment Options

### Option 1: Static Hosting (Frontend Only)

Perfect for deploying just the admin dashboard UI to:
- **Vercel**
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Any static hosting provider**

#### Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# From project root
cd src/frontend
vercel

# Follow the prompts to connect your Vercel account
# and deploy!
```

#### Deploy to Netlify:

```bash
# Build first
pnpm build

# Deploy the dist folder
cd src/frontend
netlify deploy --prod --dir=dist
```

#### Deploy to AWS S3:

```bash
# Build first
pnpm build

# Upload to S3
aws s3 sync src/frontend/dist s3://your-bucket-name --delete

# CloudFront cache invalidation (if using CDN)
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### Option 2: Docker Deployment

For containerized deployment to any cloud provider.

#### Build Docker Image:

```bash
# From project root
docker build -t gocareer-admin:latest .

# Tag for registry
docker tag gocareer-admin:latest your-registry/gocareer-admin:latest

# Push to registry
docker push your-registry/gocareer-admin:latest
```

#### Run Docker Locally:

```bash
docker run -p 8080:80 gocareer-admin:latest
```

#### Deploy to Docker Services:

**AWS ECS:**
```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ECR_URL

docker tag gocareer-admin:latest YOUR_ECR_URL/gocareer-admin:latest
docker push YOUR_ECR_URL/gocareer-admin:latest

# Update ECS service
aws ecs update-service --cluster your-cluster \
  --service gocareer-admin --force-new-deployment
```

**Google Cloud Run:**
```bash
gcloud builds submit --tag gcr.io/your-project/gocareer-admin:latest
gcloud run deploy gocareer-admin \
  --image gcr.io/your-project/gocareer-admin:latest \
  --platform managed \
  --region us-central1
```

**Azure Container Instances:**
```bash
az container create \
  --resource-group your-group \
  --name gocareer-admin \
  --image your-acr/gocareer-admin:latest \
  --ports 80 \
  --environment-variables PORT=80
```

---

### Option 3: Internet Computer (ICP) Deployment

For decentralized deployment to Internet Computer protocol.

#### Prerequisites:
- **dfx**: DFinity CLI tool
- **Motoko**: Compiler (included with dfx)

#### Install DFx:

```bash
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
dfx --version
```

#### Deploy Locally (Testing):

```bash
# Terminal 1: Start local IC network
dfx start --background

# Terminal 2: Deploy
cd gocareer-admin
dfx deploy

# Check canister URLs
dfx canister url frontend
```

#### Deploy to Mainnet:

```bash
# Set up your identity
dfx identity use production  # or create new: dfx identity new

# Check your principal (canister controller)
dfx identity whoami

# Have at least 1 ICP token in your account for gas fees

# Deploy to mainnet
dfx deploy --network ic

# Get your canister ID
dfx canister id frontend --network ic
```

#### Access Your IC App:

```
https://<CANISTER_ID>.icp0.io
```

---

## 📁 Build Artifacts

### Frontend Build Output

```
src/frontend/dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-XXXX.js   # Main JavaScript bundle
│   ├── index-XXXX.css  # Main styles bundle
│   ├── vendor-XXXX.js  # Dependencies bundle
│   └── images/         # Optimized images
└── env.json            # Environment configuration
```

### Build Sizes (Typical):
- **Main JS**: ~450KB (gzipped: ~120KB)
- **Main CSS**: ~80KB (gzipped: ~15KB)
- **Total**: ~1.5MB (gzipped: ~400KB)

---

## 🔧 Environment Configuration

Create `.env` files in `src/frontend/` for different environments:

### `.env.development`
```
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

### `.env.production`
```
VITE_API_URL=https://api.gocareer.com
VITE_ENVIRONMENT=production
```

### `.env.staging`
```
VITE_API_URL=https://staging-api.gocareer.com
VITE_ENVIRONMENT=staging
```

Build with specific environment:
```bash
# Build for production
pnpm build --mode production

# Build for staging
pnpm build --mode staging
```

---

## 🔍 Build Optimization

### Enable Advanced Optimizations:

Edit `src/frontend/vite.config.js`:

```javascript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-components': ['@radix-ui/*'],
          'charts': ['recharts'],
        },
      },
    },
  },
});
```

### Analyze Bundle Size:

```bash
pnpm add -D rollup-plugin-visualizer

# In vite.config.js, add:
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
  }),
]

# Then build to see interactive visualization
pnpm build
```

---

## ✅ Pre-Deployment Checklist

- [ ] All code is committed to git
- [ ] No sensitive credentials in code/config files
- [ ] Environment variables are properly set
- [ ] API endpoints are correct for target environment
- [ ] Build completes without warnings/errors
- [ ] All features tested in production build (`pnpm preview`)
- [ ] Performance acceptable (Lighthouse score > 80)
- [ ] HTTPS enabled on deployment
- [ ] CORS configured properly if needed
- [ ] Analytics/monitoring tools configured
- [ ] Error logging service connected
- [ ] Backup/rollback plan in place

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Find process using port 5173
netstat -ano | findstr :5173  # Windows
lsof -i :5173                  # Mac/Linux

# Kill process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux
```

### Memory Issues During Build
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

### Clear Cache
```bash
# Remove node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors
```bash
# Clean test
pnpm store prune
pnpm install --force
pnpm build
```

---

## 📊 Performance Monitoring

### After Deployment:

```bash
# Check page speed
curl -I https://your-domain.com

# Monitor resources
curl https://your-domain.com | wc -c

# Check gzip compression
curl -H "Accept-Encoding: gzip" https://your-domain.com | wc -c
```

### Web Vitals Tests:
- Use Google PageSpeed Insights
- Test in Lighthouse
- Monitor Core Web Vitals dashboard

---

## 🚨 Rollback Procedure

### Vercel/Netlify:
1. Go to deployment history
2. Click "Redeploy" on previous version
3. Confirm

### Docker:
```bash
# Deploy previous version
docker pull your-registry/gocareer-admin:previous-version
docker run -p 8080:80 your-registry/gocareer-admin:previous-version
```

### S3:
```bash
# Restore from backup
aws s3 sync s3://your-bucket-backup s3://your-bucket-name --delete
```

---

## 📞 Support & Resources

- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev
- **Internet Computer Docs**: https://internetcomputer.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com

---

**Last Updated**: March 26, 2026
**Version**: 1.0
