"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function InventoryPage() {
  const [batteries, setBatteries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newBattery, setNewBattery] = useState({ title: "", sku: "", capacity: "", voltage: "12V DC", price: "", stock: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchBatteries();
  }, []);

  const fetchBatteries = async () => {
    const { data } = await supabase.from('batteries').select('*').order('created_at', { ascending: false });
    if (data) setBatteries(data);
  };

  const filteredBatteries = batteries.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = "";

    try {
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
        const { data, error: uploadError } = await supabase.storage
          .from('battery-image')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          console.error("Supabase Storage Error:", uploadError);
          throw new Error(`Upload Failed: ${uploadError.message}`);
        }
        
        if (data) {
          const { data: publicUrl } = supabase.storage.from('battery-image').getPublicUrl(fileName);
          imageUrl = publicUrl.publicUrl;
        }
      }

      const { error } = await supabase.from('batteries').insert([
        {
          title: newBattery.title,
          sku: newBattery.sku,
          capacity: newBattery.capacity,
          voltage: newBattery.voltage,
          price: parseFloat(newBattery.price),
          stock_quantity: newBattery.stock,
          image_url: imageUrl
        }
      ]);

      if (error) throw error;
      
      alert("Battery added successfully!");
      setIsModalOpen(false);
      setNewBattery({ title: "", sku: "", capacity: "", voltage: "12V DC", price: "", stock: 0 });
      setImageFile(null);
      fetchBatteries();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexDirection: "column", gap: "1rem" }} className="header-stack">
        <h1 className="headline-lg">Battery Inventory</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", width: "100%" }}>
          <div style={{ position: "relative", flex: 1 }}>
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
              placeholder="Search by name or SKU..." 
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
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "var(--secondary)",
              color: "#fff",
              padding: "0.75rem 1.25rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }} className="label-caps">
            <span className="material-symbols-outlined">add</span>
            Add
          </button>
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
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Product Image</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Product & SKU</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Specifications</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Price (BDT)</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Current Stock</th>
              <th className="label-caps" style={{ padding: "1.25rem 1.5rem", borderBottom: "2px solid var(--outline-variant)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatteries.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid var(--outline-variant)", transition: "background-color 0.2s" }} className="table-row">
                <td style={{ padding: "1rem 1.5rem" }}>
                  <div style={{ backgroundColor: "var(--surface-container)", borderRadius: "4px", padding: "4px", display: "inline-block" }}>
                    <img src={b.image_url || "https://via.placeholder.com/50"} alt="" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
                  </div>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <p className="body-md" style={{ fontWeight: "700", color: "var(--primary)" }}>{b.title}</p>
                  <p className="label-caps" style={{ fontSize: "10px", color: "var(--secondary)", fontWeight: "800", marginTop: "4px" }}>{b.sku}</p>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span style={{ backgroundColor: "var(--surface-container)", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" }}>{b.capacity}</span>
                    <span style={{ backgroundColor: "var(--surface-container)", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" }}>{b.voltage}</span>
                  </div>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <span style={{ fontWeight: "800", fontSize: "16px", color: "var(--primary)" }}>৳{b.price.toLocaleString()}</span>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    backgroundColor: b.stock_quantity > 5 ? "#22c55e11" : "#ef444411",
                    color: b.stock_quantity > 5 ? "#22c55e" : "#ef4444",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: b.stock_quantity > 5 ? "#22c55e" : "#ef4444" }}></span>
                    {b.stock_quantity} In Stock
                  </div>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button style={{ 
                      padding: "8px", 
                      borderRadius: "4px", 
                      border: "1px solid var(--primary)", 
                      color: "var(--primary)",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>edit</span>
                    </button>
                    <button style={{ 
                      padding: "8px", 
                      borderRadius: "4px", 
                      border: "1px solid #ef4444", 
                      color: "#ef4444",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBatteries.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--outline)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", opacity: 0.3, marginBottom: "1rem" }}>inventory_2</span>
            <p className="body-lg">No products found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add Battery Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ backgroundColor: "#fff", padding: "1.5rem", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
              <h2 className="headline-md">Register New Unit</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>&times;</button>
            </div>
            <form onSubmit={handleUpload} className="grid modal-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label className="label-caps">Battery Title</label>
                <input required value={newBattery.title} onChange={(e) => setNewBattery({...newBattery, title: e.target.value})} type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div className="col-span-mobile">
                <label className="label-caps">SKU ID</label>
                <input required value={newBattery.sku} onChange={(e) => setNewBattery({...newBattery, sku: e.target.value})} type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div className="col-span-mobile">
                <label className="label-caps">Price (BDT)</label>
                <input required value={newBattery.price} onChange={(e) => setNewBattery({...newBattery, price: e.target.value})} type="number" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div className="col-span-mobile">
                <label className="label-caps">Capacity (Ah)</label>
                <input required value={newBattery.capacity} onChange={(e) => setNewBattery({...newBattery, capacity: e.target.value})} type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div className="col-span-mobile">
                <label className="label-caps">Stock Quantity</label>
                <input required value={newBattery.stock} onChange={(e) => setNewBattery({...newBattery, stock: parseInt(e.target.value)})} type="number" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label className="label-caps">Product Image</label>
                <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} style={{ width: "100%", padding: "1rem", border: "2px dashed var(--outline-variant)" }} />
              </div>
              <div style={{ gridColumn: "span 2", display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit" disabled={loading} style={{
                  flex: 1,
                  padding: "1rem",
                  backgroundColor: "var(--secondary)",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer"
                }} className="label-caps">
                  {loading ? "Uploading..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        @media (min-width: 769px) {
          .header-stack {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
        @media (max-width: 600px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
          .col-span-mobile {
            grid-column: span 1 !important;
          }
          .modal-grid > div {
             grid-column: span 1 !important;
          }
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

