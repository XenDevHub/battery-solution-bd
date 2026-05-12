import React from "react";

const DashboardHeader = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  return (
    <header style={{
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 var(--container-padding)",
      borderBottom: "1px solid var(--outline-variant)",
      backgroundColor: "rgba(249, 249, 249, 0.8)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <div className="flex items-center" style={{ gap: "1rem" }}>
        <button 
          onClick={onMenuClick}
          className="material-symbols-outlined menu-toggle" 
          style={{
            padding: "8px",
            color: "var(--primary)",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            display: "none"
          }}>menu</button>
        <h2 className="headline-md" style={{ color: "var(--primary)" }}>System Command Center</h2>
      </div>
      <div className="flex items-center" style={{ gap: "1rem" }}>
        <div className="flex items-center grid-status" style={{
          gap: "0.5rem",
          padding: "4px 12px",
          backgroundColor: "var(--surface-container)",
          borderRadius: "999px"
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)"
          }}></div>
          <span className="label-caps" style={{ color: "var(--on-surface-variant)" }}>Grid System: Optimal</span>
        </div>
        <button className="material-symbols-outlined" style={{
          padding: "8px",
          color: "var(--on-surface-variant)",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer"
        }}>notifications</button>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .menu-toggle {
            display: block !important;
          }
          .grid-status {
            display: flex !important;
            padding: 2px 8px !important;
          }
          .grid-status span {
            font-size: 10px !important;
          }
          h2 {
            font-size: 14px !important;
          }
        }
      `}</style>
    </header>
  );
};

export default DashboardHeader;
