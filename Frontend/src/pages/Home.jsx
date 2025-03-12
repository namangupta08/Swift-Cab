import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import WaitForDriver from "../components/WaitForDriver";
import LookingForDriver from "../components/LookingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [vehicleType, setvehicleType] = useState(null)
  const [fare, setFare] = useState({});
  const [ride, setRide] = useState(null)


  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confrimRidePanelRef = useRef(null);
  const vehicleFoundlRef = useRef(null);
  const waitingForDriverlRef = useRef(null);

  const {socket} = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
    console.log(user)
}, [ user ])

    socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)

        console.log("rideeeeeeeeeeeeeee" , ride)
    })  

socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
})


  useEffect(() => {
    console.log("vehiclePanelOpen:", vehiclePanelOpen);
  }, [vehiclePanelOpen]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "75%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confrimRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confrimRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundlRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundlRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverlRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverlRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    if (pickup.trim() !== "" && destination.trim() !== "") {
      setvehiclePanelOpen(true);
      setpanelOpen(false);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
      console.log(response.data);
      // setPickup(""); // Clear the pickup field
      // setDestination(""); // Clear the destination field
    } else {
      alert("Please enter both pickup and destination locations.");
    }
  }

  async function createRide() {
    console.log({ pickup, destination, vehicleType });
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

console.log(response.data)
}

  return (
    <div className=" h-screen relative">
      <img
        className="w-16 mb-10 left-5 top-5 absolute z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-[75%] w-screen relative z-10">
        {/* <img
          className=" w-screen h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        /> */}
        <LiveTracking/>
      </div>
      <div className=" h-screen  top-0  w-full flex flex-col justify-end absolute z-20">
        <div className=" h-[25%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setpanelOpen(false);
            }}
            className=" absolute right-6 top-6 text-2xl font-black opacity-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className=" text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className=" line absolute w-1 bg-black h-[52px] left-[10%] top-[43%] rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 w-full text-base rounded-lg mt-5"
              type="text"
              placeholder="Add pick-up location"
              value={pickup}
              onClick={() => {
                setpanelOpen(true);
                setActiveField("pickup");
              }}
              onChange={handlePickupChange}
            ></input>
            <input
              className="bg-[#eee] px-12 py-2 w-full text-base rounded-lg mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onClick={() => {
                setpanelOpen(true);
                setActiveField("destination");
              }}
              onChange={handleDestinationChange}
            ></input>
          </form>
          <button
            onClick={findTrip}
            
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white overflow-hidden">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setpanelOpen={setpanelOpen}
            setvehiclePanelOpen={setvehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      {/* VEHICLEPANEL */}
      <div
        ref={vehiclePanelRef}
        className=" w-full fixed z-20 bottom-0 bg-white px-3 py-12 translate-y-full pt-12"
      >
        <VehiclePanel
          fare={fare}
          setvehicleType={setvehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setvehiclePanelOpen={setvehiclePanelOpen}
        />
      </div>

      {/* CONFIRM RIDE */}
      <div
        ref={confrimRidePanelRef}
        className=" w-full fixed z-20 bottom-0 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <ConfirmedRide
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          setvehiclePanelOpen={setvehiclePanelOpen}
        />
      </div>
      <div
        ref={vehicleFoundlRef}
        className=" w-full fixed z-20 bottom-0 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <LookingForDriver
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverlRef}
        className="w-full fixed z-20 bottom-0 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <WaitForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
