const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const youtubeSearch = require('youtube-search-api');
const ytdl = require('ytdl-core');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'running', 
    message: 'Video Downloader API',
    version: '1.0.0'
  });
});

// Search videos
app.get('/api/search', async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const results = await youtubeSearch.GetListByKeyword(q, false, limit);
    
    const videos = results.items.map(item => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail.thumbnails[0].url,
      duration: item.length?.simpleText || 'N/A',
      channel: item.channelTitle,
      views: item.viewCount || 'N/A',
      uploadDate: item.publishedTimeText || 'N/A'
    }));

    res.json({ success: true, videos });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search videos' });
  }
});

// Get video details and download links
app.get('/api/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;

    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const info = await ytdl.getInfo(videoUrl);
    
    const formats = info.formats
      .filter(f => f.hasVideo && f.hasAudio)
      .map(f => ({
        quality: f.qualityLabel,
        format: f.container,
        size: f.contentLength ? `${(f.contentLength / 1024 / 1024).toFixed(2)} MB` : 'N/A',
        url: f.url
      }));

    res.json({
      success: true,
      video: {
        id: info.videoDetails.videoId,
        title: info.videoDetails.title,
        description: info.videoDetails.description,
        thumbnail: info.videoDetails.thumbnails[0].url,
        duration: info.videoDetails.lengthSeconds,
        channel: info.videoDetails.author.name,
        views: info.videoDetails.viewCount,
        formats
      }
    });
  } catch (error) {
    console.error('Video info error:', error);
    res.status(500).json({ error: 'Failed to get video information' });
  }
});

// Download endpoint
app.get('/api/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quality = 'highest' } = req.query;
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;

    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const info = await ytdl.getInfo(videoUrl);
    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

    ytdl(videoUrl, { quality }).pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Trending videos
app.get('/api/trending', async (req, res) => {
  try {
    const results = await youtubeSearch.GetListByKeyword('trending', false, 20);
    
    const videos = results.items.map(item => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail.thumbnails[0].url,
      duration: item.length?.simpleText || 'N/A',
      channel: item.channelTitle,
      views: item.viewCount || 'N/A'
    }));

    res.json({ success: true, videos });
  } catch (error) {
    console.error('Trending error:', error);
    res.status(500).json({ error: 'Failed to get trending videos' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
