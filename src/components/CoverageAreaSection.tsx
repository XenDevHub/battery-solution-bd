"use client";

import React from 'react';

const CoverageAreaSection = () => {
  const areas = [
    "Dhaka", "Chattogram", "Rajshahi", "Khulna", 
    "Barishal", "Sylhet", "Rangpur", "Mymensingh"
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--surface-container-low)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'var(--section-gap)',
          alignItems: 'center'
        }}>
          
          <div>
            <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Nationwide Coverage</h2>
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
              We provide fast and reliable delivery and installation services across all divisions in Bangladesh. Wherever you are, we've got you covered.
            </p>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              {areas.map((area, idx) => (
                <div key={idx} style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--on-surface)'
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>location_on</span>
                  <span className="body-md" style={{ fontSize: '14px', fontWeight: 500 }}>{area} Division</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            borderRadius: 'var(--radius-xl)', 
            overflow: 'hidden', 
            height: '450px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid var(--outline-variant)'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7496149.953730211!2d85.04533784999999!3d23.4521458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e0!3m2!1sen!2sbd!4v1714901000000!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoverageAreaSection;

