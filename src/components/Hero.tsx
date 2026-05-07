import React from "react";

const Hero = () => {
  return (
    <header className="technical-grid" style={{
      position: "relative",
      overflow: "hidden",
      backgroundColor: "var(--surface-container-low)",
      padding: "5rem 0",
      borderBottom: "1px solid var(--outline-variant)"
    }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "var(--grid-gutter)",
        alignItems: "center"
      }}>
        <div style={{ zIndex: 10 }}>
          <span className="label-caps" style={{
            backgroundColor: "var(--secondary-container)",
            color: "var(--on-secondary-container)",
            padding: "4px 12px",
            marginBottom: "1.5rem",
            display: "inline-block",
            borderRadius: "var(--radius-sm)"
          }}>
            Industrial Grade LiFePO4
          </span>
          <h1 className="headline-xl" style={{ color: "var(--primary)", marginBottom: "1.5rem" }}>
            Reliable Energy for Dhaka
          </h1>
          <p className="body-lg" style={{ color: "var(--on-surface-variant)", marginBottom: "2rem", maxWidth: "500px" }}>
            Engineered for the high-demand infrastructure of Bangladesh. Our deep-cycle lithium batteries provide stable, high-efficiency power for solar off-grids, industrial backups, and telecommunications.
          </p>
          <div className="flex" style={{ gap: "1rem", flexWrap: "wrap" }}>
            <button className="headline-md" style={{
              backgroundColor: "var(--primary)",
              color: "var(--on-primary)",
              padding: "1rem 2rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              transition: "background 0.3s"
            }}>
              Explore Inventory
              <span className="material-symbols-outlined">bolt</span>
            </button>
            <button className="headline-md" style={{
              backgroundColor: "transparent",
              color: "var(--primary)",
              padding: "1rem 2rem",
              border: "2px solid var(--primary)",
              cursor: "pointer",
              transition: "all 0.3s"
            }}>
              Technical Catalog
            </button>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            backgroundColor: "var(--surface-container-highest)",
            position: "absolute",
            inset: 0,
            transform: "rotate(-3deg) scale(1.05)",
            zIndex: 0
          }}></div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM8hG5lwUSgSgazIO07zcWkRE6MdUveWEj_uOPUUm5-xg5nNvJGsy67Pil5khTN9tzcoE_3qaoKoCu_9h32jnywGQnZjx-WZkJ1ZDdDOOpVc4NS2IkKn0jSlKEKI3pwVFJUHeXTQ2Y8kYLqCbj5z4o1_14DOMlaTBTcvCfloe3aIC-dUc7kESL0Q_Pf4WL5e_08xUMUCIeKR4nU8bhcX_Ho4N1ZUjN7uxjrUJHSwOmUP0sWGqkty-NEmAMiy7_QYYVL2JsVKbuxAk" 
            alt="Premium LiFePO4 Battery" 
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))"
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        button:first-child:hover {
          background-color: var(--primary-container) !important;
        }
        button:last-child:hover {
          background-color: var(--primary) !important;
          color: var(--on-primary) !important;
        }
      `}</style>
    </header>
  );
};

export default Hero;
