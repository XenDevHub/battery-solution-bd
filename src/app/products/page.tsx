"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import OrderModal from "@/components/OrderModal";

export default function ProductsPage() {
  const [batteries, setBatteries] = useState<any[]>([]);
  const [filteredBatteries, setFilteredBatteries] = useState<any[]>([]);
  const [selectedBattery, setSelectedBattery] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    const fetchBatteries = async () => {
      const { data } = await supabase.from('batteries').select('*').order('created_at', { ascending: false });
      if (data) {
        setBatteries(data);
        setFilteredBatteries(data);
      }
    };
    fetchBatteries();
  }, []);

  useEffect(() => {
    if (selectedBrand === "All") {
      setFilteredBatteries(batteries);
    } else {
      setFilteredBatteries(batteries.filter(b => b.title.toLowerCase().includes(selectedBrand.toLowerCase())));
    }
  }, [selectedBrand, batteries]);

  const handleOrder = (battery: any) => {
    setSelectedBattery(battery);
    setIsModalOpen(true);
  };

  const brands = ["All", "Rahimafrooz", "Hamko", "Volta", "Navana", "Pylontech", "Growatt", "Felicity", "Lucas", "Globatt", "LifePo4", "DJDC", "Sako"];

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      
      {/* Premium Hero Header */}
      <div style={{ 
        paddingTop: "140px", 
        paddingBottom: "60px",
        background: "linear-gradient(135deg, var(--primary) 0%, #001e40 100%)",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-10%",
          width: "40%",
          height: "200%",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          transform: "rotate(30deg)",
          pointerEvents: "none"
        }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="label-caps" style={{ color: "var(--secondary)", marginBottom: "1rem", display: "block", letterSpacing: "2px" }}>EXCLUSIVE INVENTORY</span>
          <h1 className="headline-lg" style={{ fontSize: "3.5rem", marginBottom: "1.5rem", fontWeight: "800" }}>Industrial Power Solutions</h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "700px", margin: "0 auto" }}>
            Explore our curated selection of high-performance batteries engineered for reliability in the most demanding environments.
          </p>
        </div>
      </div>

      <div style={{ flexGrow: 1, marginTop: "-40px" }}>
        <div className="container">
          {/* Enhanced Filter Bar */}
          <div style={{ 
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            marginBottom: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem"
          }}>
            <div className="label-caps" style={{ color: "var(--outline)", fontSize: "12px" }}>FILTER BY MANUFACTURER</div>
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "0.75rem", 
              flexWrap: "wrap"
            }}>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    backgroundColor: selectedBrand === brand ? "var(--primary)" : "var(--surface-container-low)",
                    color: selectedBrand === brand ? "white" : "var(--on-surface-variant)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontWeight: "600",
                    fontSize: "13px",
                    boxShadow: selectedBrand === brand ? "0 4px 12px rgba(0,30,64,0.2)" : "none",
                    letterSpacing: "0.5px"
                  }}
                  className="filter-btn"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Exclusive Product Grid */}
          <div className="grid-container" style={{ marginBottom: "5rem" }}>
            {filteredBatteries.map((battery, idx) => (
              <div key={battery.id} className="exclusive-card" style={{
                backgroundColor: "white",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(0,0,0,0.05)",
                position: "relative",
                animation: `fadeUp 0.5s ease forwards ${idx * 0.05}s`,
                opacity: 0,
                transform: "translateY(20px)"
              }}>
                {/* Premium Badge */}
                {battery.price > 50000 && (
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    zIndex: 2,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    backdropFilter: "blur(4px)",
                    color: "#FFD700",
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "10px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    border: "1px solid rgba(255,215,0,0.3)"
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>workspace_premium</span>
                    PREMIUM
                  </div>
                )}

                <div style={{
                  aspectRatio: "1/1",
                  backgroundColor: "#fcfcfc",
                  padding: "2rem",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  <div className="card-bg-glow"></div>
                  <img 
                    src={battery.image_url || "https://via.placeholder.com/300x300?text=No+Image"} 
                    alt={battery.title} 
                    style={{ width: "85%", height: "85%", objectFit: "contain", zIndex: 1, transition: "transform 0.6s ease" }} 
                    className="exclusive-img" 
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    backgroundColor: battery.stock_quantity > 0 ? "#2ecc71" : "#e74c3c",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "9px",
                    fontWeight: "900",
                    letterSpacing: "1px",
                    zIndex: 2
                  }}>
                    {battery.stock_quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
                  </div>
                </div>

                <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <span className="label-caps" style={{ color: "var(--secondary)", fontSize: "10px", marginBottom: "0.25rem", display: "block" }}>INDUSTRIAL SERIES</span>
                    <h3 style={{ 
                      fontSize: "1.125rem", 
                      fontWeight: "700",
                      color: "var(--primary)",
                      fontFamily: "var(--font-space-grotesk)",
                      lineHeight: "1.3"
                    }}>{battery.title}</h3>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    borderTop: "1px solid #f0f0f0",
                    borderBottom: "1px solid #f0f0f0"
                  }}>
                    <div>
                      <span style={{ display: "block", fontSize: "10px", color: "#95a5a6", fontWeight: "bold" }}>CAPACITY</span>
                      <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--primary)" }}>{battery.capacity}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ display: "block", fontSize: "10px", color: "#95a5a6", fontWeight: "bold" }}>PRICE</span>
                      <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--secondary)" }}>৳ {battery.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleOrder(battery)}
                    disabled={battery.stock_quantity <= 0}
                    style={{
                      width: "100%",
                      backgroundColor: battery.stock_quantity > 0 ? "var(--primary)" : "#bdc3c7",
                      color: "white",
                      padding: "1rem",
                      borderRadius: "var(--radius-lg)",
                      border: "none",
                      cursor: battery.stock_quantity > 0 ? "pointer" : "not-allowed",
                      transition: "all 0.3s ease",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      fontSize: "14px"
                    }} className="exclusive-btn">
                    {battery.stock_quantity > 0 ? (
                      <>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>shopping_cart</span>
                        SECURE ORDER
                      </>
                    ) : "OUT OF STOCK"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredBatteries.length === 0 && batteries.length > 0 && (
            <div style={{ textAlign: "center", padding: "6rem 2rem", backgroundColor: "white", borderRadius: "var(--radius-xl)", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "var(--outline-variant)", marginBottom: "1rem" }}>inventory_2</span>
              <h2 className="headline-md">No Matching Products</h2>
              <p className="body-lg" style={{ color: "var(--on-surface-variant)", marginTop: "0.5rem" }}>We couldn't find any batteries matching "{selectedBrand}". Try another filter.</p>
              <button onClick={() => setSelectedBrand("All")} style={{ marginTop: "2rem", color: "var(--secondary)", fontWeight: "bold", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />

      {selectedBattery && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          battery={selectedBattery} 
        />
      )}

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .exclusive-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,30,64,0.12);
          border-color: var(--secondary);
        }

        .exclusive-card:hover .exclusive-img {
          transform: scale(1.1);
        }

        .exclusive-card:hover .card-bg-glow {
          opacity: 1;
        }

        .card-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(167, 58, 0, 0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .exclusive-btn:hover:not(:disabled) {
          background-color: var(--secondary) !important;
          box-shadow: 0 8px 16px rgba(167, 58, 0, 0.3);
        }

        .filter-btn:hover:not(.active) {
          background-color: var(--surface-container-high);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .headline-lg {
            font-size: 2.5rem !important;
          }
          .grid-container {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
          .exclusive-card {
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </main>
  );
}
