import { Link } from 'react-router-dom';
import Airport from '../assets/Airport-Fall.webp'
import Logo from '../assets/swiftcab-high-resolution-logo copy.png'


const Start = () => {
  return (
    <div>
      <div className="w-full pt-8 h-screen  flex flex-col justify-end bg-cover"
        style={{ 
        backgroundImage: `url(${Airport})`, 
        backgroundSize: 'cover', 
        backgroundPosition: '20% center', 
        backgroundRepeat: 'no-repeat' 
      }}
      >
        
         <div className="w-16 absolute left-5 top-5">
              {/* <FaCarSide className="text-5xl" /> */}
              <span className=' font-bold text-2xl'>SwiftCab</span>
            </div>
        <div className=" bg-white py-4 px-4 pb-7">
          <h2 className=" text-3xl font-bold">Get Started with Swift Cab</h2>
          <Link to='/login' className=" flex w-full items-center justify-center bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
