import { useEffect, useRef, useState } from 'react';

import "../../specialHelper/scrollbar.css"
const news = [
  {
    id: 1,
    title: 'Summer Party Extravaganza',
    content: 'Join us for a night of music, dancing, and unforgettable memories at the annual summer party!',
    date: '2025-07-29',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Carnival Night Show',
    content: 'Experience the thrill of carnival games, live performances, and dazzling lights!',
    date: '2025-07-28',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Gala Awards Evening',
    content: 'Dress to impress and celebrate achievements at our glamorous gala awards night.',
    date: '2025-07-27',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Live Concert Under the Stars',
    content: 'Enjoy live music performances in an open-air setting with friends and family.',
    date: '2025-07-26',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
  },
];

const NewsDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bgLoaded, setBgLoaded] = useState(true);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setBgLoaded(false);
    const img = new window.Image();
    img.src = news[activeIndex].image;
    img.onload = () => setBgLoaded(true);
  }, [activeIndex]);

  useEffect(() => {
    setPulse(false);
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 700);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const index = Number(visible.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory relative scrollbar-hide"
      style={{
        backgroundImage: bgLoaded ? `url(${news[activeIndex].image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.8s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'rgba(0,0,0,0.5)' }}
      />
      <div
        className={`absolute inset-0 z-0 transition-transform duration-[2500ms] ease-in-out ${
          bgLoaded ? 'scale-105' : 'scale-100'
        }`}
        style={{
          backgroundImage: bgLoaded ? `url(${news[activeIndex].image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(0px)',
          opacity: 0.2,
        }}
        aria-hidden="true"
      />
      {news.map((item, index) => (
        <div
          key={item.id}
          data-index={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="h-screen snap-start flex items-center justify-center bg-black bg-opacity-60 text-white p-8"
        >
          <div
            className={`max-w-2xl text-center mx-auto flex flex-col items-center transition-all duration-700 ${
              index === activeIndex
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
            } ${index === activeIndex && pulse ? 'animate-pulse' : ''}`}
          >
            <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
            <p className="mb-4">{item.content}</p>
            <span className="text-sm text-gray-300">{item.date}</span>
          </div>
        </div>
      ))}

      {/* Pagination Lines */}
      <div className="fixed bottom-8 right-8 flex flex-row gap-4 items-end z-10 mr-20">
        {news.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {i === activeIndex && (
              <span className="mb-1 text-white font-bold text-base drop-shadow-lg">{i + 1}</span>
            )}
            <div
              className={`w-1 transition-all duration-300 rounded-sm ${
                i === activeIndex ? 'h-14 bg-white' : 'h-8 bg-gray-400'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDashboard;
