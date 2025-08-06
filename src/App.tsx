import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Contact from './pages/Contact';
import Event from './pages/Event';
import OurWorks from './pages/ourworks';
import SingleWork from './pages/singlework';
import SingleNew from './pages/singlenew';
import Login from './pages/Login';
import DashboardLayout from './dashboard/components/layout';
import HomeDashboard from './dashboard/pages/home-dashboard';
import EventsDashboard from './dashboard/pages/events';
import OurWorksDashboard from './dashboard/pages/ourworks';
import Profile from './dashboard/pages/profile';
import SettingsDashboard from './dashboard/pages/settings';
import NewsDashboard from './dashboard/pages/NewsDashboard';
import PrivacyPolicy from './pages/privacy-policy';
import TestimonialsDashboard from './dashboard/pages/testimonials';
import PromotionDashboard from './dashboard/pages/promotion';
import Home from './pages/Home';
import About from './pages/About';
import PromoEvents from './components/promoevents';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="Event" element={<Event />} />
          <Route path="news" element={<NewsDashboard />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/ourworks" element={<OurWorks />} />
          <Route path="/singlework" element={<SingleWork />} />
          <Route path="/singlenew" element={<SingleNew />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/brandstory" element={<PromoEvents/>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="eventsdashboard" element={<EventsDashboard />} />
          <Route path="ourworksdashboard" element={<OurWorksDashboard />} />
          <Route path="newsdashboard" element={<NewsDashboard />} />
          <Route path="testimonialsdashboard" element={<TestimonialsDashboard />} />
          <Route path="promotiondashboard" element={<PromotionDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}