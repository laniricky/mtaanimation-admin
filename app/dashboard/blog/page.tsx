export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, FileText, Pencil, CalendarDays, User2 } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

const card = { background: '#2E2E41', border: '1px solid rgba(75,59,71,0.6)', borderRadius: '14px' };

export default async function BlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ece8', margin: 0, letterSpacing: '-0.5px' }}>Blog Posts</h1>
          <p style={{ fontSize: '14px', color: '#8a8499', margin: '6px 0 0' }}>Manage news and behind-the-scenes content.</p>
        </div>
        <Link href="/dashboard/blog/new" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FB6D10', color: '#fff', padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 2px 12px rgba(251,109,16,0.3)' }}>
          <Plus size={15} /> New Post
        </Link>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        {posts.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(132,165,157,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={28} color="#84A59D" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#c5bfc2' }}>No blog posts yet</div>
              <div style={{ fontSize: '13px', color: '#6b6580', marginTop: '4px' }}>Share your behind-the-scenes stories and updates.</div>
            </div>
            <Link href="/dashboard/blog/new" style={{ background: '#FB6D10', color: '#fff', padding: '9px 22px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginTop: '8px' }}>
              Write First Post
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', padding: '12px 20px', background: '#26263a', borderBottom: '1px solid rgba(75,59,71,0.5)', gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Post</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Author</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Actions</div>
            </div>
            {posts.map((post, i) => (
              <div key={post.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', padding: '16px 20px', borderBottom: i < posts.length - 1 ? '1px solid rgba(75,59,71,0.3)' : 'none', gap: '16px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#d8d2d6' }}>{post.title}</div>
                  {post.snippet && <div style={{ fontSize: '12px', color: '#6b6580', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>{post.snippet}</div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8a8499', whiteSpace: 'nowrap' }}>
                  <User2 size={13} color="#6b6580" /> {post.author ?? '—'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8a8499', whiteSpace: 'nowrap' }}>
                  <CalendarDays size={13} color="#6b6580" /> {post.date ?? '—'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                  <Link href={`/dashboard/blog/${post.id}`} title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '7px', color: '#8a8499', textDecoration: 'none' }}>
                    <Pencil size={15} />
                  </Link>
                  <DeleteButton id={post.id} type="blog" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}