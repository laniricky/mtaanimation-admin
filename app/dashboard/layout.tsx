import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

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
    <div className="flex min-h-screen bg-gray-950">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">Mtaanimation</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <span>📊 Overview</span>
          </Link>
          <Link href="/dashboard/episodes" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <span>🎬 Episodes</span>
          </Link>
          <Link href="/dashboard/characters" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <span>🧑‍🎨 Characters</span>
          </Link>
          <Link href="/dashboard/blog" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <span>📝 Blog Posts</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800 flex items-center gap-3">
          <UserButton />
          <div>
            <p className="text-sm text-white font-medium">{user?.firstName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}