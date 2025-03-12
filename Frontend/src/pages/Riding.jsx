// import { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { SocketContext } from "../context/SocketContext";
// import LiveTracking from "../components/LiveTracking";

// const Riding = () => {
//   const location = useLocation()
//     const { ride } = location.state 
//     const { socket } = useContext(SocketContext)
//     const navigate = useNavigate()
//     console.log(ride)

//     socket.on("ride-ended", () => {
//       navigate('/home')
//   })
//   return (
//     <div className=" h-screen">
//       <Link to="/home" className="fixed right-2 top-2 h-10 w-10 z-20 bg-white flex items-center justify-center rounded-full font-bold">
//       <i className="ri-home-5-line text-lg font-bold"></i>
//       </Link>
//       <div className=" h-1/2 w-full relative z-10">
//         {/* <img
//           className=" w-screen h-full object-cover"
//           src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//         /> */}
//         <LiveTracking/>
//       </div>
//       <div className=" h-1/2 p-4 z-20">
//         <div className=" flex items-center justify-between">
//           <img
//             className="h-16"
//             src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
//           />
//           <div className=" text-right">
//             <h2 className=" text-xl font-medium text-gray-600 ">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
//             <h4 className=" text-lg font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
//             <p className=" text-md font-medium text-gray-600">
//               Swift Dzire
//             </p>
//           </div>
//         </div>

//         <div className=" flex gap-3 flex-col justify-between items-center">
//           <div className=" w-full mt-5">
            
//             {/* DROPOFF */}
//             <div className="flex items-center gap-5 p-3 border-b-2">
//               <i className="ri-map-pin-user-fill text-lg"></i>
//               <div className="">
//                 <h3 className=" text-lg font-bold">{ride?.destination.split(",")[0]}</h3>
//                 <p className=" text-sm text-gray-600">
//                 {ride?.destination.split(",").slice(1).join(",")}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-5 p-3 2">
//               <i className="ri-money-rupee-circle-line text-xl font-semibold"></i>
//               <div className="">
//                 <h3 className=" text-lg font-bold">₹{ride?.fare}</h3>
//                 <p className=" text-sm text-gray-600">Cash</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button className=" w-full mt-5 bg-green-400 text-white rounded-lg font-semibold p-2">Make a Payment</button>
//       </div>
//     </div>
//   );
// };

// export default Riding;

import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  console.log(ride);

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen flex flex-col">
      {/* Home Button */}
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full font-bold z-30"
      >
        <i className="ri-home-5-line text-lg font-bold"></i>
      </Link>

      {/* Map Container */}
      <div className="h-[60%] w-full relative z-10">
        <LiveTracking />
      </div>

      {/* Content Container */}
      <div className="h-[40%] p-4 bg-white z-20">
        <div className="flex items-center justify-between">
          <img
            className="h-16"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt="Uber Logo"
          />
          <div className="text-right">
            <h2 className="text-xl font-medium text-gray-600">
              {ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}
            </h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-md font-medium text-gray-600">Swift Dzire</p>
          </div>
        </div>

        <div className="flex gap-3 flex-col justify-between items-center">
          <div className="w-full mt-5">
            {/* Destination */}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill text-lg"></i>
              <div className="">
                <h3 className="text-lg font-bold">
                  {ride?.destination.split(",")[0]}
                </h3>
                <p className="text-sm text-gray-600">
                  {ride?.destination.split(",").slice(1).join(",")}
                </p>
              </div>
            </div>

            {/* Fare */}
            <div className="flex items-center gap-5 p-3">
              <i className="ri-money-rupee-circle-line text-xl font-semibold"></i>
              <div className="">
                <h3 className="text-lg font-bold">₹{ride?.fare}</h3>
                <p className="text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full mt-5 bg-green-400 text-white rounded-lg font-semibold p-2">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;