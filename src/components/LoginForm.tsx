"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      onLoginSuccess();
    }
    setLoading(false);
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--surface-container-low)"
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        padding: "3rem",
        backgroundColor: "#fff",
        border: "1px solid var(--outline-variant)",
        textAlign: "center"
      }}>
        <h1 className="headline-md" style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Battery Solution Bd</h1>
        <p className="label-caps" style={{ color: "var(--outline)", marginBottom: "2rem" }}>Admin Access</p>
        
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ textAlign: "left" }}>
            <label className="label-caps">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "1rem", border: "1px solid var(--outline-variant)", marginTop: "0.5rem" }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label className="label-caps">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "1rem", border: "1px solid var(--outline-variant)", marginTop: "0.5rem" }}
            />
          </div>
          <button 
            disabled={loading}
            type="submit" 
            style={{
              backgroundColor: "var(--primary)",
              color: "#fff",
              padding: "1rem",
              border: "none",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
        <a href="/" style={{ display: "block", marginTop: "2rem", color: "var(--outline)", textDecoration: "none", fontSize: "12px" }}>Back to Landing Page</a>
      </div>
    </div>
  );
};

export default LoginForm;
