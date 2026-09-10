import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  FileText, 
  Plus, 
  Settings,
  LogOut
} from 'lucide-react';

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
    <div className="flex h-screen bg-[#0f1115] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col flex-shrink-0 transition-all duration-300 z-10">
        <div className="p-6 border-b border-gray-800">
          <Link href="/dashboard" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">Mtaanimation</span>
            <span className="text-xs font-medium text-indigo-400 tracking-wider uppercase mt-1">Content Studio</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Main</h3>
            <nav className="space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group">
                <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium text-sm">Overview</span>
              </Link>
              <Link href="/dashboard/episodes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group">
                <Film className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium text-sm">Episodes</span>
              </Link>
              <Link href="/dashboard/characters" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group">
                <Users className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium text-sm">Characters</span>
              </Link>
              <Link href="/dashboard/blog" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group">
                <FileText className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium text-sm">Blog Posts</span>
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Management</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group opacity-60 cursor-not-allowed">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">Settings</span>
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-[#12161c]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 border border-gray-700" } }} />
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm text-gray-200 font-medium truncate">{user?.firstName || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-800 bg-[#161b22]/80 backdrop-blur-sm z-10 flex-shrink-0">
          <div>
            {/* Contextual breadcrumb or simple greeting could go here */}
            <p className="text-sm font-medium text-gray-400 hidden md:block">Welcome back, {user?.firstName || 'Admin'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm shadow-indigo-900/20">
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
              {/* Dropdown for quick create actions */}
              <div className="absolute right-0 mt-2 w-48 bg-[#1c2128] border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div className="py-1">
                  <Link href="/dashboard/episodes/new" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">New Episode</Link>
                  <Link href="/dashboard/characters/new" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">New Character</Link>
                  <Link href="/dashboard/blog/new" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">New Blog Post</Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}