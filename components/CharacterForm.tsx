"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';

interface CharacterFormProps {
  initialData?: {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    funFacts?: string[];
  };
}

export function CharacterForm({ initialData = {} }: CharacterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    image: initialData.image || '',
    funFacts: initialData.funFacts || [''],
  });

  const isEdit = !!initialData.id;

  const handleFactChange = (i: number, val: string) => {
    const facts = [...form.funFacts];
    facts[i] = val;
    setForm({ ...form, funFacts: facts });
  };

  const addFact = () => setForm({ ...form, funFacts: [...form.funFacts, ''] });
  const removeFact = (i: number) => setForm({ ...form, funFacts: form.funFacts.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const body = { ...form, funFacts: form.funFacts.filter(f => f.trim()) };
    const url = isEdit ? `/api/characters/${initialData.id}` : '/api/characters';
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    router.push('/dashboard/characters');
    router.refresh();
  };

  const inputCls = "w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Character name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="Character description..." />
      </div>
      <ImageUpload label="Character Image" value={form.image} onChange={url => setForm({ ...form, image: url })} />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Fun Facts</label>
        <div className="space-y-2">
          {form.funFacts.map((fact, i) => (
            <div key={i} className="flex gap-2">
              <input value={fact} onChange={e => handleFactChange(i, e.target.value)} className={inputCls} placeholder={`Fun fact ${i + 1}`} />
              <button type="button" onClick={() => removeFact(i)} className="text-red-400 hover:text-red-300 px-2">✕</button>
            </div>
          ))}
          <button type="button" onClick={addFact} className="text-blue-400 hover:text-blue-300 text-sm mt-1">+ Add fun fact</button>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Character'}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">Cancel</button>
      </div>
    </form>
  );
}
