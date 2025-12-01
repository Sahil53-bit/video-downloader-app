# Video Downloader App

An Android application similar to Vidmate for searching and downloading videos from multiple platforms.

## Features

- 🔍 Search videos from multiple platforms
- 📥 Download videos in multiple qualities
- 🎬 Short video support
- 📱 Modern Android UI
- ⚡ Fast and efficient downloads

## Project Structure

```
video-downloader-app/
├── backend/          # Node.js backend API
├── android/          # Android application
└── docs/            # Documentation
```

## Tech Stack

**Backend:**
- Node.js + Express
- yt-dlp for video extraction
- PostgreSQL database

**Android:**
- Kotlin
- Jetpack Compose
- Retrofit for API calls
- ExoPlayer for video playback

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Set environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the server:
```bash
npm start
```

### Android Setup

1. Open `android` folder in Android Studio
2. Sync Gradle files
3. Update API endpoint in `app/src/main/java/com/videodownloader/api/ApiConfig.kt`
4. Build and run

## API Endpoints

- `GET /api/search?q=query` - Search videos
- `GET /api/video/:id` - Get video details
- `GET /api/download/:id` - Get download links

## Legal Notice

This app is for educational purposes. Ensure you comply with platform terms of service and copyright laws when downloading content.

## License

MIT License
