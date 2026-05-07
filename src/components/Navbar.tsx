"use client";

import React from "react";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: "var(--surface)",
      borderBottom: "1px solid var(--outline-variant)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem var(--container-padding)"
      }}>
        <div className="headline-md" style={{ color: "var(--primary)", fontWeight: "bold" }}>
          Dhaka Battery Co.
        </div>
        
        <div className="flex" style={{ gap: "2rem", display: "none" }} id="desktop-menu">
          {/* Using display: none initially, will use media queries in CSS */}
          <a href="#" className="label-caps" style={{ color: "var(--secondary)", borderBottom: "2px solid var(--secondary)", paddingBottom: "4px" }}>Products</a>
          <a href="#" className="label-caps" style={{ color: "var(--on-surface-variant)" }}>Solar Solutions</a>
          <a href="#" className="label-caps" style={{ color: "var(--on-surface-variant)" }}>Tutorials</a>
          <a href="#" className="label-caps" style={{ color: "var(--on-surface-variant)" }}>About Us</a>
        </div>

        <div className="flex items-center" style={{ gap: "1rem" }}>
          <div style={{ position: "relative", display: "none" }} id="search-box">
            <span className="material-symbols-outlined" style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--outline)",
              fontSize: "20px"
            }}>search</span>
            <input 
              type="text" 
              placeholder="Search components..." 
              style={{
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "8px",
                paddingBottom: "8px",
                backgroundColor: "var(--surface-container)",
                border: "1px solid var(--outline-variant)",
                outline: "none",
                width: "250px",
                fontFamily: "inherit"
              }}
            />
          </div>
          <button className="label-caps" style={{
            backgroundColor: "var(--secondary)",
            color: "var(--on-secondary)",
            padding: "0.5rem 1.5rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s"
          }}>
            Enquire Now
          </button>
        </div>
      </div>

      <style jsx>{`
        #desktop-menu {
          display: flex !important;
        }
        #search-box {
          display: block !important;
        }
        @media (max-width: 768px) {
          #desktop-menu {
            display: none !important;
          }
          #search-box {
            display: none !important;
          }
        }
        button:hover {
          background-color: var(--secondary-container) !important;
          transform: scale(1.02);
        }
        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
