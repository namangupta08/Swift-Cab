// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import React, { useRef, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import FinishRide from '../components/FinishRide';
// import LiveTracking from '../components/LiveTracking';

// const CaptainRiding = () => {

//     const [finishRidePanel, setFinishRidePanel] = useState(false)

//     const finishRidePanelRef = useRef(null)
//     const location = useLocation();
//     const rideData = location.state?.ride

//     useGSAP(
//         function () {
//           if (finishRidePanel) {
//             gsap.to(finishRidePanelRef.current, {
//               transform: "translateY(0)",
//             });
//           } else {
//             gsap.to(finishRidePanelRef.current, {
//               transform: "translateY(100%)",
//             });
//           }
//         },
//         [finishRidePanel]
//       );
//   return (
//     <div className=" h-screen">
//     <div className=" fixed p-3 top-0 flex items-center justify-between w-full">
//       <img
//         className="w-16  left-5 top-5 "
//         src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//         alt=""
//       />
//       <Link
//         to="/captain-login"
//         className=" h-10 w-10 bg-white flex items-center justify-center rounded-full font-bold"
//       >
//         <i className="ri-logout-box-r-line text-lg font-bold"></i>
//       </Link>
//     </div>
//     <div className=" h-4/5 -z-1">
//       {/* <img
//         className=" w-screen h-full object-cover"
//         src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//       /> */}
//       <LiveTracking/>
//     </div>
    
//     <div className=" h-1/5 p-6 bg-yellow-400 flex justify-between items-center relative"
//     onClick={() => {
//         setFinishRidePanel(true);
//     }}
//     >
//     <h5
//         onClick={() => {
         
//         }}
//         className="  w-[85%] p-1 text-center absolute  top-0"
//       >
//         <i className=" text-3xl ri-arrow-up-wide-fill font-black "></i>
//       </h5>
//       <h4 className=' text-xl font-bold'>4567 KM away</h4>
//       <button className=" mt-1 bg-green-500  text-white rounded-lg font-semibold p-3 px-10">Complete Ride</button>
//     </div>

//     <div ref={finishRidePanelRef} className=" h-full w-full translate-y-full fixed z-10 bottom-0 bg-white px-3 py-12  pt-12">
//           <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel} />
//       </div>
    
//   </div>
//   )
// }

// export default CaptainRiding

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="fixed p-3 top-0 flex items-center justify-between w-full z-20">
        <img
          className="w-16 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full font-bold"
        >
          <i className="ri-logout-box-r-line text-lg font-bold"></i>
        </Link>
      </div>

      {/* Map Container */}
      <div className="h-4/5 w-full relative z-0">
        <LiveTracking />
      </div>

      {/* Yellow Panel */}
      <div
        className="h-1/5 p-6 bg-yellow-400 flex justify-between items-center relative z-10"
        onClick={() => {
          setFinishRidePanel((prev) => !prev); // Toggle the state
        }}
      >
        <h5 className="w-[85%] p-1 text-center absolute top-0">
          <i className="text-3xl ri-arrow-up-wide-fill font-black"></i>
        </h5>
        <h4 className="text-xl font-bold">4567 KM away</h4>
        <button className="mt-1 bg-green-500 text-white rounded-lg font-semibold p-3 px-10">
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Panel */}
      <div
        ref={finishRidePanelRef}
        className="h-full w-full translate-y-full fixed z-20 bottom-0 bg-white px-3 py-12 pt-12"
      >
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;