export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { episodes, characters, blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { Film, Users, FileText, ArrowRight, PlayCircle, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const card = {
  background: '#2E2E41',
  border: '1px solid rgba(75,59,71,0.6)',
  borderRadius: '14px',
  padding: '24px',
};

export default async function DashboardOverview() {
  const allEpisodes = await db.select().from(episodes).orderBy(desc(episodes.id)).limit(5);
  const allCharacters = await db.select().from(characters);
  const allPosts = await db.select().from(blogPosts).orderBy(desc(blogPosts.id)).limit(4);

  const stats = [
    { label: 'Total Episodes', value: allEpisodes.length, Icon: Film, accent: '#FB6D10', bg: 'rgba(251,109,16,0.1)', href: '/dashboard/episodes', sub: 'Animation series' },
    { label: 'Characters', value: allCharacters.length, Icon: Users, accent: '#F6BD60', bg: 'rgba(246,189,96,0.1)', href: '/dashboard/characters', sub: 'Cast members' },
    { label: 'Blog Posts', value: allPosts.length, Icon: FileText, accent: '#84A59D', bg: 'rgba(132,165,157,0.1)', href: '/dashboard/blog', sub: 'News & updates' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ece8', margin: 0, letterSpacing: '-0.5px' }}>Overview</h1>
        <p style={{ fontSize: '14px', color: '#8a8499', margin: '6px 0 0' }}>Welcome back. Here is what is happening with your content.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ ...card, transition: 'border-color 0.2s, transform 0.2s' }}
              >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.Icon size={20} color={s.accent} />
                </div>
                <ArrowRight size={16} color="#4a4560" />
              </div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#f0ece8', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#c5bfc2', marginTop: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '12px', color: '#6b6580', marginTop: '2px' }}>{s.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Episodes */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f0ece8', margin: 0 }}>Recent Episodes</h2>
            <Link href="/dashboard/episodes" style={{ fontSize: '13px', color: '#FB6D10', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
            {allEpisodes.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(251,109,16,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={28} color="#FB6D10" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#c5bfc2' }}>No episodes yet</div>
                  <div style={{ fontSize: '13px', color: '#6b6580', marginTop: '4px' }}>Start building your animation library.</div>
                </div>
                <Link href="/dashboard/episodes/new" style={{ background: '#FB6D10', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginTop: '4px' }}>
                  Create First Episode
                </Link>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#26263a', borderBottom: '1px solid rgba(75,59,71,0.5)' }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Episode</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                    <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allEpisodes.map((ep, i) => (
                    <tr key={ep.id} style={{ borderBottom: i < allEpisodes.length - 1 ? '1px solid rgba(75,59,71,0.3)' : 'none' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ position: 'relative', width: '64px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#1a1a2e', border: '1px solid rgba(75,59,71,0.5)', flexShrink: 0 }}>
                            {ep.thumbnail ? (
                              <Image src={ep.thumbnail} alt={ep.title} fill style={{ objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Film size={16} color="#4a4560" />
                              </div>
                            )}
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#c5bfc2' }}>{ep.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b6580' }}>{ep.releaseDate ?? '—'}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <Link href={`/dashboard/episodes/${ep.id}`} style={{ fontSize: '13px', fontWeight: 500, color: '#FB6D10', textDecoration: 'none' }}>Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right col: recent posts + quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Posts */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f0ece8', margin: 0 }}>Recent Posts</h2>
              <Link href="/dashboard/blog" style={{ fontSize: '13px', color: '#FB6D10', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
              {allPosts.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: '#6b6580' }}>
                  No posts yet.{' '}
                  <Link href="/dashboard/blog/new" style={{ color: '#FB6D10', textDecoration: 'none', fontWeight: 500 }}>Write one</Link>
                </div>
              ) : (
                <div>
                  {allPosts.map((post, i) => (
                    <Link key={post.id} href={`/dashboard/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '14px 16px', borderBottom: i < allPosts.length - 1 ? '1px solid rgba(75,59,71,0.3)' : 'none', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '3px', height: '36px', borderRadius: '4px', background: '#FB6D10', flexShrink: 0, marginTop: '2px', opacity: 0.5 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#c5bfc2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</div>
                          <div style={{ fontSize: '11px', color: '#6b6580', marginTop: '2px' }}>{post.author ?? 'Unknown'} · {post.date ?? '—'}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f0ece8', margin: '0 0 16px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { href: '/dashboard/episodes/new', label: 'Create Episode', sub: 'Add a new episode', Icon: Film, accent: '#FB6D10', bg: 'rgba(251,109,16,0.08)' },
                { href: '/dashboard/characters/new', label: 'Add Character', sub: 'Register a character', Icon: Users, accent: '#F6BD60', bg: 'rgba(246,189,96,0.08)' },
                { href: '/dashboard/blog/new', label: 'Write Blog Post', sub: 'Publish an update', Icon: FileText, accent: '#84A59D', bg: 'rgba(132,165,157,0.08)' },
              ].map(({ href, label, sub, Icon, accent, bg }) => (
                <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                  <div style={{ ...card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accent + '50'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(75,59,71,0.6)'}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color={accent} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#c5bfc2' }}>{label}</div>
                      <div style={{ fontSize: '11px', color: '#6b6580' }}>{sub}</div>
                    </div>
                    <Plus size={14} color="#4a4560" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}