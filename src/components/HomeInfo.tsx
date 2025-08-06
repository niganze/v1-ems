import { Link } from "react-router-dom";
import arrow from '../assets/icons/arrow.svg';

interface HomeInfoProps {
  currentStage: number;
}

const HomeInfo: React.FC<HomeInfoProps> = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5 bg-black'>
        Welcome to
        <span className='font-semibold mx-2 text-purple-400'>EMS Rwanda</span>
        🎉
        <br />
        Your Premier Event Planning Partner 🇷🇼
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box bg-black'>
        <p className='font-medium sm:text-xl text-center text-white'>
          We've planned hundreds of events <br /> and created unforgettable experiences across Rwanda
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box bg-black'>
        <p className='font-medium text-center sm:text-xl text-white'>
          From intimate gatherings to grand celebrations, <br /> we bring your vision to life with precision and style
        </p>

        <Link to='/events' className='neo-brutalism-white neo-btn'>
          View our events
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box bg-black'>
        <p className='font-medium sm:text-xl text-center text-white'>
          Ready to create your perfect event? <br /> Let's make your dreams a reality
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Start planning
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;