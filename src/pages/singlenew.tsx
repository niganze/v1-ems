import { motion } from 'framer-motion';
import news1 from '../assets/news1.jpg';
import news2 from '../assets/news2.jpg';
import news3 from '../assets/new3.jpg';
import news4 from '../assets/news4.jpg';
import news5 from '../assets/news5.webp';

const article = {
  cover: news1,
  title: 'EMS Wins Best Event Production Award',
  category: 'Awards',
  date: '2024-05-10',
  desc: 'Event & Media Service Ltd. was honored with the Best Event Production Award at the Kigali Events Gala for outstanding creativity and execution.',
  author: {
    name: 'Aline M.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'PR & Communications',
  },
  content: `EMS continues to set the standard for event production in Rwanda. At the recent Kigali Events Gala, EMS was recognized for its innovative approach, attention to detail, and ability to deliver seamless experiences for clients and guests alike. The award is a testament to the hard work and creativity of the entire EMS team.\n\nFrom hybrid events to large-scale conferences, EMS leverages the latest technology and a client-centered approach to ensure every event is a success. The company thanks its clients, partners, and team for their continued support and looks forward to even greater achievements in the future.`,
  gallery: [news1, news2, news3, news4, news5],
};

const related = [
  {
    img: news2,
    title: 'Hybrid Events: The Future of Gatherings',
    date: '2024-04-22',
    desc: 'Discover how EMS is leading the way in hybrid event solutions, blending in-person and virtual experiences for maximum impact.'
  },
  {
    img: news3,
    title: 'EMS Partners with Global Tech Conference',
    date: '2024-03-15',
    desc: 'EMS provided full event management and media coverage for the Global Tech Conference, hosting over 2,000 attendees.'
  },
  {
    img: news4,
    title: 'Sustainable Event Practices at EMS',
    date: '2024-02-28',
    desc: 'Learn how EMS is implementing sustainable practices in event production, from eco-friendly materials to digital solutions.'
  },
];

export default function SingleNew() {
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center bg-emsBlack px-4 py-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cover Image */}
      <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img src={article.cover} alt="cover" className="w-full h-64 md:h-96 object-cover object-center" />
      </div>
      {/* Title, Category, Date, Description */}
      <div className="w-full max-w-4xl mx-auto mb-8 px-2">
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <span className="bg-cyan-400/10 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold border border-cyan-400/30">{article.category}</span>
          <span className="text-xs text-emsWhite/60">{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{article.title}</h1>
        <p className="text-lg text-emsWhite/80 mb-4">{article.desc}</p>
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400" />
          <div>
            <div className="font-bold text-emsWhite text-base">{article.author.name}</div>
            <div className="text-emsWhite/70 text-sm">{article.author.role}</div>
          </div>
        </div>
        {/* Full Content */}
        <div className="text-emsWhite/90 text-base md:text-lg leading-relaxed whitespace-pre-line mb-10">
          {article.content}
        </div>
      </div>
      {/* Collage Gallery */}
      <div className="w-full max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6">
          {article.gallery.map((img, idx) => (
            <motion.div
              key={img}
              className={`relative rounded-xl overflow-hidden shadow-xl group bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900
                ${idx === 0 ? 'row-span-2 col-span-1 md:col-span-2 md:row-span-2' : ''}
                ${idx === 1 ? 'col-span-1 row-span-1' : ''}
                ${idx === 2 ? 'col-span-1 row-span-1 md:col-span-1 md:row-span-2' : ''}
                ${idx === 3 ? 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' : ''}
              `}
              whileHover={{ scale: 1.04, rotate: -2 }}
            >
              <img src={img} alt={article.title + ' gallery'} className="object-cover w-full h-full group-hover:opacity-80 transition duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Related News */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Related News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {related.map((item, idx) => (
            <motion.div
              key={item.title}
              className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl group"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className="relative w-full h-44 overflow-hidden">
                <img src={item.img} alt={item.title} className="object-cover w-full h-full group-hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">{item.title}</h3>
                <span className="text-xs text-emsWhite/60 mb-2">{item.date}</span>
                <p className="text-emsWhite/80 text-base mb-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 