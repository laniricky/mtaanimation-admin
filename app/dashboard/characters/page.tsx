export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { characters } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { Plus, Users, Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

const card = { background: '#2E2E41', border: '1px solid rgba(75,59,71,0.6)', borderRadius: '14px' };

export default async function CharactersPage() {
  const chars = await db.select().from(characters);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ece8', margin: 0, letterSpacing: '-0.5px' }}>Characters</h1>
          <p style={{ fontSize: '14px', color: '#8a8499', margin: '6px 0 0' }}>Manage the cast of Mtaanimation.</p>
        </div>
        <Link href="/dashboard/characters/new" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FB6D10', color: '#fff', padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 2px 12px rgba(251,109,16,0.3)' }}>
          <Plus size={15} /> Add Character
        </Link>
      </div>

      {chars.length === 0 ? (
        <div style={{ ...card, padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(246,189,96,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={28} color="#F6BD60" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#c5bfc2' }}>No characters yet</div>
            <div style={{ fontSize: '13px', color: '#6b6580', marginTop: '4px' }}>Build your roster by adding your first character.</div>
          </div>
          <Link href="/dashboard/characters/new" style={{ background: '#FB6D10', color: '#fff', padding: '9px 22px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginTop: '8px' }}>
            Add First Character
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {chars.map((char) => (
            <div key={char.id} style={{ ...card, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(251,109,16,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(75,59,71,0.6)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
              <div style={{ position: 'relative', height: '160px', background: '#1a1a2e' }}>
                {char.image ? (
                  <Image src={char.image} alt={char.name} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={36} color="#4a4560" />
                  </div>
                )}
              </div>
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#d8d2d6', margin: '0 0 4px' }}>{char.name}</h3>
                  {char.description && (
                    <p style={{ fontSize: '12px', color: '#6b6580', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{char.description}</p>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(75,59,71,0.4)' }}>
                  <Link href={`/dashboard/characters/${char.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '7px', color: '#8a8499', textDecoration: 'none' }} title="Edit">
                    <Pencil size={14} />
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