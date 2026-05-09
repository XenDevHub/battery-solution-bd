"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import OrderModal from "./OrderModal";
import Link from "next/link";

const ProductCard = ({ battery, onOrder }: any) => (
  <div className="product-card" style={{
    border: "1px solid var(--outline-variant)",
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    transition: "all 0.3s",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
  }}>
    <div style={{
      aspectRatio: "1/1",
      backgroundColor: "var(--surface-container-lowest)",
      padding: "var(--base)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid var(--outline-variant)"
    }}>
      <img 
        src={battery.image_url || "https://via.placeholder.com/300x300?text=No+Image"} 
        alt={battery.title} 
        style={{ width: "90%", height: "90%", objectFit: "contain", transition: "transform 0.5s" }} 
        className="card-img" 
      />
      <div style={{
        position: "absolute",
        top: "0.5rem",
        left: "0.5rem",
        backgroundColor: battery.stock_quantity > 0 ? "var(--primary)" : "var(--error)",
        color: "var(--on-primary)",
        padding: "4px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: "10px",
        fontFamily: "var(--font-inter)",
        fontWeight: "bold"
      }}>
        {battery.stock_quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
      </div>
    </div>
    <div className="card-content" style={{ padding: "1rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <h3 className="card-title" style={{ 
        marginBottom: "auto", 
        fontSize: "16px", 
        fontWeight: "600",
        fontFamily: "var(--font-space-grotesk)" 
      }}>{battery.title}</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        padding: "0.75rem 0",
        marginTop: "0.75rem",
        borderTop: "1px dashed var(--outline-variant)",
        borderBottom: "1px dashed var(--outline-variant)",
      }}>
        <div>
          <span className="label-caps" style={{ color: "var(--outline)", display: "block", fontSize: "10px" }}>CAPACITY</span>
          <span className="data-display" style={{ color: "var(--primary)", fontSize: "14px" }}>{battery.capacity}</span>
        </div>
        <div>
          <span className="label-caps" style={{ color: "var(--outline)", display: "block", fontSize: "10px" }}>PRICE</span>
          <span className="data-display" style={{ color: "var(--secondary)", fontSize: "14px" }}>৳ {battery.price}</span>
        </div>
      </div>
      <button 
        onClick={() => onOrder(battery)}
        disabled={battery.stock_quantity <= 0}
        style={{
          width: "100%",
          marginTop: "1rem",
          backgroundColor: battery.stock_quantity > 0 ? "var(--surface-container-high)" : "var(--outline-variant)",
          color: "var(--primary)",
          padding: "0.5rem",
          borderRadius: "var(--radius-md)",
          border: "none",
          cursor: battery.stock_quantity > 0 ? "pointer" : "not-allowed",
          transition: "all 0.3s",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "12px",
          letterSpacing: "0.05em"
        }} className="view-btn">
        {battery.stock_quantity > 0 ? "Order Now" : "Unavailable"}
      </button>
    </div>
    <style jsx>{`
      .product-card:hover {
        border-color: var(--secondary) !important;
        box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
        transform: translateY(-4px);
      }
      .product-card:hover .card-img {
        transform: scale(1.05);
      }
      .product-card:hover .view-btn {
        background-color: var(--secondary) !important;
        color: var(--on-secondary) !important;
      }
      @media (max-width: 480px) {
        .card-content {
          padding: 0.75rem !important;
        }
        .card-title {
          fontSize: 14px !important;
        }
        .data-display {
          fontSize: 12px !important;
        }
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
    <section className="section" id="products-section" style={{ backgroundColor: 'var(--surface-container-lowest)' }}>
      <div className="container">
        <div className="product-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <h2 className="headline-lg" style={{ color: "var(--primary)" }}>Our Products</h2>
            <div style={{ height: "4px", width: "80px", backgroundColor: "var(--secondary)", marginTop: "0.5rem" }}></div>
          </div>
          <Link href="/products" className="label-caps showing-models view-all-link" style={{ 
            color: "var(--secondary)", 
            display: "flex", 
            alignItems: "center", 
            gap: "0.25rem",
            textDecoration: "none",
            fontWeight: "bold",
            padding: "8px 16px",
            border: "1px solid var(--secondary)",
            borderRadius: "var(--radius-full)",
            transition: "all 0.3s"
          }}>
            View All <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>
        
        <style jsx>{`
          .view-all-link:hover {
            background-color: var(--secondary) !important;
            color: white !important;
          }
          .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
          }
          @media (max-width: 480px) {
            .grid-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.75rem;
            }
            .product-header {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
            }
            .showing-models {
              display: flex !important;
              padding: 4px 8px !important;
              font-size: 10px !important;
            }
          }
          @media (min-width: 481px) {
            .md-hidden-btn {
              display: none !important;
            }
          }
        `}</style>
        
        <div className="grid-container">
          {batteries.slice(0, 6).map((b) => (
            <ProductCard key={b.id} battery={b} onOrder={handleOrder} />
          ))}
          {batteries.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem" }}>
              <p className="body-lg">Loading inventory...</p>
            </div>
          )}
        </div>

        {batteries.length > 6 && (
          <div style={{ textAlign: "center", marginTop: "3rem", display: "flex", justifyContent: "center" }} className="md-hidden-btn">
            <Link href="/products" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--primary)",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "var(--radius-full)",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(0,30,64,0.2)"
            }}>
              Explore All Products
            </Link>

          </div>
        )}
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

