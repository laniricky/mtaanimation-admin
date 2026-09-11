"use client";
import { useState } from "react";
import { Check, MailOpen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MessageActions({ id, read }: { id: number; read: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleRead = async () => {
    setLoading(true);
    await fetch('/api/messages/' + id, { method: "PATCH", body: JSON.stringify({ read: !read }) });
    router.refresh();
    setLoading(false);
  };

  const deleteMsg = async () => {
    if (!confirm("Delete this message?")) return;
    setLoading(true);
    await fetch('/api/messages/' + id, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button onClick={toggleRead} disabled={loading} style={{ background: "transparent", border: "none", cursor: "pointer", color: read ? "#6b6580" : "#FB6D10" }} title={read ? "Mark as unread" : "Mark as read"}>
        {read ? <MailOpen size={15} /> : <Check size={15} />}
      </button>
      <button onClick={deleteMsg} disabled={loading} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#e55a5a" }} title="Delete">
        <Trash2 size={15} />
      </button>
    </div>
  );
}