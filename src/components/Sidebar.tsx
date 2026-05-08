"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navItems = [
    { icon: "home", label: "Back to Website", href: "/" },
    { icon: "dashboard", label: "Dashboard", href: "/admin" },
    { icon: "battery_charging_full", label: "Inventory", href: "/admin/inventory" },
    { icon: "shopping_cart", label: "Orders", href: "/admin/orders" },
    { icon: "video_library", label: "Video Portal", href: "/admin/videos" },
  ];

  return (
    <aside style={{
      width: "256px",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      backgroundColor: "var(--surface-container-highest)",
      borderRight: "1px solid var(--outline-variant)",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      zIndex: 100
    }}>
      <div style={{ marginBottom: "2rem", padding: "0 0.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="headline-md" style={{ color: "var(--primary)" }}>Admin Panel</h1>
          <p className="label-caps" style={{ color: "var(--on-surface-variant)", opacity: 0.7 }}>Battery Solution Bd</p>
        </div>
        <button onClick={onClose} className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }} id="sidebar-close">
           <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              backgroundColor: isActive ? "var(--secondary)" : "transparent",
              color: isActive ? "var(--on-secondary)" : "var(--on-surface-variant)",
              borderRadius: "var(--radius-lg)",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              transition: "all 0.2s"
            }}>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="body-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <style jsx>{`
        #sidebar-close {
          display: none;
        }
        @media (max-width: 1024px) {
          #sidebar-close {
            display: block;
          }
        }
      `}</style>

      <div style={{ marginTop: "auto", borderTop: "1px solid var(--outline-variant)", paddingTop: "1rem" }}>
        <div className="flex items-center" style={{ gap: "0.75rem", marginBottom: "1.5rem", padding: "0 0.5rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "var(--primary-container)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--on-primary)"
          }}>
            <span className="material-symbols-outlined">person</span>
          </div>
          <div>
            <p className="label-caps" style={{ color: "var(--on-surface)" }}>Admin Profile</p>
            <p style={{ fontSize: "10px", color: "var(--on-surface-variant)" }}>System Administrator</p>
          </div>
        </div>
        
        <button onClick={handleLogout} className="flex items-center" style={{
          width: "100%",
          gap: "0.75rem",
          padding: "0.75rem 1rem",
          marginTop: "0.5rem",
          color: "var(--on-surface-variant)",
          background: "none",
          border: "none",
          cursor: "pointer"
        }}>
          <span className="material-symbols-outlined">logout</span>
          <span className="body-md">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
