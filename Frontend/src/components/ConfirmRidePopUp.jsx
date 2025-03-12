import axios from "axios";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";


const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate();


    const submitHandler = async (e) => {
      // e.preventDefault()

      // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      //     params: {
      //         rideId: props.ride._id,
      //         otp: otp
      //     },
      //     headers: {
      //         Authorization: `Bearer ${localStorage.getItem('token')}`
      //     }
      // })

      // if (response.status === 200) {
      //     props.setConfirmRidePopupPanel(false)
      //     props.setRidePopupPanel(false)
      //     navigate('/captain-riding', { state: { ride: props.ride } })
      // }


      
      e.preventDefault();
      console.log("Submit handler triggered"); // Debugging
    
      try {
        console.log("Sending OTP:", otp); // Debugging
        console.log("Ride ID:", props.ride._id); // Debugging
    
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
          {
            params: {
              rideId: props.ride._id,
              otp: otp,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    
        console.log("Response:", response); // Debugging
    
        if (response.status === 200) {
          console.log("succcessss")
          props.setConfirmRidePopupPanel(false);
          props.setRidePopupPanel(false);
          navigate("/captain-riding", { state: { ride: props.ride } });
        }
      } catch (error) {
        console.error("Error confirming ride:", error); // Debugging
        alert("Invalid OTP. Please try again.");
      }
    }
  return (
    <div>
      <h5
        className=" p-3 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill font-extrabold "></i>
      </h5>
      <h3 className=" text-2xl font-semibold mb-5">
        Confirm this Ride to start
      </h3>
      <div className=" flex items-center justify-between mt-8 p-3 bg-yellow-500 rounded-xl">
        <div className=" flex items-center gap-3">
          <img
            className=" h-14 w-14 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwSIEtebgY50lT554bEZCtDlDG5WfzS1ISbg&s"
          />
          <h2 className=" text-xl font-semibold">{props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}</h2>
        </div>
        <h5 className=" text-lg font-semibold">2.2 Km</h5>
      </div>
      <div className=" flex gap-3 flex-col justify-between items-center">
        <div className=" w-full mt-5">
          {/* PICKUP */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div className="">
              <h3 className=" text-lg font-bold">{props.ride?.pickup.split(",")[0]}</h3>
              <p className=" text-sm text-gray-600">
              {props.ride?.pickup.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          {/* DROPOFF */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div className="">
              <h3 className=" text-lg font-bold">{props.ride?.destination.split(",")[0]}</h3>
              <p className=" text-sm text-gray-600">
              {props.ride?.destination.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 2">
            <i className="ri-money-rupee-circle-line text-xl font-semibold"></i>
            <div className="">
              <h3 className=" text-lg font-bold">₹{props.ride?.fare}</h3>
              <p className=" text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className=" mt-6 w-full">
          <form
            onSubmit={submitHandler}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value)
              }}
              className="bg-[#eee] px-6 py-4 font-mono w-full text-base rounded-lg mt-3"
              placeholder="Enter OTP"
            />
            <button
             
              className=" w-full mt-5 bg-green-400 flex justify-center items-center  text-white rounded-lg font-semibold p-3"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className=" w-full mt-2 bg-red-500 text-white rounded-lg font-semibold p-3 "
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
