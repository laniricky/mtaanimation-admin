export const dynamic = 'force-dynamic'

import { db } from '@/lib/db';
import { episodes } from '@/lib/schema';
import Link from 'next/link';
import { DeleteButton } from '@/components/DeleteButton';

export default async function EpisodesPage() {
  const allEpisodes = await db.select().from(episodes);
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Episodes</h1>
          <p className="text-gray-400 mt-1">{allEpisodes.length} episodes total</p>
        </div>
        <Link href="/dashboard/episodes/new" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
          + Add Episode
        </Link>
      </div>
      <div className="grid gap-4">
        {allEpisodes.map((ep) => (
          <div key={ep.id} className="bg-gray-800 rounded-xl p-5 flex items-center gap-5">
            {ep.thumbnail && <img src={ep.thumbnail} alt={ep.title} className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold truncate">{ep.title}</h3>
                {ep.featured && <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">Featured</span>}
              </div>
              <p className="text-gray-400 text-sm mt-1 line-clamp-1">{ep.synopsis}</p>
              <p className="text-gray-500 text-xs mt-1">{ep.releaseDate} · {ep.duration}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link href={`/dashboard/episodes/${ep.id}`} className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-2 rounded-lg transition-colors">Edit</Link>
              <DeleteButton id={ep.id} type="episodes" />
            </div>
          </div>
        ))}
        {allEpisodes.length === 0 && (
          <div className="text-center py-16 text-gray-500">No episodes yet. <Link href="/dashboard/episodes/new" className="text-purple-400 hover:underline">Add one</Link></div>
        )}
      </div>
    </div>
  );
}
