import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const eventBackgrounds = [
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop",
    title: "Concert Stage"
  },
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
    title: "Corporate Event"
  },
  {
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop",
    title: "Wedding Reception"
  },
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop",
    title: "Conference"
  },
  {
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&h=1080&fit=crop",
    title: "Festival"
  }
];

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [particles, setParticles] = useState([]);
  const SLIDE_INTERVAL = 30;
  const SLIDE_STEP = 1;
  const CARD_WIDTH = 340;
  const CARD_HEIGHT = 420;

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          setActiveSection(index);
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Background rotation
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % eventBackgrounds.length);
    }, 8000);

    // Sliding text animation
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % slidingTexts.length);
    }, 5000);

    // Particle animation
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
      })));
    }, 50);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(textInterval);
      clearInterval(bgInterval);
      clearInterval(particleInterval);
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
      {/* Animated Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Trail */}
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mix-blend-screen transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${activeSection >= 0 ? 1 : 0}) rotate(${mousePosition.x * 0.1}deg)`,
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)'
        }}
      />

      {/* Enhanced Cursor Ripple Effect */}
      <div 
        className="fixed pointer-events-none z-40 border-2 border-cyan-400/30 rounded-full animate-ping"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: '40px',
          height: '40px'
        }}
      />

      {/* Hero Section with Dynamic Background */}
      <section className="scroll-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Event Background Images */}
        <div className="absolute inset-0 z-0">
          {eventBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                index === currentBgIndex ? 'opacity-30 scale-100' : 'opacity-0 scale-110'
              }`}
            >
              <img 
                src={bg.url} 
                alt={bg.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
            </div>
          ))}
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-bg"></div>
        </div>
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse floating-orb hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000 floating-orb hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500 floating-orb hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-1500 floating-orb hover:scale-150 transition-transform duration-500"></div>
        </div>

        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          {/* Animated Title with Letter-by-Letter Effect */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient hover:scale-105 transition-transform duration-500">
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.1s' }}>A</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.2s' }}>b</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.3s' }}>o</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.4s' }}>u</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.5s' }}>t</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce ml-8" style={{ animationDelay: '0.6s' }}>E</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.7s' }}>M</span>
              <span className="inline-block animate-slide-in-up hover:animate-bounce" style={{ animationDelay: '0.8s' }}>S</span>
            </h1>
            <div className="h-1 w-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-expand-width mx-auto"></div>
          </div>

          {/* Enhanced Sliding Text Effect */}
          <div className="mb-8 h-20 flex items-center justify-center overflow-hidden relative">
            <div className="text-2xl md:text-4xl font-bold text-cyan-400 relative">
              {slidingTexts.map((text, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-in-out ${
                    index === currentTextIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <span className={`relative z-10 hover:text-purple-400 transition-colors duration-300 ${index === currentTextIndex ? 'animate-slide-left-to-right' : ''}`}>{text}</span>
                  
                  {/* Animated Curtains */}
                  <div 
                    className={`absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black via-gray-900 to-transparent transition-transform duration-2000 ease-in-out ${
                      index === currentTextIndex ? 'translate-x-0' : '-translate-x-full'
                    }`}
                  ></div>
                  
                  <div 
                    className={`absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black via-gray-900 to-transparent transition-transform duration-2000 ease-in-out ${
                      index === currentTextIndex ? 'translate-x-0' : 'translate-x-full'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            
            {/* Decorative Stage Lights */}
            <div className="absolute -top-4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60 hover:scale-150 transition-transform duration-300"></div>
            <div className="absolute -top-4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60 hover:scale-150 transition-transform duration-300" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-4 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60 hover:scale-150 transition-transform duration-300" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up hover:text-gray-100 transition-colors duration-500" style={{ animationDelay: '1s' }}>
            We are a passionate team of creative professionals dedicated to transforming ordinary events into extraordinary experiences. 
            Our mission is to blend cutting-edge technology with human connection to create moments that inspire and memories that last.
          </p>
          
          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-125 transition-transform duration-300 cursor-pointer">
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center relative overflow-hidden hover:border-purple-400 transition-colors duration-300">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse hover:bg-purple-400 transition-colors duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-scroll-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section with Event Background */}
      <section className="scroll-section relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        {/* Background Event Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop"
            alt="Corporate Event Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 hover:scale-105 ${activeSection >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative hover:from-purple-400 hover:to-pink-400 transition-all duration-500">
                Our Mission
                <span className="absolute -top-2 -right-2 text-2xl animate-spin-slow hover:text-pink-400 transition-colors duration-300">✨</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light hover:text-gray-100 transition-colors duration-500">
                To revolutionize the event industry by creating immersive, technology-driven experiences that connect people in meaningful ways. 
                We believe every event should tell a story and every story should be unforgettable.
              </p>
              <div className="space-y-4">
                {[
                  { color: 'cyan', text: 'Innovation at the core', icon: '🚀' },
                  { color: 'purple', text: 'Human connection first', icon: '❤️' },
                  { color: 'pink', text: 'Excellence in execution', icon: '⭐' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group hover:bg-gray-800/30 rounded-lg p-3 transition-all duration-300 cursor-pointer">
                    <span className="text-xl group-hover:animate-bounce">{item.icon}</span>
                    <div className={`w-3 h-3 bg-${item.color}-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-${item.color}-400/50`}></div>
                    <span className="text-lg font-medium group-hover:text-cyan-400 transition-colors duration-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${activeSection >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 group-hover:border-cyan-400/60 group-hover:bg-gray-800/60 transition-all duration-500 hover:scale-105 cursor-pointer">
                  <h3 className="text-3xl font-black mb-6 text-cyan-400 relative group-hover:text-purple-400 transition-colors duration-300">
                    Our Vision
                    <span className="absolute -top-1 -right-1 text-lg animate-pulse group-hover:animate-bounce">🌟</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light group-hover:text-gray-100 transition-colors duration-300">
                    To be the leading force in creating next-generation event experiences that seamlessly blend 
                    digital innovation with authentic human connection, setting new standards for what's possible in event management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with Concert Background */}
      <section className="scroll-section relative py-20 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        {/* Background Concert Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop"
            alt="Concert Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative hover:from-purple-400 hover:to-pink-400 transition-all duration-500 hover:scale-105">
              Our Impact
              <span className="absolute -top-2 -right-2 text-2xl animate-bounce hover:animate-spin transition-all duration-300">📊</span>
            </h2>
          </div>
          <div className="relative flex items-center justify-center">
            {/* Enhanced 3D Card Slider */}
            <div className="flex items-center justify-center w-full h-[440px] relative overflow-visible" style={{ perspective: '1200px' }}>
              {stats.map((stat, index) => {
                const totalWidth = CARD_WIDTH * stats.length;
                let x = (index * CARD_WIDTH) - (sliderOffset % totalWidth) - (CARD_WIDTH * Math.floor(stats.length / 2));
                if (x < -CARD_WIDTH * Math.floor(stats.length / 2)) x += totalWidth;
                if (x > CARD_WIDTH * Math.floor(stats.length / 2)) x -= totalWidth;
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
                    className={`absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out cursor-pointer select-none group ${isActive ? 'shadow-2xl' : 'shadow-lg'} ${isActive ? 'ring-4 ring-cyan-400/40' : ''}`}
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
                    <div className="relative bg-gray-900/70 backdrop-blur-md rounded-2xl p-10 border border-cyan-500/30 flex flex-col items-center justify-center h-full hover:scale-110 hover:bg-gray-800/80 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20">
                      <div className="text-6xl font-black text-cyan-400 mb-4 animate-count-up group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300">{stat.number}</div>
                      <div className="text-2xl font-bold text-white mb-3 text-center group-hover:text-cyan-400 transition-colors duration-300">{stat.label}</div>
                      <div className="text-lg text-gray-400 font-light text-center group-hover:text-gray-200 transition-colors duration-300">{stat.description}</div>
                      
                      {/* Hover Particles Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                        <div className="absolute top-4 right-4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-6 left-6 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section with Wedding Background */}
      <section className="scroll-section relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        {/* Background Wedding Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop"
            alt="Wedding Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative hover:from-purple-400 hover:to-pink-400 transition-all duration-500 hover:scale-105">
              Meet Our Team
              <span className="absolute -top-2 -right-2 text-2xl animate-pulse hover:animate-bounce transition-all duration-300">👥</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light hover:text-gray-100 transition-colors duration-500">
              The passionate individuals behind every extraordinary event experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 group hover:shadow-2xl hover:shadow-cyan-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-400/20 animate-pulse"></div>
                </div>
                
                <div className="relative p-6">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500 relative group-hover:scale-110">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Hover Ring Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-400/0 group-hover:border-purple-400/60 animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 text-center hover:scale-105">{member.name}</h3>
                  <p className="text-cyan-400 font-bold mb-4 text-center group-hover:text-purple-400 transition-colors duration-300">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light text-center group-hover:text-gray-100 transition-colors duration-300">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 hover:scale-110 hover:border-purple-400/60 hover:text-purple-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/25"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Floating Social Icons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-300">
                      <span className="text-white text-xs">💼</span>
                    </div>
                  </div>
                  
                  {/* Hover Sparkle Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-8 left-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute top-16 right-12 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-20 left-12 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-12 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Values Section with Conference Background */}
      <section className="scroll-section relative py-20 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        {/* Background Conference Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop"
            alt="Conference Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 border border-cyan-400/30 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-32 right-20 w-12 h-12 border border-purple-400/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-20 w-8 h-8 border border-pink-400/30 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative hover:from-purple-400 hover:to-pink-400 transition-all duration-500 hover:scale-105">
              Our Values
              <span className="absolute -top-2 -right-2 text-2xl animate-spin-slow hover:animate-bounce transition-all duration-300">💎</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Pushing boundaries and embracing new technologies to create cutting-edge experiences",
                icon: "🚀",
                color: "cyan",
                bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop"
              },
              {
                title: "Excellence",
                description: "Maintaining the highest standards in every detail, from concept to execution",
                icon: "⭐",
                color: "purple",
                bgImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop"
              },
              {
                title: "Connection",
                description: "Fostering meaningful human connections through thoughtfully designed experiences",
                icon: "🤝",
                color: "pink",
                bgImage: "https://images.unsplash.com/photo-1511795409834-432f7b6c90a1?w=600&h=400&fit=crop"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-1000 delay-${index * 200} group relative overflow-hidden ${
                  activeSection >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="relative">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl overflow-hidden">
                    <img src={value.bgImage} alt={value.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-r from-${value.color}-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:bg-gray-800/60 cursor-pointer">
                    {/* Animated Icon Container */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-${value.color}-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-${value.color}-500/40 group-hover:to-purple-500/40 transition-all duration-500 group-hover:scale-110`}>
                        <div className="text-6xl group-hover:animate-bounce transition-all duration-500">{value.icon}</div>
                      </div>
                      
                      {/* Orbiting Elements */}
                      <div className="absolute inset-0 animate-spin-slow group-hover:animate-spin">
                        <div className={`absolute top-0 left-1/2 w-2 h-2 bg-${value.color}-400 rounded-full transform -translate-x-1/2 opacity-60`}></div>
                        <div className={`absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 opacity-60`}></div>
                        <div className={`absolute left-0 top-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-y-1/2 opacity-60`}></div>
                        <div className={`absolute right-0 top-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2 opacity-60`}></div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed font-light group-hover:text-gray-100 transition-colors duration-300">{value.description}</p>
                    
                    {/* Progress Bar Animation */}
                    <div className="mt-6 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r from-${value.color}-400 to-purple-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}></div>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-4 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="absolute top-8 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-8 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute bottom-4 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Festival Background */}
      <section className="scroll-section relative py-20 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-pink-900/20 overflow-hidden">
        {/* Background Festival Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&h=1080&fit=crop"
            alt="Festival Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-cyan-400/20 rounded-full animate-pulse hover:border-cyan-400/60 transition-colors duration-500"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-purple-400/20 rotate-45 animate-spin-slow hover:border-purple-400/60 transition-colors duration-500"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-pink-400/20 animate-bounce hover:border-pink-400/60 transition-colors duration-500"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className={`transition-all duration-1000 ${activeSection >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative hover:from-purple-400 hover:to-pink-400 transition-all duration-500 hover:scale-105">
              Ready to Create Something Amazing?
              <span className="absolute -top-2 -right-2 text-2xl animate-pulse hover:animate-bounce transition-all duration-300">✨</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light hover:text-gray-100 transition-colors duration-500">
              Let's collaborate to bring your vision to life with an experience that will leave your audience inspired and amazed.
            </p>
            
            {/* Enhanced CTA Button */}
            <div className="relative inline-block">
              <Link to="/contact">
                <button className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-black rounded-full text-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/50 relative overflow-hidden group border-2 border-transparent hover:border-cyan-400/60">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">Start Your Project</span>
                  
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Orbiting Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </button>
              </Link>
              
              {/* Button Aura */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
            </div>
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

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
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
          animation: spin-slow 8s linear infinite;
        }

        .animate-slide-left-to-right {
          animation: slide-left-to-right 4s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .floating-orb {
          animation: float 6s ease-in-out infinite;
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .scroll-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .scroll-section:nth-child(even) {
          background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(17,24,39,0.95) 100%);
        }

        .scroll-section:nth-child(odd) {
          background: linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(0,0,0,0.95) 100%);
        }

        /* Enhanced Hover Effects */
        .hover-glow:hover {
          filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.8));
        }

        .hover-lift:hover {
          transform: translateY(-10px);
        }

        .hover-rotate:hover {
          transform: rotate(5deg) scale(1.05);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s ease;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }
      `}</style>
    </div>
  );
}