"use client";

import { useEffect, useState } from "react";

export default function LinksTable() {
  const [links, setLinks] = useState([]);

  async function loadLinks() {
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data.links || []);
    } catch (err) {
      console.error("Load links failed:", err);
    }
  }

  // allow parent to refresh after new link creation
  useEffect(() => {
    window.refreshLinks = loadLinks;
    loadLinks();
  }, []);

  async function deleteLink(code) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    loadLinks();
  }

  return (
    <div className="card">

      <div className="link-list">
        {links.map((item) => (
          <div key={item.id} className="link-item">

            {/* left side */}
            <div className="link-left">
              <a
                className="short-link"
                href={`/${item.code}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {typeof window !== "undefined"
                  ? `${window.location.origin}/${item.code}`
                  : `/${item.code}`}
              </a>

              <p className="original-url">{item.target_url}</p>
            </div>

            {/* right side */}
            <div className="link-actions">
              <a className="view-link" href={`/stats/${item.code}`}>
                Stats
              </a>

              <button
                className="btn-delete"
                onClick={() => deleteLink(item.code)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
