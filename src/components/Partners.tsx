import { useEffect, useRef } from 'react';
import qwcLogo from '../assets/partner_logos/mock.avif';
import rivieraLogo from '../assets/partner_logos/mock.avif';
import minibusLogo from '../assets/partner_logos/mock.avif';
import virtualLogo from '../assets/partner_logos/mock.avif';
import deliveryLogo from '../assets/partner_logos/mock.avif';
import africanTourismLogo from '../assets/partner_logos/mock.avif';
import oldMutualLogo from '../assets/partner_logos/mock.avif';
import { Link } from 'react-router-dom';


// Partner logos array
const partnerLogos = [
  { src: qwcLogo, alt: 'QWC', name: 'QWC' },
  { src: rivieraLogo, alt: 'Riviera', name: 'Riviera' },
  { src: minibusLogo, alt: 'Minibus', name: 'Minibus' },
  { src: virtualLogo, alt: 'Virtual', name: 'Virtual' },
  { src: deliveryLogo, alt: 'Delivery', name: 'Delivery' },
  { src: africanTourismLogo, alt: 'African Tourism', name: 'African Tourism' },
  { src: oldMutualLogo, alt: 'Old Mutual', name: 'Old Mutual' },
];

export default function ModernPartners() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" id="header">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/70 font-medium">Trusted Partnerships</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent mb-4">
            Our Partners
          </h2>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Collaborating with industry leaders to deliver exceptional results and drive innovation forward.
          </p>
        </div>

        {/* Infinite Scroll Partners */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
          
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-8 animate-scroll"
              style={{
                width: 'calc(200% + 2rem)',
              }}
            >
              {partnerLogos.map((logo, idx) => (
  <div
    key={`first-${idx}`}
    className="flex-shrink-0 group relative"
  >
    <div className="w-40 h-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden group-hover:scale-110 group-hover:bg-white/10">
      <img
        src={logo.src}
        alt={logo.alt}
        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    </div>
  </div>
))}

{partnerLogos.map((logo, idx) => (
  <div
    key={`second-${idx}`}
    className="flex-shrink-0 group relative"
  >
    <div className="w-40 h-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden group-hover:scale-110 group-hover:bg-white/10">
      <img
        src={logo.src}
        alt={logo.alt}
        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    </div>
  </div>
))}

            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" id="stats">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">50+</h3>
            <p className="text-white/60">Successful Projects</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">7+</h3>
            <p className="text-white/60">Trusted Partners</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
            <p className="text-white/60">Client Satisfaction</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" id="cta">
        <Link to="/brandstory">
      <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative flex items-center gap-2">
          Get our Partnership Kit
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
    </Link>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-float {
          animation: float var(--duration, 4s) ease-in-out infinite;
        }

        .animate-in #header,
        .animate-in #stats,
        .animate-in #cta {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-in #header {
          transition-delay: 0.2s;
        }

        .animate-in #stats {
          transition-delay: 0.4s;
        }

        .animate-in #cta {
          transition-delay: 0.6s;
        }

        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}