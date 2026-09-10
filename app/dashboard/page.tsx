export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { episodes, characters, blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { Film, Users, FileText, ArrowRight, PlayCircle, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardOverview() {
  const allEpisodes = await db.select().from(episodes).orderBy(desc(episodes.id)).limit(4);
  const allCharacters = await db.select().from(characters).limit(1000);
  const allPosts = await db.select().from(blogPosts).orderBy(desc(blogPosts.id)).limit(4);

  const stats = [
    {
      label: "Total Episodes",
      value: allEpisodes.length,
      icon: Film,
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
      sub: "Animation series",
      href: "/dashboard/episodes",
    },
    {
      label: "Characters",
      value: allCharacters.length,
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      sub: "Cast members",
      href: "/dashboard/characters",
    },
    {
      label: "Blog Posts",
      value: allPosts.length,
      icon: FileText,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      sub: "News & updates",
      href: "/dashboard/blog",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Overview</h1>
        <p className="text-gray-400">Welcome back. Here is what is happening with your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-[#1c2128] border border-gray-800 rounded-xl p-6 shadow-sm hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 group block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-sm font-medium text-gray-300">{s.label}</p>
            <p className="text-xs text-gray-600 mt-1">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Episodes Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Episodes</h2>
            <Link href="/dashboard/episodes" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors font-medium">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#1c2128] border border-gray-800 rounded-xl overflow-hidden">
            {allEpisodes.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                  <PlayCircle className="w-7 h-7 text-gray-500" />
                </div>
                <p className="text-gray-300 font-medium mb-1">No episodes yet</p>
                <p className="text-sm text-gray-500 mb-5">Start building your animation library.</p>
                <Link href="/dashboard/episodes/new" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Create First Episode
                </Link>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-[#161b22]/50">
                    <th className="py-3 px-5">Episode</th>
                    <th className="py-3 px-5 hidden md:table-cell">Date</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {allEpisodes.map((ep) => (
                    <tr key={ep.id} className="hover:bg-gray-800/20 transition-colors group">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-10 rounded-md overflow-hidden bg-gray-800 flex-shrink-0 border border-gray-700">
                            {ep.thumbnail ? (
                              <Image src={ep.thumbnail} alt={ep.title} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Film className="w-4 h-4 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-200 group-hover:text-indigo-300 transition-colors truncate max-w-[160px]">
                            {ep.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 hidden md:table-cell">
                        <span className="text-sm text-gray-500">{ep.releaseDate ?? "—"}</span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Link href={`/dashboard/episodes/${ep.id}`} className="text-sm font-medium text-gray-500 hover:text-indigo-400 transition-colors">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Blog Posts & Quick Actions */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Recent Posts</h2>
              <Link href="/dashboard/blog" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors font-medium">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="bg-[#1c2128] border border-gray-800 rounded-xl overflow-hidden">
              {allPosts.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-500 mb-4">No posts yet.</p>
                  <Link href="/dashboard/blog/new" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Write first post</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {allPosts.map((post) => (
                    <Link key={post.id} href={`/dashboard/blog/${post.id}`} className="flex items-start gap-3 p-4 hover:bg-gray-800/20 transition-colors group block">
                      <div className="w-1 h-full flex-shrink-0 self-stretch">
                        <div className="w-1 h-full rounded-full bg-indigo-500/30 group-hover:bg-indigo-500 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 group-hover:text-indigo-300 transition-colors truncate">{post.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{post.author ?? "Unknown"} · {post.date ?? "—"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/episodes/new" className="flex items-center gap-3 p-3.5 bg-[#1c2128] border border-gray-800 rounded-xl hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <Film className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">Create Episode</p>
                  <p className="text-xs text-gray-600">Add a new episode</p>
                </div>
                <Plus className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 ml-auto transition-colors" />
              </Link>
              <Link href="/dashboard/characters/new" className="flex items-center gap-3 p-3.5 bg-[#1c2128] border border-gray-800 rounded-xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">Add Character</p>
                  <p className="text-xs text-gray-600">Register a new character</p>
                </div>
                <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-400 ml-auto transition-colors" />
              </Link>
              <Link href="/dashboard/blog/new" className="flex items-center gap-3 p-3.5 bg-[#1c2128] border border-gray-800 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">Write Blog Post</p>
                  <p className="text-xs text-gray-600">Publish news and updates</p>
                </div>
                <Plus className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 ml-auto transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}