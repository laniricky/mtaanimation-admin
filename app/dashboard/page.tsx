import { db } from '@/lib/db';
import { episodes, characters, blogPosts } from '@/lib/schema';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

export default async function DashboardPage() {
  const [episodeCount, charCount, blogCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(episodes),
    db.select({ count: sql<number>`count(*)` }).from(characters),
    db.select({ count: sql<number>`count(*)` }).from(blogPosts),
  ]);

  const stats = [
    { label: 'Episodes', count: episodeCount[0].count, href: '/dashboard/episodes', icon: '🎥', color: 'from-purple-600 to-purple-800' },
    { label: 'Characters', count: charCount[0].count, href: '/dashboard/characters', icon: '👥', color: 'from-blue-600 to-blue-800' },
    { label: 'Blog Posts', count: blogCount[0].count, href: '/dashboard/blog', icon: '📝', color: 'from-green-600 to-green-800' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Manage your Mtaanimation content</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`bg-gradient-to-br ${s.color} rounded-2xl p-6 hover:scale-105 transition-transform`}>
            <div className="text-4xl mb-3">{s.icon}</div>
            <div className="text-4xl font-bold text-white">{s.count}</div>
            <div className="text-white/80 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/episodes/new" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors text-white">
          <span className="text-2xl">➕</span> Add Episode
        </Link>
        <Link href="/dashboard/characters/new" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors text-white">
          <span className="text-2xl">➕</span> Add Character
        </Link>
        <Link href="/dashboard/blog/new" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors text-white">
          <span className="text-2xl">➕</span> Add Blog Post
        </Link>
      </div>
    </div>
  );
}
