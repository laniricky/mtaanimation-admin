"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';

interface EpisodeFormProps {
  initialData?: {
    id?: number;
    title?: string;
    synopsis?: string;
    releaseDate?: string;
    thumbnail?: string;
    videoUrl?: string;
    duration?: string;
    featured?: boolean;
  };
}

export function EpisodeForm({ initialData = {} }: EpisodeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData.title || '',
    synopsis: initialData.synopsis || '',
    releaseDate: initialData.releaseDate || '',
    thumbnail: initialData.thumbnail || '',
    videoUrl: initialData.videoUrl || '',
    duration: initialData.duration || '',
    featured: initialData.featured || false,
  });

  const isEdit = !!initialData.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = isEdit ? `/api/episodes/${initialData.id}` : '/api/episodes';
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    router.push('/dashboard/episodes');
    router.refresh();
  };

  const inputCls = "w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Episode title" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Synopsis</label>
        <textarea rows={4} value={form.synopsis} onChange={e => setForm({ ...form, synopsis: e.target.value })} className={inputCls} placeholder="Episode description..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Release Date</label>
          <input type="date" value={form.releaseDate} onChange={e => setForm({ ...form, releaseDate: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
          <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className={inputCls} placeholder="e.g. 1 minute 30 seconds" />
        </div>
      </div>
      <ImageUpload label="Thumbnail" value={form.thumbnail} onChange={url => setForm({ ...form, thumbnail: url })} />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Embed URL</label>
        <input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} className={inputCls} placeholder="https://www.youtube.com/embed/..." />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-purple-500" />
        <label htmlFor="featured" className="text-gray-300 text-sm">Mark as Featured episode</label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Episode'}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
