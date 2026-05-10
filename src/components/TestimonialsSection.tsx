"use client";

import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "আব্দুর রহমান",
      role: "লজিস্টিকস ম্যানেজার",
      company: "গ্রীন ট্রানজিট লিমিটেড, ঢাকা",
      content: "আমরা যে হ্যামকো ডিপ সাইকেল ব্যাটারিগুলো কিনেছি তা আমাদের যানবাহনের কর্মক্ষমতা অনেক বাড়িয়ে দিয়েছে। ব্যাটারি সলিউশন বিডি-র ইনস্টলেশন সার্ভিস ছিল খুবই পেশাদার এবং সময়োপযোগী।",
      rating: 5
    },
    {
      name: "সুলতানা আহমেদ",
      role: "গৃহিনী",
      company: "আবাসিক গ্রাহক, চট্টগ্রাম",
      content: "চমৎকার সার্ভিস! তারা আমার আইপিএসের জন্য সঠিক রহিমআফরোজ ব্যাটারি বেছে নিতে সাহায্য করেছে। হোম ডেলিভারি ছিল খুব দ্রুত এবং টেকনিশিয়ান অনেক হেল্পফুল ছিলেন।",
      rating: 5
    },
    {
      name: "কামাল হোসেন",
      role: "টেকনিক্যাল লিড",
      company: "বিল্ডরাইট কনস্ট্রাকশন, রাজশাহী",
      content: "একসাথে অনেকগুলো আসল লুকাস ব্যাটারি পাওয়া বেশ কঠিন, কিন্তু ব্যাটারি সলিউশন বিডি সেটা সহজ করে দিয়েছে। তাদের টেকনিক্যাল জ্ঞান আসলেই প্রশংসার দাবিদার।",
      rating: 4
    }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="label-caps" style={{ color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>প্রশংসাপত্র</span>
          <h2 className="headline-lg" style={{ color: 'var(--primary)' }}>আমাদের গ্রাহকরা যা বলেন</h2>
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