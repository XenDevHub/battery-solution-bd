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
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <main className="admin-main" style={{ marginLeft: "256px", flex: 1, backgroundColor: "var(--surface)" }}>
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div style={{ padding: "var(--container-padding)", maxWidth: "1280px", margin: "0 auto" }}>
          {children}
        </div>
      </main>

      <style jsx>{`
        .sidebar-wrapper {
          transition: transform 0.3s ease;
        }
        @media (max-width: 1024px) {
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
