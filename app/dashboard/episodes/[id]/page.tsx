import { db } from '@/lib/db';
import { episodes } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { EpisodeForm } from '@/components/EpisodeForm';

export default async function EditEpisodePage({ params }: { params: { id: string } }) {
  const ep = await db.select().from(episodes).where(eq(episodes.id, parseInt(params.id)));
  if (!ep.length) notFound();
  const e = ep[0];
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-2">Edit Episode</h1>
      <p className="text-gray-400 mb-8">Update episode details</p>
      <EpisodeForm initialData={{
        id: e.id,
        title: e.title,
        synopsis: e.synopsis ?? undefined,
        releaseDate: e.releaseDate ?? undefined,
        thumbnail: e.thumbnail ?? undefined,
        videoUrl: e.videoUrl ?? undefined,
        duration: e.duration ?? undefined,
        featured: e.featured ?? undefined,
      }} />
    </div>
  );
}
