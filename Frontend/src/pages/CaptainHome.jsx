// import { useContext, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import CaptainDetails from "../components/CaptainDetails";
// import RidePopUp from "../components/RidePopUp";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
// //import CaptainContext from "../context/CaptainContext";
// import { SocketContext } from "../context/SocketContext";
// import { CaptainDataContext } from "../context/CaptainContext";
// import axios from "axios";
// import LiveTracking from "../components/LiveTracking";

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false);
//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
//   const [ride, setRide] = useState(null);

//   const ridePopupPanelRef = useRef(null);
//   const confirmRidePopupPanelRef = useRef(null);

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(CaptainDataContext);

//   useEffect(() => {
//     socket.emit("join", {
//       userId: captain._id,
//       userType: "captain",
//     });
//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           socket.emit("update-location-captain", {
//             userId: captain._id,
//             location: {
//               ltd: position.coords.latitude,
//               lng: position.coords.longitude,
//             },
//           });
//         });
//       }
//     };

//     const locationInterval = setInterval(updateLocation, 10000);
//     updateLocation();

//     // return () => clearInterval(locationInterval)
//   }, []);
//   useEffect(() => {
//     if (socket) {
//       console.log("Frontend socket ID:", socket.id); // Log frontend socket ID
//     }
//   }, [socket]);

//   socket.on("new-ride", (data) => {
//     console.log(data);
//     setRide(data);
//     setRidePopupPanel(true);
//   });

//   async function confirmRide() {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
//       {
//         rideId: ride._id,
//         captainId: captain._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     setRidePopupPanel(false);
//     setConfirmRidePopupPanel(true);
//   }

//   useGSAP(
//     function () {
//       if (ridePopupPanel) {
//         gsap.to(ridePopupPanelRef.current, {
//           transform: "translateY(0)",
//         });
//       } else {
//         gsap.to(ridePopupPanelRef.current, {
//           transform: "translateY(100%)",
//         });
//       }
//     },
//     [ridePopupPanel]
//   );
//   useGSAP(
//     function () {
//       if (confirmRidePopupPanel) {
//         gsap.to(confirmRidePopupPanelRef.current, {
//           transform: "translateY(0)",
//         });
//       } else {
//         gsap.to(confirmRidePopupPanelRef.current, {
//           transform: "translateY(100%)",
//         });
//       }
//     },
//     [confirmRidePopupPanel]
//   );
//   return (
//     <div className=" h-screen">
//       <div className=" fixed p-3 top-0 flex items-center justify-between w-full z-30">
//         <img
//           className="w-16  left-5 top-5 "
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt=""
//         />
//         <Link
//           to="/captain-login"
//           className=" h-10 w-10 bg-white flex items-center justify-center rounded-full font-bold"
//         >
//           <i className="ri-logout-box-r-line text-lg font-bold"></i>
//         </Link>
//       </div>
//       <div className="h-3/5 w-full relative z-10">
//         {/* <img
//           className=" w-screen h-full object-cover"
//           src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//         /> */}
//         <LiveTracking/>
//       </div>
//       <div className="h-2/5 p-6 bg-white z-20">
//         <CaptainDetails />
//       </div>
//       <div
//         ref={ridePopupPanelRef}
//         className=" w-full translate-y-full fixed z-30 bottom-0 bg-white px-3 py-12  pt-12"
//       >
//         <RidePopUp
//           confirmRide={confirmRide}
//           ride={ride}
//           setRidePopupPanel={setRidePopupPanel}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//         />
//       </div>
//       <div
//         ref={confirmRidePopupPanelRef}
//         className=" w-full translate-y-full h-screen fixed z-20 bottom-0 bg-white px-3 py-12  pt-12"
//       >
//         <ConfirmRidePopUp
//           ride={ride}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//           setRidePopupPanel={setRidePopupPanel}
//         />
//       </div>
//     </div>
//   );
// };

// export default CaptainHome;

import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captain._id, socket]);

  useEffect(() => {
    if (socket) {
      console.log("Frontend socket ID:", socket.id); // Log frontend socket ID
    }
  }, [socket]);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="fixed p-3 top-0 flex items-center justify-between w-full z-30">
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
      <div className="h-[70%] w-full relative z-10">
        <LiveTracking />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6 bg-white z-20">
        <CaptainDetails />
      </div>

      {/* Ride Popup Panel */}
      <div
        ref={ridePopupPanelRef}
        className="w-full translate-y-full fixed z-30 bottom-0 bg-white px-3 py-12 pt-12"
      >
        <RidePopUp
          confirmRide={confirmRide}
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      {/* Confirm Ride Popup Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="w-full translate-y-full h-screen fixed z-40 bottom-0 bg-white px-3 py-12 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;