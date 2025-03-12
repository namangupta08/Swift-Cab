const VehiclePanel = (props) => {
    console.log("vehicle" , props)
    console.log("fare " , props.fare)
  return (
    <div>
      <h5
        onClick={() => {
          props.setvehiclePanelOpen(false);
         
        }}
        className=" p-3 w-[93%] text-center absolute top-0"
      >
        <i className=" text-3xl ri-arrow-down-wide-fill font-extrabold "></i>
      </h5>
      <h3 className=" text-2xl font-semibold mb-5">Choose a vehicle</h3>
      {/* uberGO */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setvehicleType('car');
        }}
        className="p-3 flex w-full border-2 active:border-black rounded-3xl  mb-2 items-center justify-between "
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        />
        <div className="  w-1/2">
          <h4 className=" font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className=" font-medium text-sm">2 mins away</h5>
          <p className=" font-medium text-xs to-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className=" text-xl  font-semibold">₹{props.fare.car}</h2>
      </div>
      {/* MOTORCYCLE */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setvehicleType('moto');
        }}
        className="p-3 flex w-full border-2 active:border-black rounded-3xl  mb-2 items-center justify-between "
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        />
        <div className="  w-1/2">
          <h4 className=" font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className=" font-medium text-sm">3 mins away</h5>
          <p className=" font-medium text-xs to-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className=" text-xl  font-semibold">₹{props.fare.moto}</h2>
      </div>
      {/* AUTO */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setvehicleType('auto');
        }}
        className="p-3 flex w-full border-2 active:border-black rounded-3xl  mb-2 items-center justify-between "
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div className="w-1/2">
          <h4 className=" font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className=" font-medium text-sm">2 mins away</h5>
          <p className=" font-medium text-xs to-gray-600">
            Affordable Auto rides
          </p>
        </div>
        <h2 className=" text-xl  font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
