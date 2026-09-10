"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this? This action cannot be undone.')) return;
    setLoading(true);
    await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-40"
      title="Delete"
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-red-400/40 border-t-red-400 rounded-full animate-spin block" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}