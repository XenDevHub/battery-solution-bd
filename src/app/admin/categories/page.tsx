"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    // First, try to insert. If table doesn't exist, we might get an error.
    const { error } = await supabase.from("categories").insert([{ name: newCategoryName }]);
    if (error) {
      alert("Error creating category. Make sure 'categories' table exists in Supabase. " + error.message);
    } else {
      setNewCategoryName("");
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchCategories();
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleUpdate = async () => {
    if (!editingId || !editName.trim()) return;
    const { error } = await supabase.from("categories").update({ name: editName }).eq("id", editingId);
    if (error) {
      alert("Error updating: " + error.message);
    } else {
      setEditingId(null);
      setEditName("");
      fetchCategories();
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="headline-md" style={{ marginBottom: "2rem" }}>Manage Categories</h1>

      <div style={{ backgroundColor: "var(--surface-container)", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h2 className="headline-sm" style={{ marginBottom: "1rem" }}>Add New Category</h2>
        <form onSubmit={handleCreate} style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            style={{ flex: 1, padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--outline)" }}
            required
          />
          <button type="submit" style={{ padding: "0.75rem 1.5rem", backgroundColor: "var(--primary)", color: "var(--on-primary)", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Add
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: "var(--surface-container)", padding: "1.5rem", borderRadius: "8px" }}>
        <h2 className="headline-sm" style={{ marginBottom: "1rem" }}>Existing Categories</h2>
        {loading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {categories.map(cat => (
              <li key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--outline-variant)" }}>
                {editingId === cat.id ? (
                  <div style={{ display: "flex", gap: "1rem", flex: 1 }}>
                    <input 
                      type="text" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--outline)" }}
                    />
                    <button onClick={handleUpdate} style={{ padding: "0.5rem 1rem", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ padding: "0.5rem 1rem", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <span className="body-lg">{cat.name}</span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => handleEdit(cat)} style={{ padding: "0.5rem", backgroundColor: "transparent", border: "1px solid var(--primary)", color: "var(--primary)", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>edit</span>
                      </button>
                      <button onClick={() => handleDelete(cat.id)} style={{ padding: "0.5rem", backgroundColor: "transparent", border: "1px solid red", color: "red", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
