import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';

const services = [
  {
    image: service1,
    title: 'Event Planning',
    desc: 'Concept, logistics, and flawless execution for all event types.'
  },
  {
    image: service2,
    title: 'Media Coverage',
    desc: 'Photography, videography, and live streaming to capture every moment.'
  },
  {
    image: service3,
    title: 'Creative Design',
    desc: 'Branding, invitations, and digital assets tailored to your event.'
  },
  {
    image: service4,
    title: 'Entertainment',
    desc: 'Live music, DJs, and performers to make your event memorable.'
  },
  {
    image: service5,
    title: 'Catering',
    desc: 'Gourmet food and beverage services with customizable menus.'
  },
  {
    image: service6,
    title: 'Documentation',
    desc: 'Professional photography and videography services.'
  },
];

const visible = 3;

const ServiceSlider: React.FC = () => {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart((prev) => (prev + 1) % (services.length - visible + 1));
    }, 3500);
    return () => clearTimeout(timer);
  }, [start]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex gap-8 overflow-hidden px-2">
        {services.slice(start, start + visible).map((service, idx) => (
          <motion.div
            key={service.title}
            className="flex-1 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl shadow-lg group hover:shadow-2xl transition-all duration-300 flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
              <img src={service.image} alt={service.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-emsWhite mb-2 group-hover:text-emsPink transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-emsWhite/80 text-sm leading-relaxed flex-grow">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Dot navigation removed as requested */}
    </div>
  );
};

export default ServiceSlider; 