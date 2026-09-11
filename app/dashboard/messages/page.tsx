export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { MessageSquare, User2, Mail } from "lucide-react";
import MessageActions from "@/components/MessageActions";

const card = { background: '#2E2E41', border: '1px solid rgba(75,59,71,0.6)', borderRadius: '14px' };

export default async function MessagesPage() {
  const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0ece8', margin: 0, letterSpacing: '-0.5px' }}>Contact Messages</h1>
          <p style={{ fontSize: '14px', color: '#8a8499', margin: '6px 0 0' }}>View messages submitted from the public website.</p>
        </div>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        {messages.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(132,165,157,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={28} color="#84A59D" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#c5bfc2' }}>No messages yet</div>
              <div style={{ fontSize: '13px', color: '#6b6580', marginTop: '4px' }}>When visitors contact you, messages will appear here.</div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {messages.map((msg, i) => (
              <div key={msg.id} style={{ padding: '20px', borderBottom: i < messages.length - 1 ? '1px solid rgba(75,59,71,0.3)' : 'none', display: 'flex', flexDirection: 'column', gap: '12px', opacity: msg.read ? 0.7 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {!msg.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FB6D10', marginTop: '4px' }} />}
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: msg.read ? 500 : 700, color: '#f0ece8' }}>{msg.subject}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#8a8499', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User2 size={13} /> {msg.name}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={13} /> {msg.email}</span>
                        <span>•</span>
                        <span>{msg.createdAt?.toLocaleString() ?? "Unknown date"}</span>
                      </div>
                    </div>
                  </div>
                  <MessageActions id={msg.id} read={msg.read ?? false} />
                </div>
                <div style={{ padding: '16px', background: 'rgba(38,38,58,0.5)', borderRadius: '8px', fontSize: '14px', color: '#d8d2d6', whiteSpace: 'pre-wrap', lineHeight: 1.5, marginLeft: !msg.read ? '24px' : '0' }}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}