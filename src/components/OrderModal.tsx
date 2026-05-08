"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

const OrderModal = ({ isOpen, onClose, battery }: any) => {
  const [formData, setFormData] = useState({
    userName: "",
    mobileNo: "",
    bkashTxid: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            battery_id: battery.id,
            user_name: formData.userName,
            mobile_no: formData.mobileNo,
            bkash_txid: formData.bkashTxid,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      // WhatsApp Integration
      const message = `*New Order Received*%0A%0A*Product:* ${battery.title}%0A*Customer:* ${formData.userName}%0A*Mobile:* ${formData.mobileNo}%0A*bKash TxID:* ${formData.bkashTxid}`;
      const whatsappUrl = `https://wa.me/8801601372827?text=${message}`;
      
      window.open(whatsappUrl, '_blank');

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        maxWidth: "500px",
        width: "100%",
        position: "relative",
        border: "1px solid var(--outline-variant)"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px"
        }}>&times;</button>

        {success ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "#22c55e" }}>check_circle</span>
            <h2 className="headline-md">Order Placed!</h2>
            <p className="body-md">Your order for {battery.title} has been received. We will contact you soon.</p>
          </div>
        ) : (
          <>
            <h2 className="headline-md" style={{ marginBottom: "1.5rem" }}>Order {battery.title}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label className="label-caps">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  style={{ width: "100%", padding: "1rem", border: "1px solid var(--outline-variant)", marginTop: "0.5rem" }}
                />
              </div>
              <div>
                <label className="label-caps">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.mobileNo}
                  onChange={(e) => setFormData({...formData, mobileNo: e.target.value})}
                  style={{ width: "100%", padding: "1rem", border: "1px solid var(--outline-variant)", marginTop: "0.5rem" }}
                />
              </div>
              <div>
                <label className="label-caps">bKash Transaction ID</label>
                <input 
                  required
                  type="text" 
                  value={formData.bkashTxid}
                  onChange={(e) => setFormData({...formData, bkashTxid: e.target.value})}
                  style={{ width: "100%", padding: "1rem", border: "1px solid var(--outline-variant)", marginTop: "0.5rem" }}
                />
              </div>
              <button 
                disabled={loading}
                type="submit" 
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "#fff",
                  padding: "1rem",
                  border: "none",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
