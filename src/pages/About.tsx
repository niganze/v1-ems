import { useEffect, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Creative Director & Founder",
    bio: "Visionary leader with 15+ years in event management and digital innovation. Passionate about creating unforgettable experiences that blend technology with human connection.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    skills: ["Strategic Planning", "Creative Direction", "Team Leadership", "Innovation"]
  },
  {
    name: "Marcus Johnson",
    role: "Technical Director",
    bio: "Tech wizard who brings digital magic to life. Specializes in immersive experiences, AR/VR integration, and cutting-edge event technology.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    skills: ["AR/VR Technology", "Digital Integration", "Technical Innovation", "System Architecture"]
  },
  {
    name: "Elena Rodriguez",
    role: "Design & Brand Specialist",
    bio: "Creative genius who transforms concepts into stunning visual experiences. Expert in branding, spatial design, and creating memorable visual narratives.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    skills: ["Visual Design", "Brand Strategy", "Spatial Design", "Creative Direction"]
  }
];

const stats = [
  { number: "500+", label: "Events Executed", description: "From intimate gatherings to large-scale productions" },
  { number: "50+", label: "Happy Clients", description: "Trusted by leading brands and organizations" },
  { number: "98%", label: "Client Satisfaction", description: "Consistently exceeding expectations" },
  { number: "24/7", label: "Support Available", description: "Always here when you need us" }
];

