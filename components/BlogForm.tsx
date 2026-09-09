"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';

interface BlogFormProps {
  initialData?: {
    id?: number;
    title?: string;
    snippet?: string;
    content?: string;
    date?: string;
    author?: string;
    image?: string;
  };
}

export function BlogForm({ initialData = {} }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData.title || '',
    snippet: initialData.snippet || '',
    content: initialData.content || '',
    date: initialData.date || new Date().toISOString().split('T')[0],
    author: initialData.author || 'Fredrick Lani',
    image: initialData.image || '',
  });
  const isEdit = !!initialData.id;
  const inputCls = "w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-green-500";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = isEdit ? `/api/blog/${initialData.id}` : '/api/blog';
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    router.push('/dashboard/blog');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Post title" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Snippet (short preview)</label>
        <textarea rows={2} value={form.snippet} onChange={e => setForm({ ...form, snippet: e.target.value })} className={inputCls} placeholder="A short summary shown on the blog list..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Content (HTML supported)</label>
        <textarea rows={12} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className={`${inputCls} font-mono text-sm`} placeholder="<p>Your blog content here...</p>" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
          <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className={inputCls} placeholder="Author name" />
        </div>
      </div>
      <ImageUpload label="Cover Image" value={form.image} onChange={url => setForm({ ...form, image: url })} />
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Publish Post'}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">Cancel</button>
      </div>
    </form>
  );
}
