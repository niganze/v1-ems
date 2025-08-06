import HeroSection from './HeroSection';
import ModernPartners from '../components/Partners';
import BrandStory from '../components/BrandStory';
import Event from './Event';
import Horizontal from '../components/Horizontal';

export default function OrbitalCards() {
  return (
    <>
      <HeroSection />
      <Event />
      <Horizontal/>
      <ModernPartners />
      <BrandStory />
    </>
  );
}
