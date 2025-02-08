import { Link } from 'react-router-dom';
import Airport from '../assets/Airport-Fall.webp'

const Home = () => {
  return (
    <div>
      <div className="w-full pt-8 h-screen bg-red-400 flex flex-col justify-end"
        style={{ 
        backgroundImage: `url(${Airport})`, 
        backgroundSize: '270%', 
        backgroundPosition: '20% center', 
        backgroundRepeat: 'no-repeat' 
      }}
      >
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className=" bg-white py-4 px-4 pb-7">
          <h2 className=" text-3xl font-bold">Get Started with Uber</h2>
          <Link to='/login' className=" flex w-full items-center justify-center bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
