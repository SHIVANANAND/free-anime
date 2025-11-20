import AnimePageClient from './AnimePageClient';

const data = require('../../../../data/muse_asia_full.json');

export async function generateStaticParams() {
  const playlists = data.playlists || [];
  return playlists.map((_, index) => ({
    id: index.toString(),
  }));
}

export default async function AnimePage({ params }) {
  const { id } = await params;
  const playlistIndex = parseInt(id);
  const playlist = data.playlists?.[playlistIndex];

  if (!playlist) {
    return <div>Playlist not found</div>;
  }

  return <AnimePageClient playlist={playlist} />;
}