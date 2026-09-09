import { BlogForm } from '@/components/BlogForm';
export default function NewBlogPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-2">New Blog Post</h1>
      <p className="text-gray-400 mb-8">Write and publish a new post</p>
      <BlogForm />
    </div>
  );
}
