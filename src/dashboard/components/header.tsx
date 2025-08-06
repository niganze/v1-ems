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
    <header className="bg-white border-b border-gray-400/20 shadow-sm">
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-500 hover:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-2xl font-bold text-gray-500 tracking-tight">Welcome back, <span className="text-gray-600">Administrator</span></span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-400/20 rounded-lg bg-gray-100/50 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 w-56 text-sm placeholder-gray-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 focus:outline-none px-2 py-1 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-gray-500"
              />
              <span className="text-sm font-semibold text-gray-500">Admin User</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-400/20 rounded-lg shadow-lg z-50">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 rounded-t-lg text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to='/'
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-600 rounded-b-lg text-sm"
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