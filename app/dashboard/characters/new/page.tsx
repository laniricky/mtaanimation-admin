import { CharacterForm } from '@/components/CharacterForm';
export default function NewCharacterPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-2">Add Character</h1>
      <p className="text-gray-400 mb-8">Create a new character profile</p>
      <CharacterForm />
    </div>
  );
}
