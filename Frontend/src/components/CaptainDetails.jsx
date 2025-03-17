import { useContext } from "react"
import {CaptainDataContext} from "../context/CaptainContext"


const CaptainDetails = () => {
  
  const { captain } = useContext(CaptainDataContext)
  console.log(captain)

  return (
    <div>
        <div className=" flex items-center justify-between">
          <div className=" flex items-center justify-start gap-4 ">
            <img
              className=" h-14 w-14 rounded-full object-cover"
              src="data:image/png;base64,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"
            />
            <h4 className=" text-xl font-semibold">{captain?.fullname?.firstname + " " + captain?.fullname?.lastname}</h4>
          </div>
          <div>
            <h4 className=" text-xl font-semibold">₹295.20</h4>
            <p className=" text-sm font-medium text-gray-500">Earned</p>
          </div>
        </div>
        <div className="flex p-5 bg-gray-100 rounded-2xl justify-evenly items-start mt-7">
          <div className=" text-center ">
            <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className=" text-lg font-medium">10.2</h5>
            <p className=" text-sm to-gray-500">Hours online</p>
          </div>
          <div className=" text-center ">
            <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className=" text-lg font-medium">30 KM</h5>
            <p className=" text-sm to-gray-500">Total Distance</p>
          </div>
          <div className=" text-center ">
            <i className=" text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className=" text-lg font-medium">20</h5>
            <p className=" text-sm to-gray-500">Total Jobs</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails