export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { episodes } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Plus, Film, Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export default async function EpisodesPage() {
  const eps = await db.select().from(episodes).orderBy(desc(episodes.id));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Episodes</h1>
          <p className="text-gray-400">Manage your animation library.</p>
        </div>
        <Link
          href="/dashboard/episodes/new"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Episode
        </Link>
      </div>

      <div className="bg-[#1c2128] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        {eps.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
              <Film className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-200 mb-1">No episodes yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Start building your animation library by creating your first episode.
            </p>
            <Link
              href="/dashboard/episodes/new"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Create First Episode
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-[#161b22]/50">
                  <th className="py-4 px-6">Episode</th>
                  <th className="py-4 px-6 hidden md:table-cell">Duration</th>
                  <th className="py-4 px-6 hidden lg:table-cell">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {eps.map((ep, i) => (
                  <tr key={ep.id} className="hover:bg-gray-800/20 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-14 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 border border-gray-700">
                          {ep.thumbnail ? (
                            <Image src={ep.thumbnail} alt={ep.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Film className="w-5 h-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors leading-snug">
                            {ep.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {ep.releaseDate ?? "No date set"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="text-sm text-gray-400">{ep.duration ?? "—"}</span>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      {ep.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Featured
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/episodes/${ep.id}`}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={ep.id} type="episodes" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}