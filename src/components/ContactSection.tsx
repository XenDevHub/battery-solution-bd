"use client";

import React, { useState } from "react";


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Engineering Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Project Details:* ${formData.details}`;
    const whatsappUrl = `https://wa.me/8801601372827?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="contact-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <h2 className="headline-lg" style={{ color: "var(--primary)", marginBottom: "1.5rem" }}>
              Expert Support for Critical Infrastructure
            </h2>
            <p className="body-lg" style={{ color: "var(--on-surface-variant)", marginBottom: "3rem" }}>
              Whether you're powering a small home or a city-wide telecom network, our engineers are ready to assist with sizing, configuration, and technical logistics.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {[
                { icon: "call", label: "DIRECT SALES", value: "+8801601372827" },
                { icon: "mail", label: "TECHNICAL ENQUIRIES", value: "shakzunaidjake@gmail.com" },
                { icon: "location_on", label: "HEADQUARTERS", value: "Dhaka, Bangladesh" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "rgba(167, 58, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span className="material-symbols-outlined" style={{ color: "var(--secondary)" }}>{item.icon}</span>
                  </div>
                  <div>
                    <span className="label-caps" style={{ color: "var(--outline)", display: "block" }}>{item.label}</span>
                    <p className="headline-md" style={{ color: "var(--primary)" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="contact-form-container" style={{
            backgroundColor: "var(--surface-container)",
            padding: "2.5rem",
            border: "1px solid var(--outline-variant)"
          }}>
            <h3 className="headline-md" style={{ marginBottom: "1.5rem" }}>Request Technical Specs</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label className="label-caps" style={{ color: "var(--outline)", display: "block", marginBottom: "0.5rem" }}>FULL NAME</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "1px solid var(--outline-variant)",
                    backgroundColor: "var(--surface-container-lowest)",
                    outline: "none"
                  }} className="form-input" 
                />
              </div>
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label className="label-caps" style={{ color: "var(--outline)", display: "block", marginBottom: "0.5rem" }}>EMAIL ADDRESS</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "1px solid var(--outline-variant)",
                      backgroundColor: "var(--surface-container-lowest)",
                      outline: "none"
                    }} className="form-input" 
                  />
                </div>
                <div>
                  <label className="label-caps" style={{ color: "var(--outline)", display: "block", marginBottom: "0.5rem" }}>PHONE NUMBER</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "1px solid var(--outline-variant)",
                      backgroundColor: "var(--surface-container-lowest)",
                      outline: "none"
                    }} className="form-input" 
                  />
                </div>
              </div>
              <div>
                <label className="label-caps" style={{ color: "var(--outline)", display: "block", marginBottom: "0.5rem" }}>PROJECT DETAILS</label>
                <textarea 
                  required
                  rows={4} 
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "1px solid var(--outline-variant)",
                    backgroundColor: "var(--surface-container-lowest)",
                    outline: "none",
                    resize: "vertical"
                  }} className="form-input"
                ></textarea>
              </div>
              <button type="submit" style={{
                backgroundColor: "var(--secondary)",
                color: "var(--on-secondary)",
                padding: "1rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s"
              }} className="submit-btn">
                <span className="headline-md" style={{ fontSize: "18px" }}>Submit Engineering Request</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .form-input:focus {
          border-color: var(--secondary) !important;
        }
        .submit-btn:hover {
          background-color: var(--secondary-container) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
          .contact-form-container {
            padding: 1.5rem !important;
          }
          .headline-md {
            font-size: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
