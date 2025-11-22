"use client";

import { useState } from "react";

export default function AddLinkForm({ onCreated }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_url: targetUrl,
          custom_code: customCode || undefined,
        }),
      });

      const data = await res.json();

      if (data.shortUrl) {
        onCreated(data.shortUrl);
        setTargetUrl("");
        setCustomCode("");
        if (window.refreshLinks) window.refreshLinks();
      } else {
        console.error("Create failed:", data.error);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="input"
          placeholder="https://example.com"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Custom Code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />

        <button className="button-primary">Create Short Link</button>
      </div>
    </form>
  );
}
