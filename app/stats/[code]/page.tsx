"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";

export default function StatsPage({
  params,
}: {
  params: { code: string };
}) {
  const [code, setCode] = useState<string | null>(null);
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      setCode(params.code);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!code) return;

    async function loadStats() {
      const res = await fetch(`/api/links/${code}`);
      const data = await res.json();

      if (data.link) {
        setLink(data.link);
      } else {
        setLink(null);
      }

      setLoading(false);
    }

    loadStats();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (!link) return <p className="error-text">Link Not Found</p>;

  return (
    <>
      <h1 className="page-title">Stats for: {link.code}</h1>
      <StatsCard link={link} />
    </>
  );
}
