import { 
  Calendar, 
  Briefcase, 
  Newspaper, 
  Mail, 
  Star, 
  UserPlus, 
  TrendingUp,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useState } from 'react';

const stats = [
  { label: 'Events', value: 12, icon: Calendar, color: 'bg-blue-500/10 text-blue-600', trend: '+12%' },
  { label: 'Our Works', value: 8, icon: Briefcase, color: 'bg-purple-500/10 text-purple-600', trend: '+8%' },
  { label: 'News', value: 5, icon: Newspaper, color: 'bg-pink-500/10 text-pink-600', trend: '+25%' },
  { label: 'Messages', value: 23, icon: Mail, color: 'bg-green-500/10 text-green-600', trend: '+15%' },
  { label: 'Testimonials', value: 7, icon: Star, color: 'bg-orange-500/10 text-orange-600', trend: '+5%' },
  { label: 'Subscribers', value: 120, icon: UserPlus, color: 'bg-yellow-500/10 text-yellow-600', trend: '+18%' },
];

const recentEvents = [
  { 
    title: 'Annual Gala Night', 
    date: '2024-06-10', 
    location: 'Kigali Convention Center',
    attendees: 250,
    status: 'completed',
    revenue: '$12,500'
  },
  { 
    title: 'Music Festival', 
    date: '2024-06-15', 
    location: 'Amahoro Stadium',
    attendees: 5000,
    status: 'upcoming',
    revenue: '$45,000'
  },
  { 
    title: 'Business Expo', 
    date: '2024-06-20', 
    location: 'Kigali Arena',
    attendees: 800,
    status: 'planning',
    revenue: '$25,000'
  },
];

const recentActivities = [
  { action: 'New event created', item: 'Tech Conference 2024', time: '2 hours ago', type: 'event' },
  { action: 'Message received', item: 'From John Doe', time: '3 hours ago', type: 'message' },
  { action: 'New subscriber', item: 'Sarah Wilson', time: '5 hours ago', type: 'subscriber' },
  { action: 'Event completed', item: 'Annual Gala Night', time: '1 day ago', type: 'event' },
];



const HomeDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'message': return <Mail className="w-4 h-4" />;
      case 'subscriber': return <UserPlus className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stats.map(({ label, value, icon: Icon, color, trend }) => (
            <div key={label} className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {trend}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
              <div className="text-gray-500 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Events */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  className="text-sm border-0 bg-transparent focus:outline-none text-gray-600"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="planning">Planning</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {recentEvents.map((event, idx) => (
                <div key={idx} className="group bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 hover:shadow-md transition-all duration-200 border border-blue-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} attendees
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {event.revenue}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-600 font-medium mb-1">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.item}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;