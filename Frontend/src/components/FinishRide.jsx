import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const FinishRide = (props) => {
  console.log(props)
  const navigate = useNavigate()

  async function endRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

          rideId: props.rideData._id


      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          navigate('/captain-home')
      }

  }

  return (
    <div className='h-[90%]'>
    <h5
      className=" p-3 w-[93%] text-center absolute top-0"
      onClick={() => {
        props.setFinishRidePanel(false);
      }}
    >
      <i className=" text-3xl ri-arrow-down-wide-fill font-extrabold "></i>
    </h5>
    <h3 className=" text-2xl font-semibold mb-5">
      Finish this Ride
    </h3>
    <div className=" flex items-center justify-between mt-8 p-3 bg-yellow-500 rounded-xl">
      <div className=" flex items-center gap-3">
        <img
          className=" h-14 w-14 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwSIEtebgY50lT554bEZCtDlDG5WfzS1ISbg&s"
        />
        <h2 className=" text-xl font-semibold">{props.rideData?.user.fullname.firstname + " " + props.rideData?.user.fullname.lastname}</h2>
      </div>
      <h5 className=" text-lg font-semibold">2.2 Km</h5>
    </div>
    <div className=" flex gap-3 flex-col justify-between items-center">
      <div className=" w-full mt-5">
        {/* PICKUP */}
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-2-fill text-lg"></i>
          <div className="">
            <h3 className=" text-lg font-bold">{props.rideData?.pickup.split(",")[0]}</h3>
            <p className=" text-sm text-gray-600">
            {props.rideData?.pickup.split(",").slice(1).join(",")}
            </p>
          </div>
        </div>
        {/* DROPOFF */}
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill text-lg"></i>
          <div className="">
            <h3 className=" text-lg font-bold">{props.rideData?.destination.split(",")[0]}</h3>
            <p className=" text-sm text-gray-600">
            {props.rideData?.destination.split(",").slice(1).join(",")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 2">
          <i className="ri-money-rupee-circle-line text-xl font-semibold"></i>
          <div className="">
            <h3 className=" text-lg font-bold">₹ {props.rideData?.fare}</h3>
            <p className=" text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      <div className=" mt-6 w-full">
        
          
          <button
             onClick={endRide}
            className=" w-full mt-5 bg-green-400 flex justify-center items-center  text-white rounded-lg font-semibold p-3"
          >
            Finish Ride
          </button>
          
        
      </div>
    </div>
  </div>
  )
}

export default FinishRide