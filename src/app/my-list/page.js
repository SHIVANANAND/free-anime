export default function MyListPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">My List</h1>
        <div className="bg-[#1E2749] rounded-lg p-12">
          <div className="w-24 h-24 bg-[#FF3366] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your Watchlist</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Save your favorite anime to watch later. This feature will be available soon!
          </p>
          <button className="px-6 py-3 bg-[#FF3366] text-white rounded-lg font-semibold hover:bg-[#E62E5C] transition-colors">
            Browse Anime
          </button>
        </div>
      </div>
    </div>
  );
}