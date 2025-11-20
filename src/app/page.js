import Link from 'next/link';
import Image from 'next/image';

const data = require('../../data/muse_asia_full.json');

// Replace this URL with your anime girl image
const HERO_IMAGE_URL = 'https://undeadimpulse.wordpress.com/wp-content/uploads/2019/03/5a03df61cc2ea.jpg';

export default function Home() {
  const playlists = data.playlists || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#1E2749] to-[#0A0E27] opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-20">
            {/* Left Content */}
            <div className="md:flex-1 text-center md:text-left max-w-lg lg:max-w-xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF3366] to-[#FF6B9D] bg-clip-text text-transparent">
                FreeAnime Dekho!
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8">
                All your favourite legally free anime at one place
              </p>
              <Link href="#featured" className="inline-block px-8 py-3 bg-[#FF3366] text-white rounded-lg font-semibold hover:bg-[#E62E5C] transition-colors">
                Explore Now
              </Link>
            </div>

            {/* Right Image */}
            <div className="md:flex-1 flex justify-center md:justify-start max-w-xs lg:max-w-sm">
              {HERO_IMAGE_URL && HERO_IMAGE_URL !== 'https://example.com/anime-girl-image.jpg' ? (
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-2 border-[#FF3366]/30">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="Anime Girl"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#1E2749] rounded-2xl flex items-center justify-center border-2 border-[#FF3366]/30">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Anime Girl Image</p>
                    <p className="text-xs opacity-75">Replace HERO_IMAGE_URL</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Anime */}
      <section id="featured" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {playlists.slice(0, 12).map((playlist, index) => (
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
        </div>
      </section>

      {/* All Anime */}
      <section className="py-16 px-4 bg-[#0F1419]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">All Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {playlists.map((playlist, index) => (
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
                      <div className="w-10 h-10 bg-[#FF3366] rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
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
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-[#FF3366] transition-colors duration-200">{playlist.title}</h3>
                    <div className="text-xs text-gray-500">
                      {playlist.videos?.length || 0} eps
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

