"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface HeroImage {
  id: string;
  url: string;
  position: "slider" | "static_top" | "static_bottom";
}

const Hero = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.from("hero_images").select("*").order("created_at", { ascending: true });
      if (!error && data && data.length > 0) {
        setImages(data);
      } else {
        // Fallback images
        setImages([
          { id: "1", url: "https://images.unsplash.com/photo-1620800649725-703444458f27?q=80&w=1200&auto=format&fit=crop", position: "slider" },
          { id: "2", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop", position: "slider" },
          { id: "3", url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop", position: "slider" },
          { id: "4", url: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=400&auto=format&fit=crop", position: "static_top" },
          { id: "5", url: "https://images.unsplash.com/photo-1624365168968-3d14f4eb0d70?q=80&w=400&auto=format&fit=crop", position: "static_bottom" },
        ]);
      }
    };
    fetchImages();
  }, []);

  const sliderImages = images.filter(img => img.position === "slider");
  const staticTopImage = images.find(img => img.position === "static_top");
  const staticBottomImage = images.find(img => img.position === "static_bottom");

  useEffect(() => {
    if (sliderImages.length > 1) {
      const interval = setInterval(() => {
        setSliderIndex((prev) => (prev + 1) % sliderImages.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [sliderImages.length]);

  return (
    <header style={{
      width: "100%",
      margin: "0",
      height: "calc(100vh - 120px)",
      minHeight: "500px",
      maxHeight: "800px",
      display: "flex",
      overflow: "hidden",
      backgroundColor: "#f1dcdcff",
      borderRadius: "0",
      boxShadow: "none"
    }}>
      {/* 75% Left Part - Slider */}
      <div style={{
        width: "75%",
        height: "100%",
        position: "relative",
        marginRight: "15px" // Increased gap between parts
      }}>
        {sliderImages.length > 0 ? (
          sliderImages.map((img, index) => (
            <div
              key={img.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: index === sliderIndex ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))
        ) : (
          <div style={{ width: "100%", height: "100%", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            Loading...
          </div>
        )}
      </div>

      {/* 25% Right Part - Static Images */}
      <div style={{
        width: "25%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px" // Added gap between top and bottom images too
      }}>
        {/* Top 50% */}
        <div style={{
          flex: 1,
          width: "100%",
          backgroundImage: staticTopImage ? `url(${staticTopImage.url})` : "none",
          backgroundColor: "#444",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />

        {/* Bottom 50% */}
        <div style={{
          flex: 1,
          width: "100%",
          backgroundImage: staticBottomImage ? `url(${staticBottomImage.url})` : "none",
          backgroundColor: "#555",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotating {
          animation: spin 4s linear infinite;
        }
        @media (max-width: 768px) {
          header {
            flex-direction: column !important;
            height: auto !important;
            min-height: 100vh !important;
          }
          header > div:first-child {
            width: 100% !important;
            height: 50vh !important;
            margin-right: 0 !important;
            margin-bottom: 10px !important;
          }
          header > div:last-child {
            width: 100% !important;
            height: 50vh !important;
            flex-direction: column !important;
          }
          header > div:last-child > div {
            width: 100% !important;
            height: 50% !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Hero;
