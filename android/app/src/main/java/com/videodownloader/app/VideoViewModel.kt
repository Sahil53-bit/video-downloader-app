package com.videodownloader.app

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class Video(
    val id: String,
    val title: String,
    val thumbnail: String,
    val duration: String,
    val channel: String,
    val views: String
)

class VideoViewModel : ViewModel() {
    private val _videos = MutableStateFlow<List<Video>>(emptyList())
    val videos: StateFlow<List<Video>> = _videos

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val apiService = ApiService.create()

    fun searchVideos(query: String) {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val response = apiService.searchVideos(query)
                if (response.success) {
                    _videos.value = response.videos
                }
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun downloadVideo(videoId: String) {
        viewModelScope.launch {
            try {
                // Implement download logic here
                // You can use DownloadManager or custom download implementation
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    init {
        // Load trending videos on start
        searchVideos("trending")
    }
}
