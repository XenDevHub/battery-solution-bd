"use client";

import React from 'react';

const ServicesSection = () => {
  const services = [
    { icon: 'build', title: 'Battery Installation', desc: 'Professional installation at your location by our expert mechanics.' },
    { icon: 'currency_exchange', title: 'Old Battery Exchange', desc: 'Exchange your old battery for a discount on a new one.' },
    { icon: 'two_wheeler', title: 'Home Delivery', desc: 'Fast and reliable home delivery service across our coverage areas.' },
    { icon: 'verified_user', title: 'Warranty Service', desc: 'Hassle-free warranty claims and dedicated after-sales support.' },
  ];

  return (
    <section className="section technical-grid" style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="headline-lg" style={{ marginBottom: '1rem' }}>Our Premium Services</h2>
          <p className="body-lg" style={{ color: 'var(--on-primary-container)', maxWidth: '600px', margin: '0 auto' }}>
            Comprehensive battery solutions tailored to keep your life moving without interruptions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, idx) => (
            <div key={idx} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 10px 20px rgba(167, 58, 0, 0.3)'
              }}>
                <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '32px' }}>
                  {service.icon}
                </span>
              </div>
              <h3 className="data-display" style={{ marginBottom: '1rem' }}>{service.title}</h3>
              <p className="body-md" style={{ color: 'var(--on-primary-container)' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
