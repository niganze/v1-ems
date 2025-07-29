
import ThreeDSlider from '../components/ThreeDSlider';

export default function OurWorks() {
  return (
    <>
      {/* Featured Hero Section */}
      <section className="w-full min-h-[60vh] flex flex-col justify-between bg-[#161616] px-8 md:px-24 py-16 md:py-24 relative">
        <div className="flex flex-row items-start justify-start w-full">
          <span className="mt-2 mr-6 font-serif text-5xl italic text-white select-none md:text-6xl animate-bounce">18</span>
          <div>
            <div className="flex flex-col">
              <span className="pl-1 mb-2 text-xs font-bold tracking-widest md:text-sm text-white/80">FEATURED</span>
              <h1 className="text-6xl font-extrabold leading-none tracking-tight text-white md:text-8xl">WORKS</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end w-full mt-12 md:mt-0">
          <div className="max-w-lg text-right">
            <p className="mb-6 text-xl font-normal leading-snug text-white md:text-2xl">Experience the best in web design, creative development, graphic design, and branding.</p>
            <span className="text-base font-medium md:text-lg text-white/70">With love from Obys.</span>
          </div>
        </div>
      </section>
      <ThreeDSlider />
      {/* Modern Section Header */}
      {/* Cards grid would follow here */}
    </>
  );
} 