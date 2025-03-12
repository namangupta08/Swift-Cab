const ConfirmedRide = (props) => {
  //console.log("confirm ride" , props)
  return (
    <div>
      <h5
        className=" p-3 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill font-extrabold "></i>
      </h5>
      <h3 className=" text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className=" flex gap-3 flex-col justify-between items-center">
        <img
          className="h-28"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        />
        <div className=" w-full mt-5">
          {/* PICKUP */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-bold">
                {props.pickup.split(",")[0]}
              </h3>
              <p className="text-sm text-gray-600">
                {props.pickup.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          {/* DROPOFF */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-bold">
                {props.destination.split(",")[0]}
              </h3>
              <p className="text-sm text-gray-600">
                {props.destination.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 2">
            <i className="ri-money-rupee-circle-line text-xl font-semibold"></i>
            <div className="">
              <h3 className=" text-lg font-bold">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className=" text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.setvehiclePanelOpen(false);
            props.createRide();
          }}
          className=" w-full mt-5 bg-green-400 text-white rounded-lg font-semibold p-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
