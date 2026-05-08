"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}>
        <a href="/" className="headline-md" style={{ color: "var(--on-primary)", fontWeight: "bold", textDecoration: "none" }}>
          Battery Solution Bd
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center" id="desktop-menu" style={{ display: "flex", gap: "5rem" }}>
          <a href="#products-section" className="label-caps" style={{ color: "var(--on-primary)", transition: "color 0.2s" }}>Products</a>
          <a href="#videos-section" className="label-caps" style={{ color: "var(--on-primary)", transition: "color 0.2s" }}>Videos</a>
          <a href="/admin/" className="label-caps" style={{ color: "var(--on-primary)", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: "4px" }}>Admin</a>
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
        gap: "2rem",
        transition: "all 0.3s ease-in-out"
      }}>
        <a href="#products-section" onClick={() => setIsMenuOpen(false)} className="headline-md" style={{ color: "var(--on-primary)" }}>Products</a>
        <a href="#videos-section" onClick={() => setIsMenuOpen(false)} className="headline-md" style={{ color: "var(--on-primary)" }}>Videos</a>
        <a href="/admin/" onClick={() => setIsMenuOpen(false)} className="headline-md" style={{ color: "var(--secondary)", fontWeight: "bold" }}>Admin Portal</a>
      </div>

      <style jsx>{`
        #desktop-menu {
          display: flex !important;
        }
        #desktop-menu a:hover {
          color: var(--secondary) !important;
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
