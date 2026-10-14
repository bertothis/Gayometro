"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [inCorso, setInCorso] = useState(false);

  async function esci() {
    if (inCorso) return;
    setInCorso(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.refresh();
    } finally {
      setInCorso(false);
    }
  }

  return (
    <button type="button" onClick={esci} className="btn btn-paper" disabled={inCorso}>
      Esci
    </button>
  );
}
