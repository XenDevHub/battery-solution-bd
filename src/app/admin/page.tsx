"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function MainDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    inventoryCount: 0
  });
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      const { data: salesData } = await supabase.from('orders').select('batteries(price)').eq('status', 'delivered');
      const { count: batteryCount } = await supabase.from('batteries').select('*', { count: 'exact', head: true });

      const totalSales = salesData?.reduce((acc: number, curr: any) => acc + (curr.batteries?.price || 0), 0) || 0;

      setStats({
        totalOrders: orderCount || 0,
        totalSales: totalSales,
        inventoryCount: batteryCount || 0
      });

      // Dummy data for charts
      setOrderData([
        { name: 'Mon', orders: 12, sales: 4000 },
        { name: 'Tue', orders: 19, sales: 3000 },
        { name: 'Wed', orders: 3, sales: 2000 },
        { name: 'Thu', orders: 5, sales: 2780 },
        { name: 'Fri', orders: 2, sales: 1890 },
        { name: 'Sat', orders: 3, sales: 2390 },
        { name: 'Sun', orders: 10, sales: 3490 },
      ]);
    };
    fetchStats();
  }, []);

  const COLORS = ['#001e40', '#a73a00', '#1e1e1e'];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="headline-lg">System Overview</h1>
        <p className="label-caps" style={{ color: "var(--outline)" }}>Real-time data from Supabase</p>
      </div>

      {/* Stats Cards */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {[
          { label: "Total Orders", value: stats.totalOrders, icon: "shopping_cart", color: "var(--primary)" },
          { label: "Revenue (BDT)", value: `৳ ${stats.totalSales.toLocaleString()}`, icon: "payments", color: "var(--secondary)" },
          { label: "Active Models", value: stats.inventoryCount, icon: "inventory_2", color: "var(--tertiary)" }
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            border: "1px solid var(--outline-variant)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <span className="label-caps" style={{ color: "var(--outline)" }}>{stat.label}</span>
              <h3 className="data-display" style={{ fontSize: "28px", marginTop: "0.5rem", color: "var(--primary)" }}>{stat.value}</h3>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: "40px", color: stat.color, opacity: 0.2 }}>{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* Inventory Distribution */}
      <div style={{ backgroundColor: "#fff", padding: "1.5rem", border: "1px solid var(--outline-variant)" }}>
        <h3 className="headline-md" style={{ marginBottom: "1.5rem" }}>Inventory & Health</h3>
        <div className="admin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
          <div style={{ height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: 'In Stock', value: 80 },
                    { name: 'Low Stock', value: 15 },
                    { name: 'Out of Stock', value: 5 }
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
            <div className="flex justify-between items-center">
              <span className="body-md">System Stability</span>
              <span className="label-caps" style={{ color: "#22c55e" }}>99.9% Uptime</span>
            </div>
            <div style={{ width: "100%", height: "8px", backgroundColor: "var(--surface-container)", borderRadius: "4px" }}>
              <div style={{ width: "99%", height: "100%", backgroundColor: "#22c55e", borderRadius: "4px" }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="body-md">Inventory Accuracy</span>
              <span className="label-caps" style={{ color: "var(--secondary)" }}>94.2% Synced</span>
            </div>
            <div style={{ width: "100%", height: "8px", backgroundColor: "var(--surface-container)", borderRadius: "4px" }}>
              <div style={{ width: "94%", height: "100%", backgroundColor: "var(--secondary)", borderRadius: "4px" }}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