const slidingTexts = [
  "Innovation",
  "Creativity", 
  "Excellence",
  "Passion",
  "Technology",
  "Experience"
];

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);
  const SLIDE_INTERVAL = 30; // ms
  const SLIDE_STEP = 1; // px per interval
  const CARD_WIDTH = 340;
  const CARD_HEIGHT = 420;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      // Calculate which section is active based on scroll position
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          setActiveSection(index);
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Sliding text animation with slower timing
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % slidingTexts.length);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(textInterval);
    };
  }, []);

  // Endless sliding effect for the 3D card slider
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderOffset((prev) => prev + SLIDE_STEP);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Interactive Cursor Trail */}
      <div 
        className="fixed pointer-events-none z-50 w-4 h-4 bg-cyan-400 rounded-full mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${activeSection >= 0 ? 1 : 0})`
        }}
      />

      {/* Hero Section */}
      <section className="scroll-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-pink-900/20"></div>
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse floating-orb"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000 floating-orb"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500 floating-orb"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-1500 floating-orb"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Animated Title with Letter-by-Letter Effect */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.1s' }}>A</span>
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.2s' }}>b</span>
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.3s' }}>o</span>
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.4s' }}>u</span>
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.5s' }}>t</span>
              <span className="inline-block animate-slide-in-up ml-8" style={{ animationDelay: '0.6s' }}>E</span>
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.7s' }}>M</span>
              <span className="inline-block animate-slide-in-up" style={{ animationDelay: '0.8s' }}>S</span>
            </h1>
            <div className="h-1 w-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-expand-width mx-auto"></div>
          </div>

          {/* Enhanced Sliding Text Effect with Curtain Animation and Continuous Slide */}
          <div className="mb-8 h-20 flex items-center justify-center overflow-hidden relative">
            <div className="text-2xl md:text-4xl font-bold text-cyan-400 relative">
              {slidingTexts.map((text, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-in-out ${
                    index === currentTextIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <span className={`relative z-10 ${index === currentTextIndex ? 'animate-slide-left-to-right' : ''}`}>{text}</span>
                  
                  {/* Left Curtain */}
                  <div 
                    className={`absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black via-gray-900 to-transparent transition-transform duration-2000 ease-in-out ${
                      index === currentTextIndex ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                  ></div>
                  
                  {/* Right Curtain */}
                  <div 
                    className={`absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black via-gray-900 to-transparent transition-transform duration-2000 ease-in-out ${
                      index === currentTextIndex ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                  ></div>
                  
                  {/* Top Curtain */}
                  <div 
                    className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black via-gray-900 to-transparent transition-transform duration-2000 ease-in-out ${
                      index === currentTextIndex ? 'translate-y-0' : '-translate-y-full'
                    }`}
                    style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                  ></div>
                  
                  {/* Bottom Curtain */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-gray-900 to-transparent transition-transform duration-2000 ease-in-out ${
                      index === currentTextIndex ? 'translate-y-0' : 'translate-y-full'
                    }`}
                    style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                  ></div>
                </div>
              ))}
            </div>
            
            {/* Decorative Stage Lights */}
            <div className="absolute -top-4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute -top-4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-4 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '1s' }}>
            We are a passionate team of creative professionals dedicated to transforming ordinary events into extraordinary experiences. 
            Our mission is to blend cutting-edge technology with human connection to create moments that inspire and memories that last.
          </p>
          
          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-scroll-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="scroll-section relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${activeSection >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative">
                Our Mission
                <span className="absolute -top-2 -right-2 text-2xl animate-spin-slow">✨</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light">
                To revolutionize the event industry by creating immersive, technology-driven experiences that connect people in meaningful ways. 
                We believe every event should tell a story and every story should be unforgettable.
              </p>
              <div className="space-y-4">
                {[
                  { color: 'cyan', text: 'Innovation at the core' },
                  { color: 'purple', text: 'Human connection first' },
                  { color: 'pink', text: 'Excellence in execution' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className={`w-3 h-3 bg-${item.color}-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300`}></div>
                    <span className="text-lg font-medium group-hover:text-cyan-400 transition-colors duration-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${activeSection >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500">
                  <h3 className="text-3xl font-black mb-6 text-cyan-400 relative">
                    Our Vision
                    <span className="absolute -top-1 -right-1 text-lg animate-pulse">🌟</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    To be the leading force in creating next-generation event experiences that seamlessly blend 
                    digital innovation with authentic human connection, setting new standards for what's possible in event management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="scroll-section relative py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative">
              Our Impact
              <span className="absolute -top-2 -right-2 text-2xl animate-bounce">📊</span>
            </h2>
          </div>
          <div className="relative flex items-center justify-center">
            {/* 3D Card Slider */}
            <div className="flex items-center justify-center w-full h-[440px] relative overflow-visible" style={{ perspective: '1200px' }}>
              {stats.map((stat, index) => {
                // Calculate the horizontal position for endless loop
                const totalWidth = CARD_WIDTH * stats.length;
                // Center the active card
                let x = (index * CARD_WIDTH) - (sliderOffset % totalWidth) - (CARD_WIDTH * Math.floor(stats.length / 2));
                // Wrap around for endless effect
                if (x < -CARD_WIDTH * Math.floor(stats.length / 2)) x += totalWidth;
                if (x > CARD_WIDTH * Math.floor(stats.length / 2)) x -= totalWidth;
                // 3D transform: center card pops, sides tilt and scale
                const center = Math.round((sliderOffset % totalWidth) / CARD_WIDTH);
                const offset = index - center;
                const absOffset = Math.abs(offset);
                const isActive = Math.abs(x) < CARD_WIDTH / 2;
                const transform = `
                  translateX(${x}px)
                  scale(${isActive ? 1.18 : 0.9 - absOffset * 0.05})
                  rotateY(${offset * -40}deg)
                  translateZ(${isActive ? 120 : 0}px)
                `;
                const zIndex = 10 - absOffset;
                return (
                  <div
                    key={index}
                    className={`absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out cursor-pointer select-none ${isActive ? 'shadow-2xl' : 'shadow-lg'} ${isActive ? 'ring-4 ring-cyan-400/40' : ''}`}
                    style={{
                      transform,
                      zIndex,
                      opacity: absOffset > 2 ? 0 : 1,
                      pointerEvents: absOffset > 2 ? 'none' : 'auto',
                      transitionProperty: 'transform, opacity, box-shadow',
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                    }}
                  >
                    <div className="relative bg-gray-900/70 backdrop-blur-md rounded-2xl p-10 border border-cyan-500/30 flex flex-col items-center justify-center h-full hover:scale-105 transition-transform duration-300">
                      <div className="text-6xl font-black text-cyan-400 mb-4 animate-count-up">{stat.number}</div>
                      <div className="text-2xl font-bold text-white mb-3 text-center">{stat.label}</div>
                      <div className="text-lg text-gray-400 font-light text-center">{stat.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
         
        </div>
      </section>

      {/* Enhanced Team Section with Orbital Motion and Door Animation */}
      <section className="scroll-section relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative">
              Meet Our Team
              <span className="absolute -top-2 -right-2 text-2xl animate-pulse">👥</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              The passionate individuals behind every extraordinary event experience
            </p>
          </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500 relative">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 text-center">{member.name}</h3>
                    <p className="text-cyan-400 font-bold mb-4 text-center">{member.role}</p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light text-center">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300 cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="scroll-section relative py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative">
              Our Values
              <span className="absolute -top-2 -right-2 text-2xl animate-spin-slow">💎</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Pushing boundaries and embracing new technologies to create cutting-edge experiences",
                icon: "🚀",
                color: "cyan"
              },
              {
                title: "Excellence",
                description: "Maintaining the highest standards in every detail, from concept to execution",
                icon: "⭐",
                color: "purple"
              },
              {
                title: "Connection",
                description: "Fostering meaningful human connections through thoughtfully designed experiences",
                icon: "🤝",
                color: "pink"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-1000 delay-${index * 200} group ${
                  activeSection >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-${value.color}-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500 hover:scale-105">
                    <div className="text-6xl mb-6 animate-bounce group-hover:animate-spin-slow transition-all duration-500">{value.icon}</div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed font-light">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="scroll-section relative py-20 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className={`transition-all duration-1000 ${activeSection >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative">
              Ready to Create Something Amazing?
              <span className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
              Let's collaborate to bring your vision to life with an experience that will leave your audience inspired and amazed.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-black rounded-full text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden group">
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-width {
          0% {
            width: 0;
          }
          100% {
            width: 200px;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-glow {
          0%, 100% {
            opacity: 0;
            transform: translateY(-10px);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes count-up {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes slide-text {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes curtain-open {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes curtain-close {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes stage-light {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes slide-left-to-right {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            transform: translateX(-50%);
            opacity: 0.5;
          }
          50% {
            transform: translateX(0%);
            opacity: 1;
          }
          80% {
            transform: translateX(50%);
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .animate-expand-width {
          animation: expand-width 1.5s ease-out forwards;
          animation-delay: 0.8s;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-scroll-glow {
          animation: scroll-glow 2s ease-in-out infinite;
        }

        .animate-count-up {
          animation: count-up 1s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-slide-text {
          animation: slide-text 5s ease-in-out infinite;
        }

        .animate-curtain-open {
          animation: curtain-open 2s ease-in-out forwards;
        }

        .animate-curtain-close {
          animation: curtain-close 2s ease-in-out forwards;
        }

        .animate-stage-light {
          animation: stage-light 3s ease-in-out infinite;
        }

        .animate-slide-left-to-right {
          animation: slide-left-to-right 4s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .rotate-y-0 {
          transform: rotateY(0deg);
        }

        .rotate-y-90 {
          transform: rotateY(90deg);
        }

        .-rotate-y-90 {
          transform: rotateY(-90deg);
        }

        .origin-left {
          transform-origin: left center;
        }

        .origin-right {
          transform-origin: right center;
        }

        .floating-orb {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .scroll-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .scroll-section:nth-child(even) {
          background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(17,24,39,0.9) 100%);
        }

        .scroll-section:nth-child(odd) {
          background: linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(0,0,0,0.9) 100%);
        }

        .card-slider::-webkit-scrollbar { display: none; }
        .card-slider { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
} 