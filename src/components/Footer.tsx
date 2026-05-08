"use client";

import React from "react";


const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "var(--primary)",
      color: "var(--on-primary)",
      padding: "var(--section-gap) 0",
      borderTop: "1px solid var(--on-primary-container)"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--grid-gutter)"
        }}>
          <div style={{ gridColumn: "span 1" }}>
            <div className="headline-md" style={{ color: "#ffdbce", marginBottom: "1.5rem" }}>Battery Solution Bd</div>
            <p className="body-md" style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
              Pioneering energy stability for Bangladesh through advanced lithium chemistry and industrial-grade storage solutions.
            </p>
          </div>
          
          <div>
            <h4 className="label-caps" style={{ marginBottom: "1.5rem" }}>SOLUTIONS</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", opacity: 0.8 }} className="footer-links">
              <li>Off-Grid Solar</li>
              <li>Telecom Backup</li>
              <li>Industrial UPS</li>
              <li>Custom BMS</li>
            </ul>
          </div>
          
          <div>
            <h4 className="label-caps" style={{ marginBottom: "1.5rem" }}>RESOURCES</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", opacity: 0.8 }} className="footer-links">
              <li>Support: +8801601372827</li>
              <li>Email: shakzunaidjake@gmail.com</li>
              <li>Location: Dhaka, Bangladesh</li>
              <li>Technical Docs</li>
            </ul>
          </div>
          
          <div>
            <h4 className="label-caps" style={{ marginBottom: "1.5rem" }}>FOLLOW US</h4>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              {["language", "video_library", "share"].map((icon, i) => (
                <div key={i} className="social-icon" style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
              ))}
            </div>
            <p className="label-caps" style={{ fontSize: "10px", opacity: 0.6 }}>
              © 2024 Battery Solution Bd. Engineering Reliable Power.
            </p>
            <p className="label-caps" style={{ fontSize: "10px", opacity: 0.6, marginTop: "0.5rem" }}>
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-links li:hover {
          color: #ffdbce;
          cursor: pointer;
        }
        .social-icon:hover {
          background-color: #ffdbce;
          color: var(--primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
