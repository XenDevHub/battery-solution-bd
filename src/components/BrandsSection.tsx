"use client";

import React from 'react';

const BrandsSection = () => {
  const brands = [
    { name: 'Rahimafrooz', image: '/brands/rahimafrooz.jpg' },
    { name: 'Hamko', image: '/brands/hamko.png' },
    { name: 'Volta', image: '/brands/volta.png' },
    { name: 'Navana', image: '/brands/navana.png' },
    { name: 'Pylontech', image: '/brands/pylontech.jpg' },
    { name: 'Growatt', image: '/brands/growatt.png' },
    { name: 'Felicity', image: '/brands/felicity.svg' },
    { name: 'Lucas', image: '/brands/lucas.png' },
    { name: 'Globatt', image: '/brands/globatt.svg' },
    { name: 'LifePo4', image: '', color: '#3498db' },
    { name: 'DJDC', image: '', color: '#e67e22' },
    { name: 'Sako', image: '', color: '#9b59b6' }
  ];

  // Duplicate the array for seamless infinite scrolling
  const scrollBrands = [...brands, ...brands];

  return (
    <section className="section" style={{ backgroundColor: 'var(--surface-container)', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', paddingBottom: '0' }}>
        <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Premium Brands We Offer</h2>
        <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          We partner with the best battery manufacturers to ensure you get durable and high-performance power solutions.
        </p>
      </div>

      <div className="marquee-container" style={{
        display: 'flex',
        overflow: 'hidden',
        userSelect: 'none',
        gap: '1.5rem',
        padding: '0 1rem',
        width: '100%',
      }}>
        <div className="marquee-content" style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          animation: 'scroll 30s linear infinite',
          minWidth: '200%'
        }}>
          {scrollBrands.map((brand, idx) => (
            <div key={idx} className="brand-card" style={{
              backgroundColor: 'var(--surface)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              height: '100px',
              minWidth: '200px',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              {brand.image ? (
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain',
                    filter: 'grayscale(20%) contrast(1.1)',
                    transition: 'filter 0.3s ease'
                  }} 
                />
              ) : (
                <div style={{
                  color: brand.color || 'var(--primary)',
                  fontSize: '24px',
                  fontWeight: '900',
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-space-grotesk)',
                  textAlign: 'center'
                }}>
                  {brand.name.toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }

        .brand-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
          border-color: var(--secondary) !important;
        }

        .brand-card:hover img {
          filter: grayscale(0%) contrast(1.2);
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;

