import{ useState, useEffect, useRef } from 'react';

const BrandStory = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Use actual images
  const bgImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop'
  ];

  const colors = {
    emsOrange: '#FF6B35',
    emsBlue: '#3FA9F5',
    emsPurple: '#8B5CF6',
    emsPink: '#F472B6',
    emsWhite: '#FFFFFF'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(i => (i + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 0.5 + 0.1,
    opacity: Math.random() * 0.6 + 0.2
  }));

  const textLines = [
    "We are a global brand",
    "experience & event", 
    "communications agency."
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-[70vh] flex flex-col md:flex-row items-stretch bg-black overflow-hidden relative"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
      }}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${10 + particle.speed * 20}s infinite linear, pulse ${3 + particle.speed * 2}s infinite ease-in-out alternate`
            }}
          />
        ))}
      </div>

      {/* Dynamic light beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-400/20 via-transparent to-purple-500/20"
          style={{
            transform: 'rotate(15deg)',
            animation: 'beam 8s infinite ease-in-out'
          }}
        />
        <div 
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-400/20 via-transparent to-blue-500/20"
          style={{
            transform: 'rotate(-10deg)',
            animation: 'beam 6s infinite ease-in-out reverse'
          }}
        />
      </div>

      {/* Holographic grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(63, 169, 245, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(63, 169, 245, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid 20s infinite linear'
        }}
      />

      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-16 z-20 relative">
        {/* Glowing orb */}
        <div 
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-20 blur-xl"
          style={{
            background: 'radial-gradient(circle, #3FA9F5 0%, #8B5CF6 50%, #F472B6 100%)',
            animation: isVisible ? 'orb 12s infinite ease-in-out' : 'none'
          }}
        />

        {/* Category label with scanner effect */}
        <div className="relative mb-6 overflow-hidden">
          <span 
            className={`text-lg font-bold tracking-[0.3em] relative z-10 transition-all duration-1000 ${
              isVisible ? 'text-orange-400 translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.5)',
              animation: isVisible ? 'glow 2s infinite alternate' : 'none'
            }}
          >
            OUR BRAND STORY
          </span>
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent transition-transform duration-2000 ${
              isVisible ? 'translate-x-full' : '-translate-x-full'
            }`}
            style={{ animation: isVisible ? 'scanner 3s infinite' : 'none' }}
          />
        </div>

        {/* Main heading with cinematic reveal */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[0.9] mb-6 relative">
          {textLines.map((line, lineIndex) => (
            <div key={lineIndex} className="block overflow-hidden mb-2">
              <div
                className={`transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-full opacity-0'
                }`}
                style={{
                  transitionDelay: `${lineIndex * 300 + 500}ms`,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '900'
                }}
              >
                {line.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block mr-4 relative cursor-pointer transition-all duration-500 hover:scale-110 ${
                      isVisible ? 'animate-none' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${colors.emsBlue}, ${colors.emsPurple}, ${colors.emsPink})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      animation: isVisible ? `wordReveal 0.8s ease-out ${lineIndex * 300 + wordIndex * 150 + 800}ms both, shimmer 3s infinite ${wordIndex * 0.5}s` : 'none',
                      textShadow: '0 0 30px rgba(63, 169, 245, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1.1) rotateY(10deg)';
                      (e.target as HTMLElement).style.textShadow = '0 0 40px rgba(244, 114, 182, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1) rotateY(0deg)';
                      (e.target as HTMLElement).style.textShadow = '0 0 30px rgba(63, 169, 245, 0.3)';
                    }}
                  >
                    {word}
                    {/* Holographic overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        animation: 'hologram 2s infinite',
                        animationDelay: `${wordIndex * 0.2}s`
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </h1>
      </div>

      {/* Right: Dynamic Visual Section */}
      <div className="flex-1 relative min-h-[400px] md:min-h-0 flex items-center justify-center">
        {/* Morphing background */}
        <div className="absolute inset-0 rounded-l-3xl overflow-hidden">
          {bgImages.map((imageUrl, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-2000 bg-cover bg-center ${
                i === bgIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                animation: i === bgIndex ? 'morph 4s infinite ease-in-out' : 'none'
              }}
            />
          ))}
          
          {/* Overlay effects */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-pink-900/60"
            style={{
              animation: 'overlay-shift 8s infinite ease-in-out'
            }}
          />
          
          {/* Digital rain effect */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-gradient-to-b from-green-400 to-transparent"
                style={{
                  left: `${(i * 5) % 100}%`,
                  height: '100%',
                  animation: `rain ${2 + Math.random() * 3}s infinite linear ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating content card */}
        <div 
          className={`relative z-10 max-w-sm mx-6 p-6 rounded-xl border backdrop-blur-xl transition-all duration-1000 ${
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-12 opacity-0 scale-95'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transitionDelay: '800ms',
            animation: isVisible ? 'float 6s infinite ease-in-out' : 'none'
          }}
        >
          <p 
            className="text-white text-lg leading-relaxed"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
          >
            For 25 years, we have helped clients build effective global influence platforms to engage their audiences.
          </p>
        </div>
        {/* Accent elements */}
        <div className="absolute bottom-8 left-8 flex items-center gap-6 z-10">
          <span 
            className="text-white text-4xl font-thin tracking-[0.3em]"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              animation: isVisible ? 'number-glow 2s infinite alternate' : 'none'
            }}
          >
            01
          </span>
          <div 
            className={`h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-1000 ${
              isVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{
              transitionDelay: '1200ms',
              animation: isVisible ? 'line-pulse 2s infinite' : 'none'
            }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animation: `float-shape ${4 + i}s infinite ease-in-out ${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(255, 107, 53, 0.5); }
          100% { text-shadow: 0 0 40px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.4); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes wordReveal {
          0% { 
            opacity: 0; 
            transform: translateY(30px) rotateX(-90deg); 
            filter: blur(10px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) rotateX(0deg); 
            filter: blur(0px);
          }
        }
        
        @keyframes scanner {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes orb {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes beam {
          0%, 100% { opacity: 0.2; transform: rotate(15deg) scaleY(1); }
          50% { opacity: 0.5; transform: rotate(25deg) scaleY(1.2); }
        }
        
        @keyframes grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes morph {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1deg); }
        }
        
        @keyframes rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes overlay-shift {
          0%, 100% { background: linear-gradient(45deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.4), rgba(244, 114, 182, 0.6)); }
          50% { background: linear-gradient(225deg, rgba(244, 114, 182, 0.6), rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.6)); }
        }
        
        @keyframes rotate-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-line {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(244, 114, 182, 0.8), 0 0 60px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes light-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes number-glow {
          0% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          100% { text-shadow: 0 0 40px rgba(63, 169, 245, 0.8), 0 0 60px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes line-pulse {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          50% { opacity: 0.7; transform: scaleX(1.1); }
        }
        
        @keyframes float-shape {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes hologram {
          0%, 100% { transform: translateX(-100%) skewX(45deg); opacity: 0; }
          50% { transform: translateX(100%) skewX(45deg); opacity: 0.3; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default BrandStory;