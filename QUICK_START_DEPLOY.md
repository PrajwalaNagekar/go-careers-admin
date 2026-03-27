# Quick Start - Build & Deploy

This guide provides quick-start commands for the most common deployment scenarios.

## 🚀 Quick Start (5 minutes)

### 1️⃣ Build Locally

```bash
# Install dependencies
cd src/frontend
npm install

# Build for production
npm run build

# Output: dist/ folder ready to deploy
```

### 2️⃣ Deploy to Vercel (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend folder
cd src/frontend
vercel --prod

# Your app is live! Gets a .vercel.app URL
```

### 3️⃣ Deploy with Docker

```bash
# Build Docker image
docker build -t gocareer-admin:latest .

# Run locally first
docker run -p 8080:80 gocareer-admin:latest

# Open: http://localhost:8080
```

### 4️⃣ Deploy to Cloud

Choose one:

#### **AWS EC2:**
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker

# Pull and run
sudo docker run -d -p 80:80 your-registry/gocareer-admin:latest
```

#### **Heroku:**
```bash
npm i -g heroku-cli
heroku login
heroku create gocareer-admin
git push heroku main
```

#### **Railway.app (Simplest):**
```bash
npm i -g railway
railway login
railway init
railway up
```

---

## 📦 Pre-Built Artifacts

The `dist/` folder contains everything you need:

```
src/frontend/dist/
├── index.html           ← Main file
├── assets/              ← JS, CSS, images
└── env.json             ← Config
```

**Just upload the `dist/` folder to any static host!**

---

## 🔧 Common Deployment Platforms

### Vercel
- Most beginner friendly
- Auto deploys on git push
- $0 cost for hobby projects
- Free domain: `your-app.vercel.app`

### Netlify
- Similar to Vercel
- Better CLI experience
- Free: `your-app.netlify.app`

### AWS Amplify
- Cloud agnostic
- Works with AWS ecosystem
- Free tier available

### GitHub Pages
- Free
- Limited features
- Good for static sites

### DigitalOcean App Platform
- Simple interface
- $5/month starting
- Good documentation

---

## 🛠️ Manual Deployment (Any Server)

### Linux/Ubuntu Server:

```bash
# 1. SSH into your server
ssh user@your-server-ip

# 2. Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
node --version

# 3. Clone your repo
git clone https://github.com/your-username/gocareer-admin.git
cd gocareer-admin

# 4. Install dependencies
cd src/frontend
npm install

# 5. Build
npm run build

# 6. Install a web server (choose one)

# Option A: Use Node directly
npm install -g serve
serve -s dist -l 80

# Option B: Use Nginx (recommended)
sudo apt install nginx -y
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo systemctl restart nginx
sudo cp -r dist/* /var/www/html/

# 7. Check it works
curl http://localhost
```

### Windows Server:

```powershell
# 1. Install Node.js from https://nodejs.org

# 2. Install IIS (if not already)
# Or use a simple HTTP server:
npm install -g http-server

# 3. Navigate to build folder
cd src\frontend\dist

# 4. Start server
http-server -p 80

# 5. Visit: http://localhost
```

---

## 🐳 Docker Deployment

### Build:
```bash
docker build -t gocareer-admin:latest .
```

### Run locally:
```bash
docker run -p 8080:80 gocareer-admin:latest
```

### Push to Docker Hub:
```bash
docker tag gocareer-admin:latest your-username/gocareer-admin:latest
docker push your-username/gocareer-admin:latest
```

### Run on any server:
```bash
docker run -d -p 80:80 your-username/gocareer-admin:latest
```

---

## 📚 Full Documentation

See `BUILD_AND_DEPLOY.md` for:
- Advanced configurations
- All cloud platforms
- Performance optimization
- Troubleshooting
- Security best practices

---

## ❓ FAQ

**Q: Do I need the backend?**
A: No, the frontend dashboard is standalone. Backend would be for API integration.

**Q: What about HTTPS?**
A: Vercel/Netlify handle it automatically. For self-hosted, use Let's Encrypt.

**Q: How big is the build?**
A: ~1.5MB total, ~400KB gzipped (very fast!)

**Q: Can I preview before deploying?**
A: Yes! `npm run preview` in the dist folder.

**Q: What's the cost?**
A: Free options available (Vercel, Netlify, GitHub Pages). $5-20/month for premium.

---

## 🎯 Recommended Path for Beginners

1. Build locally: `npm run build`
2. Test locally: `npm run preview`
3. Sign up for Vercel (free)
4. Connect your GitHub repo
5. It auto-deploys on every push!

**Total time: 10 minutes** ✨

---

**Need help?** Check BUILD_AND_DEPLOY.md or the platform documentation.
