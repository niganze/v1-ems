import { useEffect, useRef } from "react";
import ModernPartners from "../components/Partners";
import PromoEvents from "../components/promoevents";
import BrandStory from "../components/BrandStory";
import { StatsScene } from "../components/StatsScene";

const sections = [
  { title: "Home", text: "Welcome to my futuristic portfolio." },
  { title: "About", text: "Creative full-stack dev exploring digital worlds." },
  { title: "Projects", text: "Immersive, AI-powered, and XR creations." },
  { title: "Skills", text: "React, GSAP, Node, Three.js, and more." },
  { title: "Contact", text: "Let's collaborate on your next mind-blowing idea." },
];

export default function OrbitalCards() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardCount = sections.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;

      // Rotate around Y based on scroll
      const rotation = scrollPercent * 360;
      if (orbitRef.current) {
        orbitRef.current.style.transform = `rotateY(${rotation}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div
      className="w-full overflow-x-hidden bg-black"
      style={{ 
        perspective: "1000px",
        height: "200vh"
      }}
    >
      
      {/* Centered Orbit Ring - adjusted for navbar */}
      <div
        className="fixed transform -translate-x-1/2"
        style={{ 
          transformStyle: "preserve-3d",
          top: "50vh", // Centered accounting for navbar
          left: "50%"
        }}
      >
        <div
          ref={orbitRef}
          className="relative w-[0px] h-[0px]"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
        >
          {sections.map((section, i) => {
            const angle = (360 / cardCount) * i;
            const radius = 300; // Reduced from 400

            return (
              <div
                key={i}
                className="absolute w-[260px] h-[140px] bg-[#1c1c1c] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-4 orbital-card"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(0px)`,
                  backfaceVisibility: "hidden",
                  border: "2px solid #00f2ff55",
                  boxShadow: "0 0 40px #00f2ff66, inset 0 0 15px rgba(0,242,255,0.1)",
                }}
              >
                <h2 className="mb-2 text-xl font-bold text-cyan-300">
                  {section.title}
                </h2>
                <p className="text-xs leading-relaxed text-center text-gray-300">{section.text}</p>
                
                {/* Card glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent card-shimmer"></div>
              </div>
            );
          })}

          {/* Compact Planet Structure */}
          <div
            className="absolute tall-planet"
            style={{
              width: "180px", // Reduced from 240px
              height: "180px", // Reduced from 240px
              left: "50%",
              top: "50%",
              transform: `translateX(-50%) translateY(-50%) translateZ(0px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Main Planet Core */}
            <div
              className="absolute flex flex-col items-center justify-center rounded-full shadow-lg vibrant-tube planet-middle"
              style={{
                width: "180px", // Reduced from 240px
                height: "180px", // Reduced from 240px
                top: "0px",
                left: "0px",
                background:
                  "radial-gradient(circle, rgba(138,43,226,0.9), rgba(255,20,147,0.8), rgba(0,242,255,0.6))",
                border: "3px solid #00f2ffbb",
                boxShadow: "0 0 80px 20px rgba(0,242,255,0.9), inset 0 0 40px rgba(255,255,255,0.4)",
                overflow: "hidden",
              }}
            >
              {/* GIF in the planet core */}
              <div className="absolute inset-0 gif-container">
                <img
                  src="https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif"
                  alt="Cosmic Energy"
                  className="object-cover w-full h-full rounded-full vibrant-gif primary-gif"
                  draggable={false}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-cyan-400/30 to-magenta-500/40 mix-blend-overlay"></div>
              </div>
              
              {/* Floating particles overlay */}
              <div className="absolute inset-0 particles-overlay">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
                <div className="particle particle-6"></div>
                <div className="particle particle-7"></div>
                <div className="particle particle-8"></div>
              </div>

              {/* Energy rings around the planet */}
              <div className="absolute energy-ring ring-middle-1"></div>
              <div className="absolute energy-ring ring-middle-2"></div>
              <div className="absolute energy-ring ring-middle-3"></div>
            </div>

            {/* Planet Core Glow - Inner light beam */}
            <div
              className="absolute w-[60px] h-[60px] planet-core rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(0,242,255,0.8), transparent)",
                boxShadow: "0 0 30px 10px rgba(255,255,255,0.8)",
              }}
            ></div>
          </div>

          {/* Additional orbital rings - made smaller */}
          <div 
            className="absolute ring-1"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          ></div>
          <div 
            className="absolute ring-2"
            style={{
              left: "50%",
              top: "50%", 
              transform: "translate(-50%, -50%)"
            }}
          >
            <PromoEvents/>
          </div>
          

          {/* Add enhanced keyframes and styles */}
          <style>{`
            @keyframes tallPlanetFloat {
              0%, 100% { 
                transform: translateX(-50%) translateY(-50%) translateZ(0px) rotateY(0deg); 
              }
              50% { 
                transform: translateX(-50%) translateY(-50%) translateZ(0px) rotateY(2deg); 
              }
            }

            @keyframes planetCoreGlow {
              0%, 100% {
                opacity: 0.8;
                box-shadow: 0 0 15px 3px rgba(255,255,255,0.6);
              }
              50% {
                opacity: 1;
                box-shadow: 0 0 30px 8px rgba(0,242,255,0.9);
              }
            }

            @keyframes cardShimmer {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }

            @keyframes energyRingRotate {
              0% { transform: rotateZ(0deg) scale(1); }
              100% { transform: rotateZ(360deg) scale(1.1); }
            }

            .tall-planet {
              animation: tallPlanetFloat 6s ease-in-out infinite;
            }

            .planet-middle {
              animation: vibrantFloat 4s ease-in-out infinite, intensePulse 2.5s ease-in-out infinite;
            }

            .planet-core {
              animation: planetCoreGlow 3s ease-in-out infinite;
            }

            .planet-cap-glow {
              animation: planetPulse 4s ease-in-out infinite;
            }

            .card-shimmer {
              animation: cardShimmer 3s ease-in-out infinite;
            }

            .energy-ring {
              border: 2px solid rgba(0,242,255,0.6);
              border-radius: 50%;
              animation: energyRingRotate 8s linear infinite;
            }

            .ring-middle-1 {
              width: 190px; /* Reduced */
              height: 40px; /* Reduced */
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotateX(80deg);
              animation-duration: 6s;
            }

            .ring-middle-2 {
              width: 220px; /* Reduced */
              height: 45px; /* Reduced */
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotateX(80deg);
              animation-duration: 10s;
              animation-direction: reverse;
              border-color: rgba(255,20,147,0.4);
            }

            .particle-6 {
              top: 15%;
              right: 15%;
              animation-delay: 2.5s;
              animation-duration: 3.8s;
            }

            .particle-7 {
              bottom: 15%;
              left: 35%;
              animation-delay: 1.8s;
              animation-duration: 4.2s;
            }

            .particle-8 {
              top: 75%;
              left: 10%;
              animation-delay: 0.8s;
              animation-duration: 3.3s;
            }

            @keyframes intensePulse {
              0% {
                filter: 
                  drop-shadow(0 0 8px #00f2ff) 
                  drop-shadow(0 0 15px #ff1493) 
                  brightness(1) 
                  contrast(1) 
                  saturate(1.5);
                box-shadow: 
                  0 0 50px 15px rgba(0,242,255,0.8), 
                  inset 0 0 25px rgba(255,255,255,0.2),
                  0 0 80px 25px rgba(255,20,147,0.4);
              }
              33% {
                filter: 
                  drop-shadow(0 0 20px #ff1493) 
                  drop-shadow(0 0 28px #8a2be2) 
                  brightness(1.3) 
                  contrast(1.2) 
                  saturate(2);
                box-shadow: 
                  0 0 65px 20px rgba(255,20,147,0.9), 
                  inset 0 0 30px rgba(138,43,226,0.3),
                  0 0 95px 28px rgba(0,242,255,0.5);
              }
              66% {
                filter: 
                  drop-shadow(0 0 15px #8a2be2) 
                  drop-shadow(0 0 25px #00f2ff) 
                  brightness(1.1) 
                  contrast(1.1) 
                  saturate(1.8);
                box-shadow: 
                  0 0 55px 18px rgba(138,43,226,0.8), 
                  inset 0 0 28px rgba(0,242,255,0.2),
                  0 0 85px 26px rgba(255,20,147,0.6);
              }
              100% {
                filter: 
                  drop-shadow(0 0 8px #00f2ff) 
                  drop-shadow(0 0 15px #ff1493) 
                  brightness(1) 
                  contrast(1) 
                  saturate(1.5);
                box-shadow: 
                  0 0 50px 15px rgba(0,242,255,0.8), 
                  inset 0 0 25px rgba(255,255,255,0.2),
                  0 0 80px 25px rgba(255,20,147,0.4);
              }
            }

            @keyframes gifVibrancy {
              0%, 100% { 
                transform: scale(1) rotateZ(0deg);
                filter: hue-rotate(0deg) brightness(1.2) saturate(1.5);
              }
              20% { 
                transform: scale(1.05) rotateZ(0.5deg);
                filter: hue-rotate(36deg) brightness(1.4) saturate(2);
              }
              40% { 
                transform: scale(1.1) rotateZ(-0.3deg);
                filter: hue-rotate(72deg) brightness(1.3) saturate(1.8);
              }
              60% { 
                transform: scale(1.08) rotateZ(0.8deg);
                filter: hue-rotate(108deg) brightness(1.5) saturate(2.2);
              }
              80% { 
                transform: scale(1.03) rotateZ(-0.2deg);
                filter: hue-rotate(144deg) brightness(1.2) saturate(1.7);
              }
            }

            @keyframes particleFloat {
              0%, 100% { 
                transform: translateY(0px) translateX(0px) scale(0.5);
                opacity: 0.3;
              }
              50% { 
                transform: translateY(-15px) translateX(8px) scale(1);
                opacity: 0.8;
              }
            }

            @keyframes planetPulse {
              0%, 100% { 
                box-shadow: 0 0 40px 8px rgba(0,242,255,0.6);
                transform: translateZ(120px) scale(1);
              }
              50% { 
                box-shadow: 0 0 60px 15px rgba(0,242,255,0.9);
                transform: translateZ(120px) scale(1.05);
              }
            }

            @keyframes orbitalRing {
              0% { transform: rotateY(0deg) rotateX(70deg); }
              100% { transform: rotateY(360deg) rotateX(70deg); }
            }

            .vibrant-tube {
              animation: vibrantFloat 4s ease-in-out infinite, intensePulse 2.5s ease-in-out infinite;
            }

            .vibrant-gif {
              animation: gifVibrancy 3s ease-in-out infinite;
              transform-origin: center;
              will-change: transform, filter;
            }

            .planet-glow {
              animation: planetPulse 3s ease-in-out infinite;
            }

            .orbital-card {
              transition: all 0.3s ease;
            }
            
            .orbital-card:hover {
              transform: scale(1.05);
              box-shadow: 0 0 50px #00f2ff66;
            }

            .particle {
              position: absolute;
              width: 3px; /* Reduced */
              height: 3px; /* Reduced */
              background: radial-gradient(circle, #fff, #00f2ff);
              border-radius: 50%;
              animation: particleFloat 4s ease-in-out infinite;
            }

            .particle-1 {
              top: 20%;
              left: 15%;
              animation-delay: 0s;
            }

            .particle-2 {
              top: 60%;
              right: 20%;
              animation-delay: 1s;
              animation-duration: 3.5s;
            }

            .particle-3 {
              bottom: 25%;
              left: 25%;
              animation-delay: 2s;
              animation-duration: 4.5s;
            }

            .particle-4 {
              top: 40%;
              right: 10%;
              animation-delay: 0.5s;
              animation-duration: 3s;
            }

            .particle-5 {
              bottom: 40%;
              right: 30%;
              animation-delay: 1.5s;
              animation-duration: 4s;
            }

            .ring-1 {
              width: 450px; /* Reduced */
              height: 450px; /* Reduced */
              border: 2px solid rgba(0,242,255,0.3);
              border-radius: 50%;
              transform: translate(-50%, -50%) translateZ(-80px) rotateX(70deg);
              animation: orbitalRing 20s linear infinite;
            }

            .ring-2 {
              width: 600px; /* Reduced */
              height: 600px; /* Reduced */
              border: 1px solid rgba(255,20,147,0.2);
              border-radius: 50%;
              transform: translate(-50%, -50%) translateZ(-120px) rotateX(75deg);
              animation: orbitalRing 30s linear infinite reverse;
            }

            /* Navbar Styles */
            nav {
              box-shadow: 0 4px 20px rgba(0, 242, 255, 0.1);
            }

            nav:hover {
              box-shadow: 0 4px 30px rgba(0, 242, 255, 0.2);
            }
          `}</style>
        </div>
        
      </div>
      
    </div>
    <ModernPartners/>
    <BrandStory/>
    </>
  );
}