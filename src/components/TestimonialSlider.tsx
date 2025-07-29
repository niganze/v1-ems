import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'We write to acknowledge the satisfactory services provided by Events & Media Group during the 4th edition of the African Women Conference held at the Marriot....',
    name: 'AWC',
    company: 'Africa Women Conference',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz2aioOOvpRATVXlGSXrNPsa2B6Yh1YBe6w&s',
  },
  {
    quote: 'The great experience we had working with Event & Media Service gives me the confidence to recommend the company to others looking to run a hybrid event.',
    name: 'DA',
    company: 'Delivery Associates',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz2aioOOvpRATVXlGSXrNPsa2B6Yh1YBe6w&s',
  },
  {
    quote: 'I, Laurent Da Dalto, CEO of MIMBUS, would like to thank the company and especially Mr Moses Ng\'ang\'a for his professionalism and dedication.',
    name: 'MIMBUS',
    company: 'Hp',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz2aioOOvpRATVXlGSXrNPsa2B6Yh1YBe6w&s',
  },
  {
    quote: 'Events & Media Service exceeded our expectations. The team was creative, responsive, and made our event a huge success.',
    name: 'Jane Doe',
    company: 'Acme Corp',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz2aioOOvpRATVXlGSXrNPsa2B6Yh1YBe6w&s',
  },
  {
    quote: 'Professional, reliable, and innovative. We will definitely work with them again!',
    name: 'John Smith',
    company: 'Tech Innovators',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKHWGjqHZ9leyP7Rhtvxs7PIOklWmr8BMKg&s',
  },
  {
    quote: 'Their attention to detail and passion for events is unmatched. Highly recommended!',
    name: 'Mary Johnson',
    company: 'Eventful',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKHWGjqHZ9leyP7Rhtvxs7PIOklWmr8BMKg&s',
  },
];

const getVisible = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
  }
  return 3;
};

const TestimonialSlider: React.FC = () => {
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(getVisible());

  useEffect(() => {
    const handleResize = () => setVisible(getVisible());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart((prev) => (prev + 1) % (testimonials.length - visible + 1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [start, visible]);

  const canPrev = start > 0;
  const canNext = start + visible < testimonials.length;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <button
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-emsPurple to-emsPink text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-white shadow-lg hover:from-emsPink hover:to-emsOrange transition-all duration-300 ${!canPrev && 'opacity-30 pointer-events-none'}`}
        onClick={() => setStart(s => Math.max(0, s - 1))}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="flex overflow-hidden gap-8 px-16">
        {testimonials.slice(start, start + visible).map((t, idx) => (
          <motion.div
            key={t.name + t.company}
            className="flex-1 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl shadow-lg group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-8 min-h-[320px] border border-emsWhite/10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.04, y: -8 }}
          >
            <blockquote className="italic text-lg text-emsWhite/90 mb-8 flex-1">“{t.quote}”</blockquote>
            <div className="flex items-center gap-4 mt-4">
              <img src={t.logo} alt={t.company} className="w-14 h-14 rounded bg-white border border-emsWhite/20" />
              <div>
                <div className="font-bold text-emsWhite text-lg">{t.name}</div>
                <div className="text-emsWhite/70 text-base">{t.company}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-emsPurple to-emsPink text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-white shadow-lg hover:from-emsPink hover:to-emsOrange transition-all duration-300 ${!canNext && 'opacity-30 pointer-events-none'}`}
        onClick={() => setStart(s => Math.min(testimonials.length - visible, s + 1))}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default TestimonialSlider; 