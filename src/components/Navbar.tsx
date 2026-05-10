"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav style={{
      height: "80px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--primary)",
      color: "var(--on-primary)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "1rem"
      }}>
        {/* Animated Text Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined rotating" style={{ 
              fontSize: "32px", 
              color: "var(--secondary)"
            }}>
              settings
            </span>
          </div>
          <span style={{ 
            color: "#ffffff", 
            fontWeight: "900", 
            fontSize: "1.4rem", 
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
          }}>
            Battery Solution <span style={{ color: "var(--secondary)" }}>BD</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex" style={{ flex: 1, maxWidth: "400px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search batteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.5rem",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              outline: "none",
              fontSize: "0.95rem"
            }}
          />
          <span className="material-symbols-outlined" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)", fontSize: "20px" }}>search</span>
          <button type="submit" style={{ display: "none" }}>Search</button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center" id="desktop-menu" style={{ display: "flex", gap: "2rem", flexShrink: 0 }}>
          <Link href="#products-section" className="label-caps" style={{ color: "var(--on-primary)", transition: "color 0.2s" }}>Products</Link>
          <Link href="#videos-section" className="label-caps" style={{ color: "var(--on-primary)", transition: "color 0.2s" }}>Videos</Link>
          <Link href="/admin/" className="label-caps" style={{ color: "var(--on-primary)", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 16px", borderRadius: "20px", transition: "all 0.2s" }}>Admin</Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--on-primary)",
            cursor: "pointer",
            display: "none" // Managed by media query
          }}
          id="mobile-menu-toggle"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: "fixed",
        top: "80px",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "var(--primary)",
        zIndex: 999,
        display: isMenuOpen ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
        gap: "1.5rem",
        transition: "all 0.3s ease-in-out"
      }}>
        <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }} style={{ width: "90%", position: "relative", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search batteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 2.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              outline: "none",
              fontSize: "1rem"
            }}
          />
          <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)", fontSize: "20px" }}>search</span>
        </form>
        <Link href="#products-section" onClick={() => setIsMenuOpen(false)} className="headline-md" style={{ color: "var(--on-primary)" }}>Products</Link>
        <Link href="#videos-section" onClick={() => setIsMenuOpen(false)} className="headline-md" style={{ color: "var(--on-primary)" }}>Videos</Link>
        <Link href="/admin/" onClick={() => setIsMenuOpen(false)} className="headline-md" style={{ color: "var(--secondary)", fontWeight: "bold" }}>Admin Portal</Link>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotating {
          animation: spin 4s linear infinite;
        }
        #desktop-menu {
          display: flex !important;
        }
        #desktop-menu a:hover {
          color: var(--secondary) !important;
          border-color: var(--secondary) !important;
        }
        
        #mobile-menu-toggle {
          display: none !important;
        }

        @media (max-width: 768px) {
          #desktop-menu {
            display: none !important;
          }
          #mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

