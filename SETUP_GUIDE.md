# Complete Setup Guide

## What You Need to Install

### 1. For Backend Development
- **Node.js** (v18 or higher): https://nodejs.org/
- **Git**: https://git-scm.com/

### 2. For Android Development
- **Android Studio**: https://developer.android.com/studio
- **JDK 17**: Usually comes with Android Studio

## Step-by-Step Setup

### Part 1: Backend Setup (5 minutes)

1. **Clone the repository:**
```bash
git clone https://github.com/Sahil53-bit/video-downloader-app.git
cd video-downloader-app
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Start the backend server:**
```bash
npm start
```

Your backend will run on `http://localhost:3000`

### Part 2: Android App Setup (10 minutes)

1. **Open Android Studio**

2. **Open the project:**
   - Click "Open an Existing Project"
   - Navigate to `video-downloader-app/android`
   - Click "OK"

3. **Wait for Gradle sync** (first time takes 5-10 minutes)

4. **Update API URL:**
   - Open `app/src/main/java/com/videodownloader/app/ApiService.kt`
   - Change `BASE_URL` to your backend URL:
     - For local testing: `http://10.0.2.2:3000/` (Android emulator)
     - For real device: `http://YOUR_COMPUTER_IP:3000/`

5. **Run the app:**
   - Click the green "Run" button
   - Select an emulator or connected device

## Testing the App

1. **Start backend server** (in terminal):
```bash
cd backend
npm start
```

2. **Run Android app** from Android Studio

3. **Search for videos** in the app

4. **Download videos** by clicking the download button

## Deploying Backend Online

### Option 1: Railway (Recommended)

I can deploy your backend to Railway for free. Just say "deploy backend to Railway" and I'll do it for you!

### Option 2: Render

I can also deploy to Render. Just say "deploy backend to Render"!

## Common Issues & Solutions

### Backend Issues

**Error: "Cannot find module"**
```bash
cd backend
npm install
```

**Error: "Port 3000 already in use"**
- Change PORT in `.env` file to 3001 or another port

### Android Issues

**Gradle sync failed**
- Click "File" → "Invalidate Caches" → "Invalidate and Restart"

**App crashes on start**
- Check if backend is running
- Verify API URL in `ApiService.kt`

**Cannot connect to backend**
- Use `10.0.2.2` instead of `localhost` for emulator
- Use your computer's IP address for real device
- Make sure firewall allows port 3000

## Next Steps

1. ✅ Get backend running locally
2. ✅ Get Android app running
3. ✅ Test search and download
4. 🚀 Deploy backend online
5. 📱 Build APK for distribution

## Need Help?

Just ask me:
- "Deploy my backend"
- "How do I build APK?"
- "App is not connecting to backend"
- "How do I add more video sources?"

I'm here to help! 🚀
