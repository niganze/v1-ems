import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const coverImg = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80';
const mainImg = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80';
const gallery = [
  {
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80',
    text: 'Stage and Venue Branding',
  },
  {
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    text: 'Filming & Live Feed',
  },
  {
    img: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80',
    text: 'Hybrid Production',
  },
  {
    img: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=600&q=80',
    text: 'Sound, Lighting & LED Screens',
  },
];

const services = [
  'Concept Development',
  'Hybrid Production',
  'Filming & Live Feed',
  'Stage and Venue Branding',
  'Provision of Sound, Lighting & LED Screens',
  'Campaign Launch and Activation',
];

export default function SingleWork() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  // Auto-play modal carousel
  useEffect(() => {
    if (!modalOpen) return;
    const timer = setInterval(() => {
      setModalIdx(idx => (idx + 1) % gallery.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [modalOpen]);

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-4 py-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cover Image */}
      <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img src={coverImg} alt="cover" className="w-full h-64 md:h-96 object-cover object-center" />
      </div>
      {/* Title, Year, Location, Services */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mb-12 items-start">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">MoMotima Campaign Launch</h1>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg text-cyan-400 font-bold">2022</span>
            <span className="text-white/80 text-base">MTN Headquarters, Nyarutarama</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {services.map(s => (
              <span key={s} className="bg-cyan-400/10 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold border border-cyan-400/30">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-cyan-400/30 bg-black/20 w-full max-w-xs">
            <img src={mainImg} alt="main event" className="object-cover w-full h-64" />
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="w-full max-w-5xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Event Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6">
          {gallery.map((g, idx) => (
            <motion.div
              key={g.img}
              className={`relative rounded-xl overflow-hidden shadow-xl cursor-pointer group bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900
                ${idx === 0 ? 'row-span-2 col-span-1 md:col-span-2 md:row-span-2' : ''}
                ${idx === 1 ? 'col-span-1 row-span-1' : ''}
                ${idx === 2 ? 'col-span-1 row-span-1 md:col-span-1 md:row-span-2' : ''}
                ${idx === 3 ? 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' : ''}
              `}
              whileHover={{ scale: 1.04, rotate: -2 }}
              onClick={() => { setModalIdx(idx); setModalOpen(true); }}
              style={{ minHeight: 120 }}
            >
              <img src={g.img} alt={g.text} className="object-cover w-full h-full group-hover:opacity-80 transition duration-300" />
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-black/70 text-cyan-300 text-center py-2 text-base font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                initial={false}
                animate={{ y: 0 }}
              >
                {g.text}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Modal for gallery */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl shadow-2xl p-4 flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={gallery[modalIdx].img} alt={gallery[modalIdx].text} className="w-[80vw] max-w-2xl h-[60vh] object-cover rounded-xl mb-4" />
              <div className="text-cyan-300 text-lg font-semibold mb-2">{gallery[modalIdx].text}</div>
              <button
                className="mt-2 px-6 py-2 rounded bg-cyan-400 text-white font-bold hover:bg-cyan-500 transition"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
} 