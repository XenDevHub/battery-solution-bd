"use client";

import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Abdur Rahman",
      role: "Logistics Manager",
      company: "Green Transit Ltd.",
      content: "The Hamko deep cycle batteries we purchased have significantly improved our fleet's uptime. Battery Solution BD's installation service was professional and timely.",
      rating: 5
    },
    {
      name: "Sultana Ahmed",
      role: "Homeowner",
      company: "Residential Client",
      content: "Excellent service! They helped me choose the right Rahimafrooz battery for my IPS. The home delivery was fast, and the technician was very helpful.",
      rating: 5
    },
    {
      name: "Kamal Hossain",
      role: "Technical Lead",
      company: "BuildRight Construction",
      content: "Finding genuine Lucas batteries in bulk is often difficult, but Battery Solution BD made it easy. Their technical knowledge is top-notch.",
      rating: 4
    }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="label-caps" style={{ color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>TESTIMONIALS</span>
          <h2 className="headline-lg" style={{ color: 'var(--primary)' }}>What Our Clients Say</h2>
          <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--secondary)', margin: '1rem auto 0 auto' }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--surface-container-low)',
              padding: '2.5rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--outline-variant)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative'
            }} className="testimonial-card">
              <div style={{ color: '#FFB800', marginBottom: '1.5rem', display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: i < t.rating ? "'FILL' 1" : "'FILL' 0" }}>
                    star
                  </span>
                ))}
              </div>
              
              <p className="body-lg" style={{ color: 'var(--on-surface)', fontStyle: 'italic', marginBottom: '2rem', flexGrow: 1 }}>
                "{t.content}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--on-primary-container)',
                  fontWeight: 'bold'
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="body-md" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{t.name}</h4>
                  <p className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{t.role}, {t.company}</p>
                </div>
              </div>

              <span className="material-symbols-outlined" style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                fontSize: '48px',
                opacity: 0.1,
                color: 'var(--primary)'
              }}>
                format_quote
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          border-color: var(--secondary);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;