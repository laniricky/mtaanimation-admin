import { EpisodeForm } from '@/components/EpisodeForm';

export default function NewEpisodePage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-2">Add Episode</h1>
      <p className="text-gray-400 mb-8">Create a new episode for the site</p>
      <EpisodeForm />
    </div>
  );
}
