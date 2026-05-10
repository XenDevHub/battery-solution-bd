"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
}

const CategoryBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data) {
          setCategories(data);
        } else {
          console.error("Error fetching categories:", error);
          // Fallback static categories if table doesn't exist
          setCategories([
            { id: "1", name: "Solar Battery" },
            { id: "2", name: "IPS Battery" },
            { id: "3", name: "Vehicle Battery" },
            { id: "4", name: "Industrial Battery" },
          ]);
        }
      } catch (e) {
        console.error("Fetch categories failed:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div style={{ height: "40px", marginTop: "80px" }}></div>;

  return (
    <div style={{
      marginTop: "80px", // Reverted for 80px navbar
      backgroundColor: "var(--surface-container)",
      borderBottom: "1px solid var(--outline-variant)",
      padding: "0.5rem 0",
      overflowX: "auto",
      whiteSpace: "nowrap"
    }}>
      <div className="container" style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}>

        {categories.map((cat) => (
          <Link key={cat.id} href={`/products?category=${encodeURIComponent(cat.name)}`} style={{
            color: "var(--primary)",
            textDecoration: "none",
            fontSize: "0.95rem",
            fontWeight: "500",
            transition: "color 0.2s"
          }}>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
