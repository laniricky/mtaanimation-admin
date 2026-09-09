export const dynamic = 'force-dynamic'

import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import Link from 'next/link';
import { DeleteButton } from '@/components/DeleteButton';

export default async function BlogPage() {
  const posts = await db.select().from(blogPosts);
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">{posts.length} posts total</p>
        </div>
        <Link href="/dashboard/blog/new" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">+ Add Post</Link>
      </div>
      <div className="grid gap-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-gray-800 rounded-xl p-5 flex gap-4">
            {p.image && <img src={p.image} alt={p.title} className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-1">{p.snippet}</p>
              <p className="text-gray-500 text-xs mt-1">{p.date} by {p.author}</p>
              <div className="flex gap-2 mt-3">
                <Link href={`/dashboard/blog/${p.id}`} className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">Edit</Link>
                <DeleteButton id={p.id} type="blog" />
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div className="text-center py-16 text-gray-500">No posts yet.</div>}
      </div>
    </div>
  );
}
