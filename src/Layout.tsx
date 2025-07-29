import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import AnimatedCursor from './components/ui/AnimatedCursor';

export default function Layout() {
  return (
    <div className="z-50 flex flex-col min-h-screen ">
      <AnimatedCursor />
      <Navbar/>
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
} 