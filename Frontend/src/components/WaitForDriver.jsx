import React from "react";

const WaitForDriver = (props) => {
  return (
    <div>
      {/* <h5
        className=" p-3 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill font-extrabold "></i>
      </h5> */}
      <h3 className=" text-2xl font-semibold mb-5">
        Meet at pickup point 
      </h3>
      <div className=" flex items-center justify-between">
        <img
          className="h-[70px]"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        />
        <div className=" text-right">
            <h2 className=" text-2xl font-bold text-gray-600  mt-2">{props.ride?.captain?.fullname?.firstname + " " + props.ride?.captain?.fullname?.lastname}</h2>
            <h4 className=" text-xl font-semibold mt-[1px] ">{props.ride?.captain?.vehicle?.plate}</h4>
            <p className=" text-md font-medium text-gray-600 mt-[1px]">Swift Dzire</p>
            <h1 className=" text-2xl font-bold text-black  mt-2">OTP : {props.ride?.otp}</h1>
        </div>
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
      </div>
    </div>
  );
};

export default WaitForDriver;
