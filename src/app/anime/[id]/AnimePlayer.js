'use client';

import { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function AnimePlayer({ playlist, selectedVideo, setSelectedVideo, isFullscreen, setIsFullscreen }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [upNextVisible, setUpNextVisible] = useState(false);
  const [upNextCountdown, setUpNextCountdown] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef(null);

  const extractVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      iv_load_policy: 3,
      fs: 0,
      disablekb: 1,
      cc_load_policy: 0,
      playsinline: 1,
      enablejsapi: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event) => {
    const state = event.data;
    setIsPlaying(state === 1); // 1 = playing

    if (state === 0) { // ended
      handleVideoEnd();
    }
  };

  const handleVideoEnd = () => {
    const currentIndex = playlist.videos.findIndex(v => v === selectedVideo);
    const nextIndex = (currentIndex + 1) % playlist.videos.length;
    const nextVideo = playlist.videos[nextIndex];

    // Show "Up Next" notification
    setUpNextVisible(true);
    setUpNextCountdown(15);

    // Auto-advance after countdown
    const countdownInterval = setInterval(() => {
      setUpNextCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setSelectedVideo(nextVideo);
          setUpNextVisible(false);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation(); // Prevent triggering video click
    const target = isDragging ? progressBarRef.current : e.currentTarget;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const clampedPercent = Math.max(0, Math.min(1, percent));
    const newTime = clampedPercent * duration;

    if (player) {
      player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen changes (e.g., ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const skipForward = () => {
    if (player) {
      const newTime = Math.min(duration, currentTime + 10);
      player.seekTo(newTime);
    }
  };

  const handleVideoClick = (e) => {
    // Only toggle if clicking on the video area itself, not on controls
    if (e.target === e.currentTarget || e.target.tagName === 'IFRAME') {
      togglePlay();
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging]);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (player && isPlaying) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [player, isPlaying]);

  // Hide controls after inactivity
  useEffect(() => {
    let timeout;
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    const handleMouseMove = () => resetTimeout();
    const handleMouseLeave = () => setShowControls(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-full bg-black">
      {selectedVideo && (
        <>
          <YouTube
            ref={playerRef}
            videoId={extractVideoId(selectedVideo.link)}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            className="w-full h-full"
          />
          {/* Invisible click overlay */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={handleVideoClick}
            style={{ pointerEvents: showControls ? 'none' : 'auto' }}
          />
        </>
      )}

      {/* Custom Controls Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between max-w-full mx-auto">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-1 min-w-0">
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base md:text-xl font-semibold truncate">
                  {playlist.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#B8C5D6] truncate">
                  Episode {playlist.videos?.findIndex(v => v === selectedVideo) + 1 || 1}: {selectedVideo?.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-full bg-[#FF3366] hover:bg-[#E62E5C] transition-all duration-200 transform hover:scale-110 shadow-2xl"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
          <div className="max-w-full mx-auto">
            {/* Progress Bar */}
            <div className="mb-3 sm:mb-4">
              <div
                ref={progressBarRef}
                className="relative h-1 bg-white/30 rounded-full cursor-pointer group select-none"
                onClick={handleSeek}
                onMouseDown={handleMouseDown}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#FF3366] rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <div
                  className={`absolute top-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg -translate-y-1/2 transition-opacity ${
                    isDragging ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-shrink-0">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#FF3366] hover:bg-[#E62E5C] transition-colors flex-shrink-0"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 ml-0.5 sm:ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <span className="text-[10px] sm:text-sm font-medium text-[#B8C5D6] hidden xs:inline">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                <button
                  onClick={toggleMute}
                  className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#141B3D] hover:bg-[#1E2749] transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-12 sm:w-20 h-1 bg-[#141B3D] rounded-lg appearance-none cursor-pointer slider"
                />
                <button
                  onClick={toggleFullscreen}
                  className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#141B3D] hover:bg-[#1E2749] transition-colors"
                >
                  {isFullscreen ? (
                    <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Up Next Notification */}
      {upNextVisible && (
        <div className="fixed bottom-6 left-6 w-[350px] sm:w-[400px] bg-[#1E2749] rounded-2xl border-l-4 border-[#FF3366] shadow-2xl p-4 z-50">
          <div className="flex items-start gap-4">
            <img
              alt="Next Episode"
              className="w-[100px] sm:w-[120px] h-[56px] sm:h-[68px] rounded-lg object-cover flex-shrink-0"
              src={playlist.videos?.[(playlist.videos.findIndex(v => v === selectedVideo) + 1) % playlist.videos.length]?.thumbnail}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="text-xs font-bold text-[#FF3366] uppercase tracking-wide mb-1">
                    Up Next
                  </p>
                  <h4 className="text-sm font-semibold mb-1">
                    Episode {(playlist.videos.findIndex(v => v === selectedVideo) + 2) % (playlist.videos.length + 1) || 1}: {playlist.videos?.[(playlist.videos.findIndex(v => v === selectedVideo) + 1) % playlist.videos.length]?.title}
                  </h4>
                  <p className="text-xs text-[#B8C5D6]">
                    Playing in {upNextCountdown} seconds
                  </p>
                </div>
                <button
                  onClick={() => setUpNextVisible(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#2A3A5C] transition-colors"
                >
                  <svg className="w-4 h-4 text-[#6B7A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    const currentIndex = playlist.videos.findIndex(v => v === selectedVideo);
                    const nextIndex = (currentIndex + 1) % playlist.videos.length;
                    setSelectedVideo(playlist.videos[nextIndex]);
                    setUpNextVisible(false);
                  }}
                  className="flex-1 px-3 h-8 rounded-lg bg-[#FF3366] text-xs font-semibold hover:bg-[#E62E5C] transition-colors"
                >
                  Play Now
                </button>
                <button
                  onClick={() => setUpNextVisible(false)}
                  className="px-3 h-8 rounded-lg bg-[#141B3D] text-xs font-medium hover:bg-[#2A3A5C] transition-colors"
                >
                  Cancel
              </button>
              </div>
            </div>
          </div>
          <div className="mt-3 h-1 bg-[#141B3D] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF3366] rounded-full transition-all duration-1000"
              style={{ width: `${((15 - upNextCountdown) / 15) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}