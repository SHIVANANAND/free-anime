'use client';

import { useState } from 'react';
import AnimePlayer from './AnimePlayer';

export default function AnimePageClient({ playlist }) {
  const [selectedVideo, setSelectedVideo] = useState(playlist?.videos?.[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`relative w-full min-h-screen bg-black overflow-hidden ${isFullscreen ? 'fullscreen-active' : ''}`}>
      {/* Video Player Container */}
      <div className={`flex flex-col lg:flex-row ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Main Video Area */}
        <div className={`${isFullscreen ? 'flex-1' : 'flex-1 relative'}`}>
          <div className={`w-full ${isFullscreen ? 'h-screen' : 'aspect-video lg:aspect-auto lg:h-screen'}`}>
            <AnimePlayer
              playlist={playlist}
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
            />
          </div>

          {/* Overlay Header - Hidden in fullscreen */}
          {!isFullscreen && (
            <div className="absolute top-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-b from-black/80 to-transparent z-20">
              <div className="flex items-center justify-between max-w-full mx-auto">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="hidden sm:block">
                    <h1 className="text-lg lg:text-xl font-semibold truncate max-w-xs lg:max-w-none">{playlist.title}</h1>
                    <p className="text-sm text-[#B8C5D6]">Episode {playlist.videos?.findIndex(v => v === selectedVideo) + 1 || 1}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Episode List - Desktop Sidebar / Mobile Below Video - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="lg:w-[360px] lg:h-screen lg:bg-[#141B3D]/98 lg:backdrop-blur-xl lg:border-l lg:border-[#1E2749] lg:overflow-y-auto">
            <div className="p-4 border-b border-[#1E2749] lg:sticky lg:top-0 lg:bg-[#141B3D]/98 lg:backdrop-blur-xl z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Episodes</h3>
                <span className="text-sm text-[#B8C5D6]">{playlist.videos?.length || 0} total</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {playlist.videos?.map((video, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedVideo(video)}
                  className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    video === selectedVideo
                      ? 'bg-[#FF3366]/20 border-2 border-[#FF3366] shadow-lg shadow-[#FF3366]/20'
                      : 'bg-[#1E2749] hover:bg-[#2A3A5C] hover:scale-[1.02]'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      alt={`Episode ${index + 1}`}
                      className="w-[100px] h-14 rounded-lg object-cover"
                      src={video.thumbnail}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
                        <svg className="w-4 h-4 ml-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {video === selectedVideo && (
                      <div className="absolute top-1 left-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF3366] uppercase tracking-wide">
                          Playing
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold truncate">Episode {index + 1}</h4>
                      <span className="text-xs text-[#6B7A99] flex-shrink-0">24:16</span>
                    </div>
                    <p className="text-xs text-[#B8C5D6] line-clamp-2">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}