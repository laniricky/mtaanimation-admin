"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this? This action cannot be undone.")) return;
    setLoading(true);
    await fetch(`/api/${type}/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Delete"
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "32px", height: "32px", borderRadius: "7px",
        color: "#6b6580", background: "transparent", border: "none",
        cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, transition: "color 0.15s, background 0.15s",
      }}
      
    >
      {loading ? (
        <span style={{ width: "14px", height: "14px", border: "2px solid rgba(242,132,130,0.3)", borderTopColor: "#F28482", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "block" }} />
      ) : (
        <Trash2 size={15} />
      )}
    </button>
  );
}