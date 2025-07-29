import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Events', to: '/events' },
  { name: 'News', to: '/news' },
  { name: 'Our Works', to: '/ourworks' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300 bg-transparent">
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img 
            src={logo} 
            alt="Event & Media Service Logo" 
            className="object-contain w-16 h-16 transition-all duration-300 md:h-28 md:w-28" 
          />
        </div>
        
        {/* Desktop Nav Links */}
        <nav className="absolute hidden transform -translate-x-1/2 left-1/2 md:flex">
          <ul className="flex gap-8 lg:gap-10">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link 
                  to={link.to} 
                  className="relative text-base font-bold tracking-wide transition-colors duration-300 text-emsYellow lg:text-lg hover:text-emsPurple group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emsPurple transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Hamburger Icon (Mobile) */}
        <button
          className="flex items-center justify-center p-2 transition-colors duration-300 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emsYellow"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg 
            className="w-8 h-8 text-white transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: menuOpen
            ? 'linear-gradient(135deg, rgba(34,34,64,0.96) 0%, rgba(102,45,145,0.92) 100%)'
            : 'rgba(0,0,0,0)',
          backdropFilter: menuOpen ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: menuOpen ? 'blur(8px)' : 'none',
        }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-gradient-to-b from-indigo-900 via-purple-900 to-violet-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 transition-colors duration-300 rounded-lg hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 mb-8">
            {navLinks.map((link, index) => (
              <li key={link.name} className="transition-all duration-300 transform" style={{ transitionDelay: `${index * 50}ms` }}>
                <Link
                  to={link.to}
                  className="block py-2 text-lg font-bold tracking-wide transition-colors duration-300 border-b text-emsYellow hover:text-emsPurple border-white/10 hover:border-emsPurple/50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}