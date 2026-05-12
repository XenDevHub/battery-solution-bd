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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexDirection: "column", gap: "1rem" }} className="header-stack">
        <h1 className="headline-lg">Customer Orders</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", width: "100%" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
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
                width: "100%",
                fontSize: "14px"
              }}
            />
          </div>
        </div>
      </div>

      <div className="table-container" style={{ 
        backgroundColor: "#fff", 
        border: "1px solid var(--outline-variant)", 
        overflowX: "auto",
        width: "100%",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }} className="responsive-table">
          <thead>
            <tr style={{ backgroundColor: "var(--surface-container-low)" }}>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Date & ID</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Product Information</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Customer Details</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Transaction (bKash)</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Action Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid var(--outline-variant)", transition: "background-color 0.2s" }} className="table-row">
                <td style={{ padding: "1.5rem", fontSize: "14px" }}>
                  <span style={{ fontWeight: "bold", color: "var(--primary)", fontSize: "15px" }}>{o.order_id || 'N/A'}</span><br/>
                  <span style={{ display: "inline-block", marginTop: "4px" }}>{new Date(o.created_at).toLocaleDateString()}</span><br/>
                  <span style={{ fontSize: "11px", color: "var(--outline)" }}>{new Date(o.created_at).toLocaleTimeString()}</span>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <p className="body-md" style={{ fontWeight: "700", color: "var(--primary)" }}>{o.batteries?.title}</p>
                  <p className="label-caps" style={{ fontSize: "10px", color: "var(--secondary)", fontWeight: "800", marginTop: "4px" }}>
                    SKU: {o.batteries?.sku || 'N/A'}
                  </p>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <p className="body-md" style={{ fontWeight: "600" }}>{o.user_name}</p>
                  <p style={{ fontSize: "13px", color: "var(--primary)", marginTop: "2px" }}>{o.mobile_no}</p>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <div style={{ 
                    backgroundColor: "var(--surface-container)", 
                    padding: "6px 12px", 
                    borderRadius: "4px", 
                    display: "inline-block",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    color: "var(--secondary)"
                  }}>
                    {o.bkash_txid}
                  </div>
                </td>
                <td style={{ padding: "1.5rem" }}>
                  <select 
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid var(--outline-variant)",
                      backgroundColor: o.status === 'delivered' ? "#22c55e11" : o.status === 'confirmed' ? "#3b82f611" : "#f59e0b11",
                      color: o.status === 'delivered' ? "#22c55e" : o.status === 'confirmed' ? "#3b82f6" : "#f59e0b",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="confirmed">✅ Confirmed</option>
                    <option value="delivered">🚚 Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--outline)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", opacity: 0.3, marginBottom: "1rem" }}>search_off</span>
            <p className="body-lg">No orders found matching your search.</p>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (min-width: 769px) {
          .header-stack {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
        .table-container::-webkit-scrollbar {
          height: 8px;
        }
        .table-container::-webkit-scrollbar-track {
          background: var(--surface-container);
        }
        .table-container::-webkit-scrollbar-thumb {
          background: var(--outline-variant);
          border-radius: 4px;
        }
        .table-container::-webkit-scrollbar-thumb:hover {
          background: var(--outline);
        }
        .table-row:hover {
          background-color: var(--surface-container-low);
        }
        @media (max-width: 1024px) {
          .responsive-table {
            min-width: 1000px !important;
          }
        }
      `}</style>
    </div>
  );
}

