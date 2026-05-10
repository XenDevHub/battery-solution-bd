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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className="headline-lg">Battery Inventory</h1>
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
              placeholder="Search by name or SKU..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                padding: "10px 10px 10px 40px", 
                border: "1px solid var(--outline-variant)",
                borderRadius: "var(--radius-md)",
                width: "250px",
                fontSize: "14px"
              }}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "var(--secondary)",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              fontWeight: "bold"
            }} className="label-caps">
            <span className="material-symbols-outlined">add</span>
            Add New
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", border: "1px solid var(--outline-variant)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface-container-low)" }}>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Image</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Product & SKU</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Specs</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Price</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Stock</th>
              <th className="label-caps" style={{ padding: "1rem 1.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatteries.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid var(--outline-variant)" }}>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <img src={b.image_url || "https://via.placeholder.com/50"} alt="" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <p className="body-md" style={{ fontWeight: "bold" }}>{b.title}</p>
                  <p className="label-caps" style={{ fontSize: "10px", color: "var(--outline)" }}>{b.sku}</p>
                </td>
                <td style={{ padding: "1rem 1.5rem" }} className="body-md">
                  {b.capacity} | {b.voltage}
                </td>
                <td style={{ padding: "1rem 1.5rem" }} className="data-display">
                  ৳ {b.price.toLocaleString()}
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <span style={{
                    padding: "4px 8px",
                    backgroundColor: b.stock_quantity > 5 ? "#22c55e22" : "#ef444422",
                    color: b.stock_quantity > 5 ? "#22c55e" : "#ef4444",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    {b.stock_quantity} units
                  </span>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <button style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", marginLeft: "1rem" }}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBatteries.length === 0 && (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--outline)" }}>
            No products found matching your search.
          </div>
        )}
      </div>

      {/* Add Battery Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", padding: "2.5rem", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
              <h2 className="headline-md">Register New Unit</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>&times;</button>
            </div>
            <form onSubmit={handleUpload} className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label className="label-caps">Battery Title</label>
                <input required value={newBattery.title} onChange={(e) => setNewBattery({...newBattery, title: e.target.value})} type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div>
                <label className="label-caps">SKU ID</label>
                <input required value={newBattery.sku} onChange={(e) => setNewBattery({...newBattery, sku: e.target.value})} type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div>
                <label className="label-caps">Price (BDT)</label>
                <input required value={newBattery.price} onChange={(e) => setNewBattery({...newBattery, price: e.target.value})} type="number" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div>
                <label className="label-caps">Capacity (Ah)</label>
                <input required value={newBattery.capacity} onChange={(e) => setNewBattery({...newBattery, capacity: e.target.value})} type="text" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--outline-variant)" }} />
              </div>
              <div>
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
    </div>
  );
}

