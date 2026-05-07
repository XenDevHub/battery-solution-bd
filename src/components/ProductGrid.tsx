import React from "react";

const ProductCard = ({ title, capacity, voltage, image, tag, tagColor }: any) => (
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
      <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.5s" }} className="card-img" />
      <div style={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        backgroundColor: tagColor,
        color: "var(--on-primary)",
        padding: "4px 8px",
        fontSize: "10px",
        fontFamily: "var(--font-inter)",
        fontWeight: "bold"
      }}>
        {tag}
      </div>
    </div>
    <div style={{ padding: "var(--card-padding)" }}>
      <h3 className="headline-md" style={{ marginBottom: "1rem" }}>{title}</h3>
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
          <span className="data-display" style={{ color: "var(--primary)" }}>{capacity}</span>
        </div>
        <div>
          <span className="label-caps" style={{ color: "var(--outline)", display: "block" }}>VOLTAGE</span>
          <span className="data-display" style={{ color: "var(--primary)" }}>{voltage}</span>
        </div>
      </div>
      <button style={{
        width: "100%",
        backgroundColor: "var(--surface-container-high)",
        color: "var(--primary)",
        padding: "0.75rem",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "12px",
        letterSpacing: "0.1em"
      }} className="view-btn">
        View Details
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
  const products = [
    {
      title: "DB-100 Standard Series",
      capacity: "100Ah",
      voltage: "12.8V",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe14BkHq61MQ5oqdEW7uPvaJmn4LOjUNcYtBRpk4iMCTrfdwNoE6kzD5hpkCOhCgnzUVEOyBcuZtu3n1BDRLvTD7emHn0cc9CSRxi_c6Ta7l-alcinJGv3GRudr4wrHs-qaqc7IIOMVZAvpuo12lRWcrdyrgd7rLGXvcmlIotpP9Ak4E4ZGhyXtgg0Zh3O4CnoQdzV3pUhsRV6uWbLiED2YwWCpyAofyV_J3vUl4biXN12zT24lD7xBBS-pQY1hzaXv3GElLiSuaE",
      tag: "SOLAR READY",
      tagColor: "var(--primary)"
    },
    {
      title: "DB-200 Power Master",
      capacity: "200Ah",
      voltage: "25.6V",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5vL_rk96bQKupO67hp2EmbuAhg-STFVymly_dBfE6u9v-LZnhpisPYU891b9cn1-byOHMISCeIWw3SapvL-0uzGx_7ZniAPaDzYbr0i8gzxYP0zh4MYo1rcl9invS8XcomG_V2Ni9eeJsAc9lHfe36PAZiHscecNgmQTlJtRR2xOd_lZxmUDs7g5ea6WsyAW3WGvteoyABEtni0Hr7DxMWKanzeGdGkaC0TTA3fAcrMhC6ptkR-_YdQt3kQyctaxk9OoOWHBNsXM",
      tag: "HIGH DENSITY",
      tagColor: "var(--secondary)"
    },
    {
      title: "DB-48 Smart Stack",
      capacity: "100Ah",
      voltage: "51.2V",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXF4cyj1LAYQI6CnZtnGIeOuszzbYCfqEsY-CxHqZs3QwnrBqnLm9mWijS8l3SM5_PNQV53GEhaKyBQ-znFkXuM8Ns94j7wQRizh3C9nEvVlcsa7Pv_88BkZI_M7Ya1t9iBuduLniRCqY8RrbluC9kqqW3BYvO7BCuT10j3qKa9hY5Gfifik-djwQdNhn2wRDP30s0YgT7-h7DttJZvNQ96fwZ4ARAcQ3NJrhAedAdsLcJ_Sgf2ijlJeRCf62QekNfn4qlY2oQT_Q",
      tag: "SMART BMS",
      tagColor: "var(--tertiary)"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <h2 className="headline-lg" style={{ color: "var(--primary)" }}>LiFePO4 Power Series</h2>
            <div style={{ height: "4px", width: "80px", backgroundColor: "var(--secondary)", marginTop: "0.5rem" }}></div>
          </div>
          <a href="#" style={{ color: "var(--secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }} className="label-caps">
            View All Specifications <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--grid-gutter)"
        }}>
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
