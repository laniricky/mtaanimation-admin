import { db } from '@/lib/db';
import { characters } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { CharacterForm } from '@/components/CharacterForm';

export default async function EditCharacterPage({ params }: { params: { id: string } }) {
  const c = await db.select().from(characters).where(eq(characters.id, parseInt(params.id)));
  if (!c.length) notFound();
  const ch = c[0];
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-2">Edit Character</h1>
      <p className="text-gray-400 mb-8">Update character details</p>
      <CharacterForm initialData={{
        id: ch.id,
        name: ch.name,
        description: ch.description ?? undefined,
        image: ch.image ?? undefined,
        funFacts: ch.funFacts ?? undefined,
      }} />
    </div>
  );
}
