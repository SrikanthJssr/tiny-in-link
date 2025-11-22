"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";

export default function StatsPage({ params }) {
  const [code, setCode] = useState<string | null>(null);
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Unwrap params.code safely (Next.js 16 gives a Promise)
  useEffect(() => {
    async function unwrap() {
      const resolved = await params; // Next.js passes params as async object
      setCode(resolved.code);
    }
    unwrap();
  }, [params]);

  // 2️⃣ Fetch stats after code is ready
  useEffect(() => {
    if (!code) return;

    async function loadStats() {
      try {
        const res = await fetch(`/api/links/${code}`);
        const data = await res.json();

        if (data.link) {
          setLink(data.link);
        } else {
          setLink(null);
        }
      } catch (err) {
        setLink(null);
      }

      setLoading(false);
    }

    loadStats();
  }, [code]);

  // 3️⃣ UI States
  if (loading) {
    return <p className="loading-text">Loading stats...</p>;
  }

  if (!link) {
    return <p className="error-text">Link Not Found</p>;
  }

  // 4️⃣ Final Render
  return (
    <>
      <h1 className="page-title">Stats for: {link.code}</h1>
      <StatsCard link={link} />
    </>
  );
}
