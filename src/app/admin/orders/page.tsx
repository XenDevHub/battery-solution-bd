"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, batteries(title, price, sku)')
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
  };

  const filteredOrders = orders.filter(o => {
    const query = searchQuery.toLowerCase();
    return (
      (o.order_id && o.order_id.toLowerCase().includes(query)) ||
      (o.batteries?.sku && o.batteries.sku.toLowerCase().includes(query)) ||
      (o.user_name && o.user_name.toLowerCase().includes(query)) ||
      (o.mobile_no && o.mobile_no.includes(query))
    );
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className="headline-lg">Customer Orders</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
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
              placeholder="Search by ID, Name or SKU..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                padding: "10px 10px 10px 40px", 
                border: "1px solid var(--outline-variant)",
                borderRadius: "var(--radius-md)",
                width: "300px",
                fontSize: "14px"
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", border: "1px solid var(--outline-variant)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface-container-low)" }}>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Date & ID</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Product Info</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Customer</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>bKash TXID</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid var(--outline-variant)" }}>
                <td style={{ padding: "1.5rem", fontSize: "14px" }}>
                  <span style={{ fontWeight: "bold", color: "var(--primary)" }}>{o.order_id || 'N/A'}</span><br/>
                  {new Date(o.created_at).toLocaleDateString()}<br/>
                  <span style={{ fontSize: "10px", color: "var(--outline)" }}>{new Date(o.created_at).toLocaleTimeString()}</span>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <p className="body-md" style={{ fontWeight: "bold" }}>{o.batteries?.title}</p>
                  <p className="label-caps" style={{ fontSize: "10px", color: "var(--secondary)", fontWeight: "bold" }}>
                    SKU / ID: {o.batteries?.sku || 'N/A'}
                  </p>
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
        {filteredOrders.length === 0 && (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--outline)" }}>
            No orders found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

