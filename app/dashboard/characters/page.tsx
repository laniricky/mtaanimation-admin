export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { characters } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { Plus, Users, Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export default async function CharactersPage() {
  const chars = await db.select().from(characters);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Characters</h1>
          <p className="text-gray-400">Manage the cast of Mtaanimation.</p>
        </div>
        <Link
          href="/dashboard/characters/new"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Character
        </Link>
      </div>

      {chars.length === 0 ? (
        <div className="bg-[#1c2128] border border-gray-800 rounded-xl p-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-200 mb-1">No characters yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Build your roster by adding your first character.
          </p>
          <Link
            href="/dashboard/characters/new"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >
            Add First Character
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {chars.map((char) => (
            <div
              key={char.id}
              className="bg-[#1c2128] border border-gray-800 rounded-xl overflow-hidden shadow-sm hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200 flex flex-col group"
            >
              <div className="relative h-44 bg-gray-800">
                {char.image ? (
                  <Image src={char.image} alt={char.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div>
                  <h3 className="font-semibold text-gray-100 group-hover:text-indigo-300 transition-colors">{char.name}</h3>
                  {char.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{char.description}</p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-1 mt-auto pt-2 border-t border-gray-800">
                  <Link
                    href={`/dashboard/characters/${char.id}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeleteButton id={char.id} type="characters" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}