"use client";

import AddLinkForm from "@/components/AddLinkForm";
import LinksTable from "@/components/LinksTable";
import { useState } from "react";

export default function HomePage() {
  const [newShortUrl, setNewShortUrl] = useState("");

  return (
    <>
      <h1 className="header-title">TinyInLink</h1>

      {/* Short URL Display (Bitly Style) */}
      {newShortUrl && (
        <div className="short-url-box">
          <p className="short-url-label">Your Short Link</p>
          <a href={newShortUrl} className="short-url">
            {newShortUrl}
          </a>
        </div>
      )}

      {/* Create Link */}
      <div className="card">

        <AddLinkForm onCreated={(url: string) => setNewShortUrl(url)} />
      </div>

      {/* Saved Links */}
      <div className="card">
        <h2>Saved Links</h2>
        <LinksTable />
      </div>

      <p className="footer">© {new Date().getFullYear()} TinyInLink</p>
    </>
  );
}
