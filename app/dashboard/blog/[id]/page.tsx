import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { BlogForm } from '@/components/BlogForm';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const p = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(params.id)));
  if (!p.length) notFound();
  const post = p[0];
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-2">Edit Post</h1>
      <p className="text-gray-400 mb-8">Update blog post content</p>
      <BlogForm initialData={{
        id: post.id,
        title: post.title,
        snippet: post.snippet ?? undefined,
        content: post.content ?? undefined,
        date: post.date ?? undefined,
        author: post.author ?? undefined,
        image: post.image ?? undefined,
      }} />
    </div>
  );
}
