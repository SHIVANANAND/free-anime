'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const data = require('../../../data/muse_asia_full.json');

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlaylists, setFilteredPlaylists] = useState(
    (data.playlists || []).map((playlist, index) => ({ playlist, index }))
  );

  useEffect(() => {
    const storedTerm = localStorage.getItem('searchTerm');
    if (storedTerm) {
      setSearchTerm(storedTerm);
      localStorage.removeItem('searchTerm');
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlaylists((data.playlists || []).map((playlist, index) => ({ playlist, index })));
    } else {
      const filtered = (data.playlists || [])
        .map((playlist, index) => ({ playlist, index }))
        .filter(({ playlist }) =>
          playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredPlaylists(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Browse Anime</h1>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 bg-[#1E2749] border border-[#2A3A5C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3366]"
            />
            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  setSearchTerm(''); // Clear search
                } else {
                  // Focus input (though it's already focused when clicking icon)
                  document.querySelector('input[placeholder="Search anime..."]').focus();
                }
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
            >
              {searchTerm.trim() ? (
                // Clear icon when there's text
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Search icon when empty
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-gray-400">
          {filteredPlaylists.length} anime found
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
          {filteredPlaylists.map(({ playlist, index }) => (
            <Link key={index} href={`/anime/${index}/`} className="group">
              <div className="bg-[#1E2749] rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-[#FF3366]/20 transition-all duration-300">
                <div className="aspect-video relative">
                  <Image
                    src={playlist.videos?.[0]?.thumbnail || '/placeholder.jpg'}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#FF3366] rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs text-white font-medium">{playlist.videos?.length || 0} eps</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="font-semibold text-sm lg:text-base mb-2 line-clamp-2 group-hover:text-[#FF3366] transition-colors duration-200">{playlist.title}</h3>
                  <p className="text-gray-400 text-xs lg:text-sm line-clamp-2">{playlist.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPlaylists.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No anime found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}