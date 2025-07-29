import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import eventVideo from '../assets/video/eventopened.mp4';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Events', to: '/works' },
  { name: 'News', to: '/news' },
  { name: 'Contact', to: '/contact' },
];

const socialLinks = [
  { name: 'Pinterest', href: 'https://pinterest.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 0C5.373 0 0 5.373 0 12c0 4.991 3.657 9.128 8.438 10.093-.117-.858-.223-2.178.047-3.115.244-.83 1.574-5.29 1.574-5.29s-.4-.8-.4-1.983c0-1.858 1.077-3.247 2.419-3.247 1.142 0 1.694.857 1.694 1.885 0 1.148-.731 2.864-1.108 4.46-.316 1.338.67 2.429 1.988 2.429 2.386 0 4.217-2.517 4.217-6.146 0-3.217-2.314-5.47-5.624-5.47-3.833 0-6.084 2.872-6.084 5.84 0 1.159.445 2.404 1.002 3.08.11.134.126.251.092.386-.1.406-.326 1.293-.37 1.471-.06.244-.195.296-.453.179-1.693-.786-2.75-3.25-2.75-5.234 0-4.263 3.1-8.181 8.951-8.181 4.693 0 8.344 3.347 8.344 7.813 0 4.678-2.943 8.447-7.033 8.447-1.406 0-2.728-.73-3.18-1.553l-.865 3.29c-.25.963-.74 2.17-1.104 2.905.832.257 1.71.396 2.63.396 6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
  ) },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
  ) },
  { name: 'Instagram', href: 'https://instagram.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.678 1.326c-.924.924-1.196 2.097-1.254 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.058 1.277.33 2.45 1.254 3.374.924.924 2.097 1.196 3.374 1.254C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.33 3.374-1.254.924-.924 1.196-2.097 1.254-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.277-.33-2.45-1.254-3.374-.924-.924-2.097-1.196-3.374-1.254C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  ) },
  { name: 'Facebook', href: 'https://facebook.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
  ) },
  { name: 'Twitter', href: 'https://twitter.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.924 2.206-4.924 4.924 0 .386.044.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
  ) },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden bg-gray-900"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 z-0 object-cover w-full h-full"
        src={eventVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: 0.25 }}
      />
      {/* Curved Background Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {/* Large flowing curve */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100, y: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute w-64 h-64 rounded-full -top-20 -left-20 bg-gradient-to-br from-pink-500/20 to-purple-600/30 blur-3xl animate-pulse"
        />
        {/* Medium curve */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100, y: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute right-0 rounded-full top-16 w-52 h-52 bg-gradient-to-bl from-blue-500/15 to-indigo-600/25 blur-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        {/* Small accent curve */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 rounded-full left-1/3 w-44 h-44 bg-gradient-to-tr from-violet-500/20 to-pink-500/20 blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        {/* Flowing wave shape */}
        <motion.svg
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="absolute top-0 left-0 w-full h-28"
          viewBox="0 0 1200 120" preserveAspectRatio="none"
        >
          <path d="M0,120 C300,60 600,0 900,30 C1050,45 1200,90 1200,120 L1200,0 L0,0 Z" 
                fill="url(#gradient1)" 
                opacity="1"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-8 text-white">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <img src={logo} alt="Logo" className="h-12 mx-auto drop-shadow-lg" />
        </motion.div>

        {/* Nav Links */}
        <motion.nav 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.to}
              className="relative text-sm font-medium tracking-wide uppercase transition-all duration-300 text-white/90 hover:text-pink-400 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </motion.nav>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center gap-3 mb-5"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:scale-110 hover:shadow-lg"
              aria-label={link.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Subscribe Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-md mx-auto mb-8"
        >
          <form className="flex flex-col items-center gap-3 p-4 shadow-lg sm:flex-row bg-white/10 rounded-xl">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 text-white border rounded-lg outline-none border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 bg-white/20 placeholder-white/70"
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-2 font-semibold text-white transition-all rounded-lg shadow bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </form>
          <div className="mt-2 text-xs text-white/60">Subscribe to get the latest news and event updates.</div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-4 text-sm font-normal text-center text-white/60"
        >
          <a
            href="/privacy-policy"
            className="inline-block mb-2 text-pink-300 underline transition-all hover:text-pink-400"
          >
            Privacy Policy
          </a>
          <br />
          Copyright &copy;{new Date().getFullYear()} All rights reserved |
          <span className="ml-2 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
            This site is designed in The House of Kemmy
          </span>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed z-50 flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full shadow-2xl bottom-5 right-5 bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-pink-500/25 hover:scale-110 backdrop-blur-sm"
        aria-label="Scroll to top"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </motion.button>
    </motion.footer>
  );
}