"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import OrderModal from "./OrderModal";

const ProductCard = ({ battery, onOrder }: any) => (
  <div className="product-card" style={{
    border: "1px solid var(--outline-variant)",
    backgroundColor: "var(--surface)",
    overflow: "hidden",
    transition: "all 0.3s",
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      aspectRatio: "1/1",
      backgroundColor: "var(--surface-container-low)",
      padding: "var(--base)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img 
        src={battery.image_url || "https://via.placeholder.com/300x300?text=No+Image"} 
        alt={battery.title} 
        style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.5s" }} 
        className="card-img" 
      />
      <div style={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        backgroundColor: battery.stock_quantity > 0 ? "var(--primary)" : "var(--error)",
        color: "var(--on-primary)",
        padding: "4px 8px",
        fontSize: "10px",
        fontFamily: "var(--font-inter)",
        fontWeight: "bold"
      }}>
        {battery.stock_quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
      </div>
    </div>
    <div style={{ padding: "var(--card-padding)" }}>
      <h3 className="headline-md" style={{ marginBottom: "1rem" }}>{battery.title}</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        borderTop: "1px solid var(--outline-variant)",
        borderBottom: "1px solid var(--outline-variant)",
        padding: "1rem 0",
        marginBottom: "1.5rem"
      }}>
        <div>
          <span className="label-caps" style={{ color: "var(--outline)", display: "block" }}>CAPACITY</span>
          <span className="data-display" style={{ color: "var(--primary)" }}>{battery.capacity}</span>
        </div>
        <div>
          <span className="label-caps" style={{ color: "var(--outline)", display: "block" }}>PRICE</span>
          <span className="data-display" style={{ color: "var(--primary)" }}>৳ {battery.price}</span>
        </div>
      </div>
      <button 
        onClick={() => onOrder(battery)}
        disabled={battery.stock_quantity <= 0}
        style={{
          width: "100%",
          backgroundColor: battery.stock_quantity > 0 ? "var(--surface-container-high)" : "var(--outline-variant)",
          color: "var(--primary)",
          padding: "0.75rem",
          border: "none",
          cursor: battery.stock_quantity > 0 ? "pointer" : "not-allowed",
          transition: "all 0.3s",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "12px",
          letterSpacing: "0.1em"
        }} className="view-btn">
        {battery.stock_quantity > 0 ? "Order Now" : "Unavailable"}
      </button>
    </div>
    <style jsx>{`
      .product-card:hover {
        border-color: var(--secondary) !important;
      }
      .product-card:hover .card-img {
        transform: scale(1.05);
      }
      .product-card:hover .view-btn {
        background-color: var(--secondary) !important;
        color: var(--on-secondary) !important;
      }
    `}</style>
  </div>
);

const ProductGrid = () => {
  const [batteries, setBatteries] = useState<any[]>([]);
  const [selectedBattery, setSelectedBattery] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBatteries = async () => {
      const { data } = await supabase.from('batteries').select('*').order('created_at', { ascending: false });
      if (data) setBatteries(data);
    };
    fetchBatteries();
  }, []);

  const handleOrder = (battery: any) => {
    setSelectedBattery(battery);
    setIsModalOpen(true);
  };

  return (
    <section className="section" id="products-section">
      <div className="container">
        <div className="product-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <h2 className="headline-lg" style={{ color: "var(--primary)" }}>LiFePO4 Power Series</h2>
            <div style={{ height: "4px", width: "80px", backgroundColor: "var(--secondary)", marginTop: "0.5rem" }}></div>
          </div>
          <p className="label-caps showing-models" style={{ color: "var(--outline)" }}>
            Showing {batteries.length} available models
          </p>
        </div>
        
        <style jsx>{`
          @media (max-width: 768px) {
            .product-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1rem;
            }
            .showing-models {
              display: none;
            }
          }
        `}</style>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--grid-gutter)"
        }}>
          {batteries.map((b) => (
            <ProductCard key={b.id} battery={b} onOrder={handleOrder} />
          ))}
          {batteries.length === 0 && (
            <div style={{ gridColumn: "span 3", textAlign: "center", padding: "4rem" }}>
              <p className="body-lg">Loading inventory...</p>
            </div>
          )}
        </div>
      </div>

      {selectedBattery && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          battery={selectedBattery} 
        />
      )}
    </section>
  );
};

export default ProductGrid;
