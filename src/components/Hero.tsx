"use client";

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="technical-grid" style={{
      position: "relative",
      overflow: "hidden",
      backgroundColor: "transparent",
      padding: "8rem 0",
      borderBottom: "1px solid var(--outline-variant)",
      isolation: "isolate"
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.7
        }}
      >
        <source src="/battery.mp4" type="video/mp4" />
      </video>

      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "var(--grid-gutter)",
        alignItems: "center",
        position: "relative",
        zIndex: 10
      }}>
        <div>
          <span className="label-caps" style={{
            backgroundColor: "var(--secondary)",
            color: "#fff",
            padding: "4px 12px",
            marginBottom: "1.5rem",
            display: "inline-block",
            borderRadius: "var(--radius-sm)"
          }}>
            Industrial Grade LiFePO4
          </span>
          <h1 className="headline-xl" style={{ color: "#08086eff", marginBottom: "1.5rem" }}>
            Reliable Energy for <span style={{ color: "var(--secondary)" }}>Bangladesh</span>
          </h1>
          <p className="body-lg" style={{ color: "rgba(24, 10, 104, 0.8)", marginBottom: "2rem", maxWidth: "500px" }}>
            Engineered for the high-demand infrastructure of Bangladesh. Our deep-cycle lithium batteries provide stable, high-efficiency power for solar off-grids, industrial backups, and telecommunications.
          </p>
          <div className="flex" style={{ gap: "1rem", flexWrap: "wrap" }}>
            <button className="headline-md" style={{
              backgroundColor: "var(--secondary)",
              color: "#fff",
              padding: "1rem 2rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              transition: "background 0.3s"
            }}>
              Explore Inventory
              <span className="material-symbols-outlined">bolt</span>
            </button>
            <button className="headline-md" style={{
              backgroundColor: "transparent",
              color: "#fff",
              padding: "1rem 2rem",
              border: "2px solid #fff",
              cursor: "pointer",
              transition: "all 0.3s",
              backdropFilter: "blur(4px)"
            }}>
              Technical Catalog
            </button>
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            transform: "rotate(-3deg) scale(1.05)",
            zIndex: 0,
            backdropFilter: "blur(10px)",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "rgba(255,255,255,0.05)"
          }}></div>
          <div style={{ position: "relative", zIndex: 10, mixBlendMode: "screen" }}>
            <Image
              src="/images/battery-lineup-black.png"
              alt="Premium LiFePO4 Battery Lineup"
              width={800}
              height={600}
              unoptimized
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "contrast(1.2) brightness(1.2)",
              }}
              priority
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        button:first-child:hover {
          background-color: var(--primary-container) !important;
        }
        button:last-child:hover {
          background-color: var(--primary) !important;
          color: var(--on-primary) !important;
        }
        @media (max-width: 768px) {
          header {
            padding: 4rem 0 !important;
          }
          .flex {
            justify-content: center;
          }
          h1 {
            text-align: center;
          }
          p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          span.label-caps {
            display: block !important;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </header>
  );
};

export default Hero;
