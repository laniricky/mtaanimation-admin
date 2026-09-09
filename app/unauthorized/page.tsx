import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4 text-center">
      <div className="mb-8">
        <UserButton />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Your email address is not authorized to access the MTA Animation Admin Dashboard. 
        Please sign in with an authorized account.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}