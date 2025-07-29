import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import news1 from '../assets/news1.jpg';
import news2 from '../assets/news2.jpg';
import news3 from '../assets/new3.jpg';
import news4 from '../assets/news4.jpg';
import news5 from '../assets/news5.webp';
import React from 'react';

const categories = [
  'All',
  'Awards',
  'Hybrid Events',
  'Partnerships',
  'Sustainability',
  'Product Launch',
];

const news = [
  {
    img: news1,
    title: 'EMS Wins Best Event Production Award',
    date: '2024-05-10',
    desc: 'Event & Media Service Ltd. was honored with the Best Event Production Award at the Kigali Events Gala for outstanding creativity and execution.',
    category: 'Awards',
  },
  {
    img: news2,
    title: 'Hybrid Events: The Future of Gatherings',
    date: '2024-04-22',
    desc: 'Discover how EMS is leading the way in hybrid event solutions, blending in-person and virtual experiences for maximum impact.',
    category: 'Hybrid Events',
  },
  {
    img: news3,
    title: 'EMS Partners with Global Tech Conference',
    date: '2024-03-15',
    desc: 'EMS provided full event management and media coverage for the Global Tech Conference, hosting over 2,000 attendees.',
    category: 'Partnerships',
  },
  {
    img: news4,
    title: 'Sustainable Event Practices at EMS',
    date: '2024-02-28',
    desc: 'Learn how EMS is implementing sustainable practices in event production, from eco-friendly materials to digital solutions.',
    category: 'Sustainability',
  },
  {
    img: news5,
    title: 'Behind the Scenes: Major Product Launch',
    date: '2024-01-10',
    desc: 'A look at how EMS brought a major product launch to life with creative design, live streaming, and flawless logistics.',
    category: 'Product Launch',
  },
];

export default function News() {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState('All');
  const filteredNews = selected === 'All' ? news : news.filter(n => n.category === selected);
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-4 py-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl w-full mx-auto text-center mb-12">
        <h2 className="uppercase tracking-widest text-emsWhite/80 text-lg font-semibold mb-2">Latest News</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-emsWhite mb-2">News & Updates</h1>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8" />
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-6 py-2 rounded border-2 transition-all duration-200 font-semibold text-lg ${selected === cat ? 'border-cyan-400 text-cyan-400 bg-white/5' : 'border-transparent text-emsWhite/80 hover:text-cyan-400'}`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {filteredNews.map((item, idx) => (
          <motion.div
            key={item.title}
            className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl group cursor-pointer"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ opacity: 0.85 }}
            onClick={() => navigate('/singlenew')}
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img src={item.img} alt={item.title} className="object-cover w-full h-full group-hover:opacity-80 transition-opacity duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{item.title}</h3>
              <span className="text-xs text-emsWhite/60 mb-2">{item.date}</span>
              <p className="text-emsWhite/80 text-base mb-2">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 