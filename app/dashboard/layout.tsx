import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard, Film, Users, FileText, Plus, Settings } from 'lucide-react';

const ALLOWED_EMAILS = [
  'mtaanimation0@gmail.com',
  'laniaffici@gmail.com',
  'fredricklani@gmail.com',
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase();

  if (!email || !ALLOWED_EMAILS.includes(email)) {
    redirect('/unauthorized');
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#1a1a2e', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: '256px',
        background: '#2E2E41',
        borderRight: '1px solid rgba(75,59,71,0.6)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(75,59,71,0.6)' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0ece8', letterSpacing: '-0.5px' }}>Mtaanimation</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#FB6D10', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>Content Studio</div>
          </Link>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 12px' }}>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1.5px', padding: '0 12px', marginBottom: '8px' }}>Main</div>
            {[
              { href: '/dashboard', label: 'Overview', Icon: LayoutDashboard },
              { href: '/dashboard/episodes', label: 'Episodes', Icon: Film },
              { href: '/dashboard/characters', label: 'Characters', Icon: Users },
              { href: '/dashboard/blog', label: 'Blog Posts', Icon: FileText },
            ].map(({ href, label, Icon }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '8px',
                  color: '#c5bfc2', fontSize: '14px', fontWeight: 500,
                  marginBottom: '2px', transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(251,109,16,0.12)';
                  (e.currentTarget as HTMLElement).style.color = '#FB6D10';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = '';
                  (e.currentTarget as HTMLElement).style.color = '#c5bfc2';
                }}>
                  <Icon size={16} />
                  {label}
                </div>
              </Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#6b6580', textTransform: 'uppercase', letterSpacing: '1.5px', padding: '0 12px', marginBottom: '8px' }}>Management</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: '#4a4560', fontSize: '14px', fontWeight: 500, cursor: 'not-allowed' }}>
              <Settings size={16} />
              Settings
            </div>
          </div>
        </div>

        {/* User Section */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(75,59,71,0.6)', background: '#26263a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '10px' }}>
            <UserButton appearance={{ elements: { avatarBox: 'w-9 h-9' } }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0ece8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.firstName || 'Admin'}</div>
              <div style={{ fontSize: '11px', color: '#6b6580', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Top Header */}
        <header style={{
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', borderBottom: '1px solid rgba(75,59,71,0.4)',
          background: 'rgba(46,46,65,0.8)', backdropFilter: 'blur(12px)', flexShrink: 0,
        }}>
          <div style={{ fontSize: '13px', color: '#8a8499' }}>
            Welcome back, <span style={{ color: '#f0ece8', fontWeight: 500 }}>{user?.firstName || 'Admin'}</span>
          </div>
          <div style={{ position: 'relative' }} className="group">
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#FB6D10', color: '#fff', border: 'none',
              padding: '8px 18px', borderRadius: '8px', fontWeight: 600,
              fontSize: '13px', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(251,109,16,0.3)',
            }}>
              <Plus size={15} />
              Create
            </button>
            <div className="absolute right-0 mt-2 w-48 rounded-xl border z-50 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              style={{ background: '#2E2E41', border: '1px solid rgba(75,59,71,0.6)', top: '100%' }}>
              {[
                { href: '/dashboard/episodes/new', label: 'New Episode' },
                { href: '/dashboard/characters/new', label: 'New Character' },
                { href: '/dashboard/blog/new', label: 'New Blog Post' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ display: 'block', padding: '9px 16px', fontSize: '13px', color: '#c5bfc2', textDecoration: 'none' }}
                  className="hover:bg-[rgba(251,109,16,0.12)] hover:text-[#FB6D10] transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}