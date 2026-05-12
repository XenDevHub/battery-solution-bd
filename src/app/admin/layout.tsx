"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import LoginForm from "@/components/LoginForm";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="headline-md">Authenticating Admin...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLoginSuccess={() => setAuthenticated(true)} />;
  }
  return (
    <div className="flex admin-layout" style={{ minHeight: "100vh" }}>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="sidebar-backdrop"
        />
      )}

      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <main className="admin-main" style={{ flex: 1, backgroundColor: "var(--surface)", minWidth: 0, overflowX: "hidden" }}>
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div style={{ padding: "2rem", width: "100%", maxWidth: "1600px", margin: "0" }}>
          {children}
        </div>
      </main>

      <style jsx>{`
        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: none;
        }
        .sidebar-wrapper {
          transition: transform 0.3s ease;
        }
        @media (max-width: 1024px) {
          .sidebar-backdrop {
            display: block;
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1001;
            transform: translateX(-100%);
          }
          .sidebar-wrapper.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
