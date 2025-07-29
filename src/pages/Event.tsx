import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeEvent1 from '../assets/Home_event1.jpg';
import HomeEvent2 from '../assets/Home_event2.jpg';
import HomeEvent3 from '../assets/Home_event3.jpg';
import Event1 from '../assets/event1.jpg';
import Event2 from '../assets/event2.jpg';
import Event3 from '../assets/event3.jpg';
import ExcitedEvent1 from '../assets/excited_event1.jpg';
import ExcitedEvent2 from '../assets/excited_event2.jpg';
import ExcitedEvent3 from '../assets/excited_event3.jpg';

const heroImages = [
  HomeEvent1, HomeEvent2, HomeEvent3, Event1, Event2, Event3, ExcitedEvent1, ExcitedEvent2, ExcitedEvent3
];

function HeroImageSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden py-36">
      <img
        src={heroImages[current]}
        alt="Event Hero"
        className="absolute inset-0 z-0 object-cover w-full h-full transition-all duration-700"
        style={{ filter: 'brightness(0.7)' }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-violet-900/80" />
      {/* Amazing Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <h1 className="mb-4 text-2xl font-extrabold text-center text-white md:text-3xl drop-shadow-lg animate-fade-in-up">
          Experience the Magic of Every Event
        </h1>
        <p className="max-w-2xl text-lg text-center delay-200 md:text-xl text-white/90 drop-shadow-md animate-fade-in-up">
          Discover unforgettable moments, connect with inspiring people, and celebrate life’s best occasions with EMS Rwanda. Your next amazing experience starts here.
        </p>
      </div>
    </section>
  );
}

const events = [
  { title: 'Summer Music Festival', date: '2025-08-10', location: 'Kigali Arena', desc: 'Join us for a day of music, food, and fun with top artists and DJs.', video: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
  { title: 'Business Expo 2025', date: '2025-09-05', location: 'Kigali Convention Center', desc: 'Network with industry leaders and discover new business opportunities.', video: 'https://www.youtube.com/watch?v=I1EkMUWNz-4' },
  { title: 'Charity Gala Night', date: '2025-10-12', location: 'Serena Hotel', desc: 'An elegant evening supporting local charities with live entertainment and auctions.', video: 'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
  { title: 'Tech Innovators Summit', date: '2025-11-20', location: 'Kigali Tech Park', desc: 'Explore the latest in technology and innovation with industry leaders.', video: 'https://www.youtube.com/watch?v=ktvTqknDobU' },
  { title: 'Food & Wine Expo', date: '2025-12-05', location: 'Downtown Kigali', desc: 'Taste the best food and wine from local and international vendors.', video: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
  { title: 'Art & Culture Fair', date: '2026-01-15', location: 'Kigali Arts Center', desc: 'Celebrate art, music, and culture with exhibitions and live performances.', video: 'https://www.youtube.com/watch?v=VYOjWnS4cMY' },
  { title: 'Green Future Forum', date: '2026-02-10', location: 'Eco Park', desc: 'Join the conversation on sustainability and green innovation.', video: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g' },
  { title: 'Startup Pitch Night', date: '2026-03-08', location: 'Innovation Hub', desc: 'Watch startups pitch their ideas to investors and win prizes.', video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ' },
  { title: 'Health & Wellness Expo', date: '2026-04-12', location: 'Kigali Health Center', desc: 'Discover the latest in health, wellness, and fitness trends.', video: 'https://www.youtube.com/watch?v=UceaB4D0jpo' },
  { title: 'Film Festival', date: '2026-05-20', location: 'Kigali Cinema', desc: 'Enjoy screenings of local and international films and meet the filmmakers.', video: 'https://www.youtube.com/watch?v=6Dh-RL__uN4' },
];

function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : '';
}

export default function Event() {
  const [current, setCurrent] = useState(0);
  const total = events.length;
  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Autoplay: advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="min-h-screen px-0 py-0 bg-black">
      {/* Hero Section in Brand Values Style */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={HomeEvent1}
          alt="Event Hero"
          className="absolute inset-0 z-0 object-cover w-full h-full transition-all duration-700"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        <div className="relative z-20 flex flex-col justify-center w-full h-full px-6 mx-auto max-w-7xl">
          <span className="text-2xl md:text-3xl font-bold text-[#FFB347] mb-4 tracking-widest">OUR EVENTS</span>
          <h1 className="max-w-5xl mb-8 font-serif text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Experience the Magic of Every Event, <br />
            Creating Unforgettable Moments, <br />
            Inspiring Connections, <br />
            Celebrating Life’s Best Occasions.
          </h1>
          <p className="max-w-3xl text-lg font-light md:text-2xl text-white/90">
            Discover unforgettable moments, connect with inspiring people, and celebrate life’s best occasions with EMS Rwanda. Your next amazing experience starts here.
          </p>
        </div>
      </section>
      {/* Animated 3D Event Card Slider */}
      <div className="flex flex-col items-center w-full max-w-4xl gap-16 px-4 py-16 mx-auto">
        <div className="relative w-full flex items-center justify-center min-h-[600px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, rotateY: 60, scale: 0.9, x: 200 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, rotateY: -60, scale: 0.9, x: -200 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.7 }}
              className="w-full"
              style={{ perspective: 1200 }}
            >
              <div className="flex flex-col items-center p-0 overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-violet-900/80 rounded-3xl">
                <div className="w-full bg-black aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeId(events[current].video)}`}
                    title={events[current].title}
                    className="w-full h-full rounded-t-3xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex flex-col items-center w-full px-8 py-8">
                  <h2 className="mb-4 font-serif text-3xl font-extrabold text-center text-white md:text-5xl">{events[current].title}</h2>
                  <div className="flex flex-col items-center justify-center gap-4 mb-4 md:flex-row">
                    <span className="text-base font-semibold md:text-lg text-emsGreen">{events[current].date}</span>
                    <span className="text-lg text-white/80">Location: <span className="font-semibold text-white">{events[current].location}</span></span>
                  </div>
                  <p className="max-w-2xl mb-2 text-lg font-light text-center text-white/90 md:text-xl">{events[current].desc}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        html { scroll-behavior: smooth; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
} 