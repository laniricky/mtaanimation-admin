export const dynamic = 'force-dynamic'

import { db } from '@/lib/db';
import { characters } from '@/lib/schema';
import Link from 'next/link';
import { DeleteButton } from '@/components/DeleteButton';

export default async function CharactersPage() {
  const all = await db.select().from(characters);
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Characters</h1>
          <p className="text-gray-400 mt-1">{all.length} characters total</p>
        </div>
        <Link href="/dashboard/characters/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">+ Add Character</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {all.map((c) => (
          <div key={c.id} className="bg-gray-800 rounded-xl p-5 flex gap-4">
            {c.image && <img src={c.image} alt={c.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold">{c.name}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{c.description}</p>
              {c.funFacts && c.funFacts.length > 0 && (
                <p className="text-gray-500 text-xs mt-1">{c.funFacts.length} fun fact(s)</p>
              )}
              <div className="flex gap-2 mt-3">
                <Link href={`/dashboard/characters/${c.id}`} className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">Edit</Link>
                <DeleteButton id={c.id} type="characters" />
              </div>
            </div>
          </div>
        ))}
        {all.length === 0 && <div className="col-span-2 text-center py-16 text-gray-500">No characters yet.</div>}
      </div>
    </div>
  );
}
