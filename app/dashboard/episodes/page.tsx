export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { episodes } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Plus, Film, Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

const card = { background: '#2E2E41', border: '1px solid rgba(75,59,71,0.6)', borderRadius: '14px' };

export default async function EpisodesPage() {
  const eps = await db.select().from(episodes).orderBy(desc(episodes.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ece8', margin: 0, letterSpacing: '-0.5px' }}>Episodes</h1>
          <p style={{ fontSize: '14px', color: '#8a8499', margin: '6px 0 0' }}>Manage your animation library.</p>
        </div>
        <Link href="/dashboard/episodes/new" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FB6D10', color: '#fff', padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 2px 12px rgba(251,109,16,0.3)' }}>
          <Plus size={15} /> Add Episode
        </Link>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        {eps.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(251,109,16,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Film size={28} color="#FB6D10" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#c5bfc2' }}>No episodes yet</div>
              <div style={{ fontSize: '13px', color: '#6b6580', marginTop: '4px' }}>Start building your animation library.</div>
            </div>
            <Link href="/dashboard/episodes/new" style={{ background: '#FB6D10', color: '#fff', padding: '9px 22px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginTop: '8px' }}>
              Create First Episode
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#26263a', borderBottom: '1px solid rgba(75,59,71,0.5)' }}>
                <th style={{ padding: '13px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Episode</th>
                <th style={{ padding: '13px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Duration</th>
                <th style={{ padding: '13px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured</th>
                <th style={{ padding: '13px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eps.map((ep, i) => (
                <tr key={ep.id} style={{ borderBottom: i < eps.length - 1 ? '1px solid rgba(75,59,71,0.3)' : 'none' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ position: 'relative', width: '80px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: '#1a1a2e', border: '1px solid rgba(75,59,71,0.5)', flexShrink: 0 }}>
                        {ep.thumbnail ? (
                          <Image src={ep.thumbnail} alt={ep.title} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Film size={18} color="#4a4560" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#d8d2d6' }}>{ep.title}</div>
                        <div style={{ fontSize: '12px', color: '#6b6580', marginTop: '2px' }}>{ep.releaseDate ?? 'No date set'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#8a8499' }}>{ep.duration ?? '—'}</td>
                  <td style={{ padding: '16px 20px' }}>
                    {ep.featured ? (
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: 'rgba(246,189,96,0.12)', color: '#F6BD60', border: '1px solid rgba(246,189,96,0.25)' }}>Featured</span>
                    ) : (
                      <span style={{ color: '#4a4560', fontSize: '13px' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <Link href={`/dashboard/episodes/${ep.id}`} title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '7px', color: '#8a8499', textDecoration: 'none', background: 'transparent' }}>
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton id={ep.id} type="episodes" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}