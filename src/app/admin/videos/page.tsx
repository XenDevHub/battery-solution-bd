"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (data) setVideos(data);
  };

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('videos').insert([{ title: newVideo.title, youtube_url: newVideo.url }]);
    if (error) {
      alert(error.message);
    } else {
      setNewVideo({ title: "", url: "" });
      fetchVideos();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this video?")) {
      await supabase.from('videos').delete().eq('id', id);
      fetchVideos();
    }
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      <div>
        <h1 className="headline-lg" style={{ marginBottom: "2rem" }}>Video Content Portal</h1>
        <form onSubmit={handleSync} style={{ backgroundColor: "#fff", padding: "2rem", border: "1px solid var(--outline-variant)" }}>
          <h3 className="headline-md" style={{ marginBottom: "1.5rem" }}>Add New Tutorial</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="label-caps">Video Title</label>
              <input required value={newVideo.title} onChange={(e) => setNewVideo({...newVideo, title: e.target.value})} type="text" placeholder="e.g. How to install solar battery" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
            </div>
            <div>
              <label className="label-caps">YouTube URL or Embed Code</label>
              <input required value={newVideo.url} onChange={(e) => setNewVideo({...newVideo, url: e.target.value})} type="text" placeholder="Paste link or <iframe...>" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
            </div>
            <button disabled={loading} type="submit" style={{
              backgroundColor: "var(--tertiary)",
              color: "#fff",
              padding: "1rem",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }} className="label-caps">
              {loading ? "Syncing..." : "Sync to Website"}
            </button>
          </div>
        </form>
      </div>

      <div>
        <h3 className="headline-md" style={{ marginBottom: "1.5rem" }}>Live Content</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {videos.map((v) => (
            <div key={v.id} style={{ backgroundColor: "#fff", padding: "1rem", border: "1px solid var(--outline-variant)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p className="body-md" style={{ fontWeight: "bold" }}>{v.title}</p>
                <p style={{ fontSize: "12px", color: "var(--primary)" }}>{v.youtube_url}</p>
              </div>
              <button onClick={() => handleDelete(v.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
          {videos.length === 0 && <p className="body-md" style={{ opacity: 0.5 }}>No videos synced yet.</p>}
        </div>
      </div>
    </div>
  );
}
