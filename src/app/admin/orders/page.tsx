"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*, batteries(title, price, sku)').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
  };

  return (
    <div>
      <h1 className="headline-lg" style={{ marginBottom: "2rem" }}>Customer Orders</h1>
      <div style={{ backgroundColor: "#fff", border: "1px solid var(--outline-variant)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface-container-low)" }}>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Date</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Product Info</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Customer</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>bKash TXID</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid var(--outline-variant)" }}>
                <td style={{ padding: "1.5rem", fontSize: "14px" }}>
                  {new Date(o.created_at).toLocaleDateString()}<br/>
                  <span style={{ fontSize: "10px", color: "var(--outline)" }}>{new Date(o.created_at).toLocaleTimeString()}</span>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <p className="body-md" style={{ fontWeight: "bold" }}>{o.batteries?.title}</p>
                  <p className="label-caps" style={{ fontSize: "10px", color: "var(--outline)" }}>SKU: {o.batteries?.sku}</p>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <p className="body-md">{o.user_name}</p>
                  <p style={{ fontSize: "12px", color: "var(--primary)" }}>{o.mobile_no}</p>
                </td>
                <td style={{ padding: "1.5rem" }} className="data-display">
                  {o.bkash_txid}
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <select 
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    style={{
                      padding: "8px",
                      border: "1px solid var(--outline-variant)",
                      backgroundColor: o.status === 'delivered' ? "#22c55e11" : o.status === 'confirmed' ? "#3b82f611" : "#f59e0b11",
                      color: o.status === 'delivered' ? "#22c55e" : o.status === 'confirmed' ? "#3b82f6" : "#f59e0b",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "11px"
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
