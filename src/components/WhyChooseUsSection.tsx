"use client";

import React from 'react';
import Image from 'next/image';

const WhyChooseUsSection = () => {
  const features = [
    { icon: 'military_tech', title: '10+ Years of Experience', desc: 'Trusted by thousands across Bangladesh.' },
    { icon: 'verified', title: 'Genuine Products', desc: '100% authentic batteries from top brands.' },
    { icon: 'support_agent', title: 'After Sales Service', desc: 'Dedicated support whenever you need it.' },
    { icon: 'local_shipping', title: 'Nationwide Delivery', desc: 'Fast and reliable delivery anywhere.' },
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
          
          <div className="animate-fade-in" style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', minHeight: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <Image 
              src="/service_bd.png" 
              alt="Professional Battery Service in Bangladesh" 
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              background: 'linear-gradient(to top, rgba(0,30,64,0.9), transparent)',
              color: 'white'
            }}>
              <h3 className="headline-md">Trusted Service</h3>
              <p className="body-md">Expert mechanics at your doorstep.</p>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Why Choose Us</h2>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
                We provide the most reliable battery solutions in Bangladesh, combining authentic products with unparalleled service.
              </p>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {features.map((feature, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.5rem',
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--outline-variant)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = 'var(--secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--outline-variant)';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(167, 58, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontSize: '24px' }}>
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="data-display" style={{ marginBottom: '0.25rem', color: 'var(--primary)' }}>{feature.title}</h3>
                    <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
