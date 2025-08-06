import { Link, useLocation } from "react-router-dom";
import {
  Target,
  Calendar,
  Newspaper,
  Star,
  Briefcase,

} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const sidebarItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <Target className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      id: "events",
      label: "Events",
      icon: <Calendar className="h-5 w-5" />,
      path: "/dashboard/events",
    },
    {
      id: "ourworks",
      label: "Our Works",
      icon: <Briefcase className="h-5 w-5" />,
      path: "/dashboard/ourworks",
    },
    {
      id: "news",
      label: "News",
      icon: <Newspaper className="h-5 w-5" />,
      path: "/dashboard/news",
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <Star className="h-5 w-5" />,
      path: "/dashboard/testimonials",
    },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-gray-500 border-r border-gray-400 shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="py-6 px-6 border-b border-gray-400">
            <span className="text-2xl font-bold text-white">Ems Rwanda</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 group
                  ${isActiveRoute(item.path)
                    ? "bg-white text-gray-700 shadow border-l-4 border-gray-600"
                    : "text-gray-100 hover:bg-gray-400 hover:text-white"}
                `}
              >
                <span className={`transition-all duration-200 ${isActiveRoute(item.path) ? "text-gray-600" : "text-gray-200 group-hover:text-white"}`}>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Unlock Pro Card */}
          <div className="mx-4 mb-4 mt-6 p-4 bg-white rounded-xl shadow flex flex-col items-center text-center">
            <div className="mb-2">
              {/* Placeholder for illustration */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#6B7280" fillOpacity="0.1" />
                <path d="M20 10L23 18H17L20 10Z" fill="#6B7280" />
                <rect x="17" y="18" width="6" height="10" rx="2" fill="#4B5563" />
              </svg>
            </div>
            <div className="font-bold text-base text-gray-600 mb-1">Unlock Promotion</div>
            <div className="text-xs text-gray-500 mb-3">Upgrade your plan to unlock advanced promotion features and grow your business faster.</div>
            <a href="/dashboard/promotion" className="px-4 py-1 text-xs font-semibold bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all duration-200">Upgrade Promotion</a>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default Sidebar;