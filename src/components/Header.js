'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      localStorage.setItem('searchTerm', searchTerm.trim());
      router.push('/browse/');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="h-16 bg-[#0A0E27]/95 backdrop-blur-sm border-b border-[#1E2749] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-8">
          <Link href="/" className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#FF3366] to-[#FF6B9D] bg-clip-text text-transparent">
            FreeAnime
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</Link>
            <Link href="/browse/" className="text-gray-300 hover:text-white transition-colors duration-200">Browse</Link>
            <Link href="/my-list/" className="text-gray-300 hover:text-white transition-colors duration-200">My List</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Desktop Search */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-64 pl-4 pr-10 py-2 bg-[#1E2749] border border-[#2A3A5C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition-all duration-200"
            />
            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  localStorage.setItem('searchTerm', searchTerm.trim());
                  router.push('/browse/');
                  setMobileMenuOpen(false);
                }
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0A0E27]/95 backdrop-blur-sm border-b border-[#1E2749] z-40">
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">Home</Link>
              <Link href="/browse/" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">Browse</Link>
              <Link href="/my-list/" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">My List</Link>
            </nav>
            <div className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-4 pr-10 py-2 bg-[#1E2749] border border-[#2A3A5C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition-all duration-200"
              />
              <button
                onClick={() => {
                  if (searchTerm.trim()) {
                    localStorage.setItem('searchTerm', searchTerm.trim());
                    router.push('/browse/');
                    setMobileMenuOpen(false);
                  }
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}