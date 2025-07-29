import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import eventVideo from '../assets/eventvideo.mp4';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-16 h-16 mb-2 rounded-full shadow" />
            <h2 className="text-3xl font-bold text-emsPurple mb-1">Log In</h2>
            <p className="text-gray-400 text-center text-sm">Welcome back! Please enter your details</p>
          </div>
          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              // ...validate credentials here...
              navigate('/dashboard');
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emsPurple" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emsPurple text-emsPurple placeholder-gray-400 bg-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emsPurple" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emsPurple text-emsPurple placeholder-gray-400 bg-white"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emsPurple focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-emsPurple text-white font-semibold text-lg hover:bg-emsBlue transition-colors mb-2"
            >
              Log in
            </button>
            <div className="text-center text-xs text-gray-400 mt-6">
              <button type="button" className="text-emsPurple hover:underline" onClick={() => navigate('/')}>Return to Home</button>
            </div>
          </form>
        </div>
        {/* Right: Video */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-indigo-400 via-purple-300 to-violet-300 relative">
          <video
            className="w-full h-full object-cover rounded-r-3xl"
            src={eventVideo}
            autoPlay
            loop
            muted
          />
          {/* Optional: overlay for effect */}
          <div className="absolute inset-0 rounded-r-3xl bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default Login;