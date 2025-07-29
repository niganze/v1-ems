import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="bg-white border-b border-emsBlue/10 shadow-sm">
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-emsPurple hover:text-emsBlue"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-2xl font-bold text-emsPurple tracking-tight">Welcome back, <span className="text-emsBlue">Administrator</span></span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emsBlue" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-emsBlue/20 rounded-lg bg-emsBlue/5 focus:ring-2 focus:ring-emsPurple focus:border-emsPurple w-56 text-sm placeholder-emsBlue/60"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-emsPurple hover:text-emsBlue hover:bg-emsBlue/10 rounded-full transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-emsPink text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 focus:outline-none px-2 py-1 rounded-lg hover:bg-emsBlue/10 transition-all"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-emsPurple"
              />
              <span className="text-sm font-semibold text-emsPurple">Admin User</span>
              <ChevronDown className="h-4 w-4 text-emsPurple" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-emsBlue/10 rounded-lg shadow-lg z-50">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-emsPurple hover:bg-emsBlue/10 hover:text-emsBlue rounded-t-lg text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to='/'
                  className="w-full text-left px-4 py-2 text-emsPink hover:bg-emsBlue/10 hover:text-emsBlue rounded-b-lg text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Log out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;