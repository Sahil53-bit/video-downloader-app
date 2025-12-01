package com.videodownloader.app

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query
import retrofit2.http.Path

data class SearchResponse(
    val success: Boolean,
    val videos: List<Video>
)

data class VideoDetailsResponse(
    val success: Boolean,
    val video: VideoDetails
)

data class VideoDetails(
    val id: String,
    val title: String,
    val description: String,
    val thumbnail: String,
    val duration: String,
    val channel: String,
    val views: String,
    val formats: List<VideoFormat>
)

data class VideoFormat(
    val quality: String,
    val format: String,
    val size: String,
    val url: String
)

interface ApiService {
    @GET("api/search")
    suspend fun searchVideos(@Query("q") query: String): SearchResponse

    @GET("api/video/{id}")
    suspend fun getVideoDetails(@Path("id") videoId: String): VideoDetailsResponse

    @GET("api/trending")
    suspend fun getTrendingVideos(): SearchResponse

    companion object {
        private const val BASE_URL = "http://YOUR_BACKEND_URL:3000/"

        fun create(): ApiService {
            val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            return retrofit.create(ApiService::class.java)
        }
    }
}
