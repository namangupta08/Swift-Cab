import React from "react";

const RidePopUp = (props) => {
  console.log(props?.ride)
  return (
    <div>
      <h5
        className=" p-3 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill font-extrabold "></i>
      </h5>
      <h3 className=" text-2xl font-semibold mb-5">New Ride Available!</h3>
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
        <div className=" flex items-center w-full justify-evenly">
        <button
          onClick={() => {
            props.setRidePopupPanel(false)
          }}
          className="  mt-1 bg-gray-400 text-white rounded-lg font-semibold p-3 px-10"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopupPanel(true)
            props.confirmRide()
          }}
          className=" mt-1 bg-green-400  text-white rounded-lg font-semibold p-3 px-10"
        >
          Accept
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default RidePopUp;
