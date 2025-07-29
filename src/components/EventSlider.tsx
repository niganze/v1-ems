import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const eventImages = [
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=400&q=80',
];

const EventSlider: React.FC = () => {
  const [start, setStart] = useState(0);
  const visible = 4;
  const canPrev = start > 0;
  const canNext = start + visible < eventImages.length;

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8">
      <button
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-emsPurple to-emsPink text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-white shadow-lg hover:from-emsPink hover:to-emsOrange transition-all duration-300 ${!canPrev && 'opacity-30 pointer-events-none'}`}
        onClick={() => setStart(s => Math.max(0, s - 1))}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="flex overflow-hidden gap-6 px-16">
        {eventImages.slice(start, start + visible).map((img, idx) => (
          <motion.div 
            key={img} 
            className="min-w-[200px] h-72 rounded-2xl overflow-hidden shadow-2xl bg-white relative group"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <img src={img} alt={`Event ${start + idx + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="font-bold text-lg">Event {start + idx + 1}</h4>
              <p className="text-sm">Amazing memories created</p>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-emsPurple to-emsPink text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-white shadow-lg hover:from-emsPink hover:to-emsOrange transition-all duration-300 ${!canNext && 'opacity-30 pointer-events-none'}`}
        onClick={() => setStart(s => Math.min(eventImages.length - visible, s + 1))}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default EventSlider; 