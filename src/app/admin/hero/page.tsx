"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface HeroImage {
  id: string;
  url: string;
  position: "slider" | "static_top" | "static_bottom";
}

export default function HeroAdmin() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newPosition, setNewPosition] = useState<"slider" | "static_top" | "static_bottom">("slider");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPosition, setEditPosition] = useState<"slider" | "static_top" | "static_bottom">("slider");

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("hero_images").select("*").order("created_at", { ascending: true });
    if (!error && data) {
      setImages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileUpload = async (fileToUpload: File) => {
    try {
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, fileToUpload);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
      return null;
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    
    setUploading(true);
    const publicUrl = await handleFileUpload(file);
    
    if (publicUrl) {
      const { error } = await supabase.from("hero_images").insert([{ url: publicUrl, position: newPosition }]);
      if (error) {
        alert("Error saving image to database: " + error.message);
      } else {
        setFile(null);
        setNewPosition("slider");
        // Reset file input
        const fileInput = document.getElementById('hero-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        fetchImages();
      }
    }
    setUploading(false);
  };

  const handleDelete = async (img: HeroImage) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    // Optional: Delete from storage as well
    const fileName = img.url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('hero-images').remove([`hero/${fileName}`]);
    }

    const { error } = await supabase.from("hero_images").delete().eq("id", img.id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchImages();
    }
  };

  const handleEdit = (img: HeroImage) => {
    setEditingId(img.id);
    setEditPosition(img.position);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    
    setUploading(true);
    let publicUrl = images.find(img => img.id === editingId)?.url;

    if (editFile) {
      const uploadedUrl = await handleFileUpload(editFile);
      if (uploadedUrl) publicUrl = uploadedUrl;
    }

    const { error } = await supabase.from("hero_images").update({ url: publicUrl, position: editPosition }).eq("id", editingId);
    if (error) {
      alert("Error updating: " + error.message);
    } else {
      setEditingId(null);
      setEditFile(null);
      fetchImages();
    }
    setUploading(false);
  };

  return (
    <div style={{ padding: "0", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="headline-lg" style={{ marginBottom: "2rem" }}>Manage Hero Images</h1>

      <div style={{ backgroundColor: "var(--surface-container)", padding: "1.25rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h2 className="headline-sm" style={{ marginBottom: "1rem" }}>Upload New Image</h2>
        <form onSubmit={handleCreate} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 100%", minWidth: "200px" }} className="form-item">
            <label className="label-caps" style={{ display: "block", marginBottom: "0.5rem" }}>Select Image File</label>
            <input
              id="hero-file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--outline)" }}
            />
          </div>
          <div style={{ flex: "1 1 100%", minWidth: "200px" }} className="form-item">
            <label className="label-caps" style={{ display: "block", marginBottom: "0.5rem" }}>Position</label>
            <select 
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value as any)}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--outline)" }}
            >
              <option value="slider">Slider (80% Area)</option>
              <option value="static_top">Static Top (20% Area)</option>
              <option value="static_bottom">Static Bottom (20% Area)</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={uploading}
            style={{ 
              width: "100%",
              padding: "0.75rem 1.5rem", 
              backgroundColor: "var(--primary)", 
              color: "var(--on-primary)", 
              border: "none", 
              borderRadius: "4px", 
              cursor: uploading ? "not-allowed" : "pointer",
              opacity: uploading ? 0.7 : 1
            }}
            className="submit-btn"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        <p style={{ fontSize: "12px", marginTop: "1rem", opacity: 0.7 }}>
          * Ensure a bucket named <b>"hero-images"</b> exists in your Supabase Storage with public access.
        </p>
      </div>

      <div style={{ backgroundColor: "var(--surface-container)", padding: "1.25rem", borderRadius: "8px" }}>
        <h2 className="headline-sm" style={{ marginBottom: "1rem" }}>Existing Images</h2>
        {loading ? (
          <p>Loading...</p>
        ) : images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {images.map(img => (
              <li key={img.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem", borderBottom: "1px solid var(--outline-variant)" }}>
                {editingId === img.id ? (
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div style={{ flex: "1 1 100%", minWidth: "200px" }}>
                      <label className="label-caps" style={{ display: "block", marginBottom: "0.5rem" }}>Change Image (Optional)</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                        style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--outline)" }}
                      />
                    </div>
                    <div style={{ flex: "1 1 100%" }}>
                      <label className="label-caps" style={{ display: "block", marginBottom: "0.5rem" }}>Position</label>
                      <select 
                        value={editPosition}
                        onChange={(e) => setEditPosition(e.target.value as any)}
                        style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--outline)" }}
                      >
                        <option value="slider">Slider</option>
                        <option value="static_top">Static Top</option>
                        <option value="static_bottom">Static Bottom</option>
                      </select>
                    </div>
                    <button onClick={handleUpdate} disabled={uploading} style={{ flex: 1, padding: "0.5rem 1rem", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      {uploading ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setEditingId(null)} style={{ flex: 1, padding: "0.5rem 1rem", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }} className="image-item-row">
                    <div style={{ flex: 1, display: "flex", gap: "1rem", alignItems: "center" }} className="image-info-box">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="hero part" style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "4px", backgroundColor: "#ddd" }} />
                      <div>
                        <span className="label-caps" style={{ color: "var(--secondary)", display: "inline-block", padding: "2px 8px", background: "rgba(0,0,0,0.05)", borderRadius: "12px", fontSize: "10px" }}>
                          {img.position.replace('_', ' ').toUpperCase()}
                        </span>
                        <div style={{ fontSize: "10px", marginTop: "4px", opacity: 0.5, wordBreak: "break-all" }} className="hidden sm:block">{img.url.substring(0, 30)}...</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => handleEdit(img)} style={{ padding: "0.5rem", backgroundColor: "transparent", border: "1px solid var(--primary)", color: "var(--primary)", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>edit</span>
                      </button>
                      <button onClick={() => handleDelete(img)} style={{ padding: "0.5rem", backgroundColor: "transparent", border: "1px solid red", color: "red", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx>{`
        @media (min-width: 601px) {
          .form-item {
            flex: 1 !important;
          }
          .submit-btn {
            width: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
