"use client";
import { useState, useRef } from 'react';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    onChange(data.url);
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload below"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="mt-2 text-sm text-purple-400 hover:text-purple-300 disabled:opacity-50"
          >
            {uploading ? 'Uploading to Cloudinary...' : '⬆ Upload from device'}
          </button>
        </div>
        {value && <img src={value} alt="preview" className="w-24 h-16 object-cover rounded-lg border border-gray-600" />}
      </div>
    </div>
  );
}
