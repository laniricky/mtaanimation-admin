"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteButton({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this?')) return;
    setLoading(true);
    await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500/20 hover:bg-red-500/40 text-red-400 text-sm px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? '...' : 'Delete'}
    </button>
  );
}
