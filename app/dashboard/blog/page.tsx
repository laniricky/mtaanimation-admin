export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, FileText, Pencil, CalendarDays, User2 } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export default async function BlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.id));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Blog Posts</h1>
          <p className="text-gray-400">Manage your news and behind-the-scenes content.</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="bg-[#1c2128] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        {posts.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-200 mb-1">No blog posts yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Share your behind-the-scenes stories and production updates.
            </p>
            <Link
              href="/dashboard/blog/new"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Write First Post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-[#161b22]/50">
              <div className="col-span-6">Post</div>
              <div className="col-span-2 hidden md:block">Author</div>
              <div className="col-span-2 hidden lg:block">Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-12 gap-4 py-4 px-6 hover:bg-gray-800/20 transition-colors items-center group"
              >
                <div className="col-span-6 md:col-span-6">
                  <p className="font-semibold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors leading-snug">
                    {post.title}
                  </p>
                  {post.snippet && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.snippet}</p>
                  )}
                </div>
                <div className="col-span-2 hidden md:flex items-center gap-1.5">
                  <User2 className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-400 truncate">{post.author ?? "—"}</span>
                </div>
                <div className="col-span-2 hidden lg:flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-400">{post.date ?? "—"}</span>
                </div>
                <div className="col-span-6 md:col-span-2 flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/blog/${post.id}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeleteButton id={post.id} type="blog" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}