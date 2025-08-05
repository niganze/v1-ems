import React, { useState, useEffect } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  projectDetails: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectDetails: ''
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const animationInterval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 360);
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationInterval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <section className="min-h-screen w-full relative flex flex-col justify-center items-center px-4 py-32 overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(
              ${45 + animationOffset * 0.5}deg, 
              rgba(243, 243, 243, 0.75) 0%, 
              rgba(243, 243, 243, 0.85) 50%, 
              rgba(243, 243, 243, 0.75) 100%
            ),
            url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Fc-pYOJ1Hw1TzypY1MB95zIxXhnGewIA_w&s")
          `,
          backgroundSize: `${110 + Math.sin(animationOffset * 0.02) * 5}% ${110 + Math.cos(animationOffset * 0.02) * 5}%`,
          backgroundPosition: `${50 + mousePosition.x * 0.02}% ${50 + mousePosition.y * 0.02}%`,
          backgroundRepeat: 'no-repeat',
          transform: `scale(${1 + Math.sin(animationOffset * 0.01) * 0.02})`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-60"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              transform: `translateY(${Math.sin(animationOffset * 0.02 + i) * 20}px) translateX(${Math.cos(animationOffset * 0.015 + i) * 15}px)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        
        {[...Array(6)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-400 opacity-70 text-xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 4) * 15}%`,
              transform: `rotate(${animationOffset + i * 60}deg) scale(${0.8 + Math.sin(animationOffset * 0.03 + i) * 0.3})`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Name */}
        <div 
          className="flex flex-col md:flex-row items-center gap-4 w-full transform transition-all duration-700 hover:scale-105"
          style={{
            transform: `translateY(${Math.sin(animationOffset * 0.01) * 5}px)`,
          }}
        >
          <label className="flex-1 text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight text-left bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            HELLO,<br />MY NAME IS
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name here"
            className="flex-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-orange-500 outline-none text-xl md:text-2xl text-gray-700 placeholder-gray-400 text-right py-2 transition-all duration-300 w-full hover:border-orange-300 focus:transform focus:scale-105"
            required
          />
        </div>
        
        {/* Email */}
        <div 
          className="flex flex-col md:flex-row items-center gap-4 w-full transform transition-all duration-700 hover:scale-105"
          style={{
            transform: `translateY(${Math.sin(animationOffset * 0.012 + 1) * 5}px)`,
          }}
        >
          <label className="flex-1 text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight text-left bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            HERE IS MY EMAIL
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email here"
            className="flex-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-orange-500 outline-none text-xl md:text-2xl text-gray-700 placeholder-gray-400 text-right py-2 transition-all duration-300 w-full hover:border-orange-300 focus:transform focus:scale-105"
            required
          />
        </div>
        
        {/* Project Details */}
        <div 
          className="flex flex-col md:flex-row items-center gap-4 w-full transform transition-all duration-700 hover:scale-105"
          style={{
            transform: `translateY(${Math.sin(animationOffset * 0.014 + 2) * 5}px)`,
          }}
        >
          <label className="flex-1 text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight text-left bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            I'M LOOKING FOR
          </label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            placeholder="Describe your event needs"
            className="flex-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-orange-500 outline-none text-xl md:text-2xl text-gray-700 placeholder-gray-400 text-right py-2 transition-all duration-300 w-full resize-none hover:border-orange-300 focus:transform focus:scale-105"
            rows={1}
            required
          />
        </div>
        
        {/* Send Button */}
        <div 
          className="flex justify-center mt-8"
          style={{
            transform: `translateY(${Math.sin(animationOffset * 0.016 + 3) * 8}px)`,
          }}
        >
          <button
            type="button"
            onClick={handleSubmit}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 relative overflow-hidden group hover:scale-110 active:scale-95"
            style={{
              transform: `rotate(${Math.sin(animationOffset * 0.02) * 5}deg)`,
              boxShadow: `0 20px 40px rgba(255, 179, 71, ${0.3 + Math.sin(animationOffset * 0.03) * 0.1})`,
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></span>
            <span 
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              style={{
                textShadow: `0 2px 4px rgba(0,0,0,${0.2 + Math.sin(animationOffset * 0.04) * 0.1})`,
              }}
            >
              Send
            </span>
            
            {/* Pulsing ring effect */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-white opacity-60"
              style={{
                transform: `scale(${1 + Math.sin(animationOffset * 0.05) * 0.1})`,
              }}
            />
          </button>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="w-full max-w-6xl  overflow-hidden shadow-xl mb-12 relative z-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.541021476789!2d30.06806697311611!3d-1.935939336677373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6a6ee631c09%3A0xb5b16bf62a3516c8!2sKG%20684%20St%2C%20Kigali!5e0!3m2!1sen!2srw!4v1752510620000!5m2!1sen!2srw"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}