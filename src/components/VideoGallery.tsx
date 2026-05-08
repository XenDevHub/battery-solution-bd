"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const VideoGallery = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setVideos(data);
          setActiveVideo(data[0]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    let targetUrl = url;
    // If the user pasted an iframe tag, extract the src URL first
    if (url.includes("<iframe")) {
      const srcMatch = url.match(/src=["']([^"']+)["']/);
      if (srcMatch) targetUrl = srcMatch[1];
    }

    // Enhanced regex to support standard, embed, shorts, and mobile URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = targetUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section className="section" id="videos-section" style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <span className="label-caps" style={{ color: "var(--secondary)", marginBottom: "0.5rem", display: "block" }}>KNOWLEDGE BASE</span>
          <h2 className="headline-lg">Technical Resource Portal</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem"
        }} className="md:grid-cols-[2fr_1fr]">
          {/* Main Featured Video Player */}
          <div style={{ position: "relative", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div style={{ 
              position: "relative", 
              aspectRatio: "16/9", 
              backgroundColor: "#000",
            }}>
              {activeVideo ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.youtube_url)}?autoplay=0&rel=0&enablejsapi=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                ></iframe>
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p className="body-md">Loading player...</p>
                </div>
              )}
            </div>
            {activeVideo && (
              <div style={{
                padding: "1.5rem",
                background: "rgba(0,0,0,0.8)",
                borderTop: "1px solid rgba(255,255,255,0.1)"
              }}>
                <h3 className="headline-md" style={{ color: "#fff" }}>{activeVideo.title}</h3>
              </div>
            )}
          </div>

          {/* Sidebar Tutorials List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h4 className="label-caps" style={{ color: "var(--outline)", marginBottom: "0.5rem" }}>WATCH MORE</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxHeight: "450px", overflowY: "auto", paddingRight: "1rem" }} className="tutorial-scroll">
              {videos.length > 0 ? (
                videos.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveVideo(item)}
                    style={{ 
                      display: "flex", 
                      gap: "1rem", 
                      cursor: "pointer",
                      opacity: activeVideo?.id === item.id ? 1 : 0.6,
                      transition: "all 0.3s"
                    }} 
                    className="tutorial-item"
                  >
                    <div style={{ 
                      width: "120px", 
                      height: "68px", 
                      backgroundColor: "#333", 
                      flexShrink: 0,
                      backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(item.youtube_url)}/mqdefault.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}></div>
                    <div>
                      <h5 className="body-md" style={{ fontWeight: "bold", lineHeight: "1.2", marginBottom: "0.25rem" }}>{item.title}</h5>
                      <p className="label-caps" style={{ fontSize: "10px", color: "var(--outline)" }}>{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="body-md" style={{ color: "var(--outline)" }}>No tutorials found in database.</p>
              )}
            </div>
            
            <button style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "transparent",
              color: "var(--on-tertiary)",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s"
            }} className="visit-channel-btn">
              Visit Tutorial Channel
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tutorial-item:hover {
          opacity: 1 !important;
          transform: translateX(4px);
        }
        .tutorial-item:hover h5 {
          color: var(--secondary);
        }
        .visit-channel-btn:hover {
          background-color: rgba(255,255,255,0.05);
          border-color: var(--on-tertiary);
        }
        .tutorial-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .tutorial-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .tutorial-scroll::-webkit-scrollbar-thumb {
          background: var(--secondary);
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .md\:grid-cols-\[2fr_1fr\] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default VideoGallery;