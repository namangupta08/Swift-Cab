import React, { useState } from "react"
import { FaArrowRight } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext"
import axios from "axios"
import Logo from '../assets/swiftcab-high-resolution-logo copy.png'



const CaptainSignup = () => {
  
  const navigate = useNavigate();
     const [email, setEmail] = useState("")
            const [password, setPassword] = useState('')
            const [firstName, setfirstName] = useState('')
            const [lastName, setLastName] = useState('')
            const [userData, setUserData] = useState({})

            const [ vehicleColor, setVehicleColor ] = useState('')
            const [ vehiclePlate, setVehiclePlate ] = useState('')
            const [ vehicleCapacity, setVehicleCapacity ] = useState('')
            const [ vehicleType, setVehicleType ] = useState('')
          

            const {captain , setCaptain} = React.useContext(CaptainDataContext);
        
            const submitHandler = async (e) => {
                e.preventDefault();
                const captainData = {
                  fullname: {
                    firstname: firstName,
                    lastname: lastName
                  },
                  email: email,
                  password: password,
                  vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType
                  }
                }
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

                if (response.status === 201 || response.status === 200) {
                  const data = response.data
                  setCaptain(data.captain)
                  localStorage.setItem('token', data.token)
                  navigate('/captain-home')
                }

                setEmail('')
                setfirstName('')
                setLastName('')
                setPassword('')
                setVehicleColor('')
                setVehiclePlate('')
                setVehicleCapacity('')
                setVehicleType('')
            
            }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen">
    <div>
      {/* <div className="flex  gap-1">
              <img
                      className="w-[150px] ml-[-10px] font-black"
                      //src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                      src={Logo}
                      alt=""
                    />
              <FaArrowRight className="mt-[18px] -ml-4" size={25}/>
              </div>
               */}
               <div className="flex  gap-1 mb-5">
                       
                            <span className=' font-bold text-2xl'>SwiftCab</span>
                            <FaArrowRight className="mt-[6px]" size={25}/>
                           
                       
                       </div>
      <form onSubmit={(e) => {submitHandler(e)}}>
        <h3 className=" text-base font-medium mb-2">What is your Name</h3>
        <div className="flex gap-2 mb-5">
            <input
            className=" bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="text"
            value={firstName}
            onChange={(e) => {setfirstName(e.target.value)}}
            required
            placeholder="First Name"
            />

            <input
            className=" bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="text"
            value={lastName}
            onChange={(e) => {setLastName(e.target.value)}}
            required
            placeholder="Last Name"
            />  
        </div>
        <h3 className=" text-base font-medium mb-2">What is your Email</h3>
        <input
          className=" bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value) } 
          required
          placeholder="email@example.com"
        />

        <h3 className=" text-base font-medium mb-2">Enter Password</h3>
        <input
          className=" bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm"
          type="password"
          required
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

        <button className=" font-bold  flex w-full items-center justify-center bg-black text-white py-3 rounded-lg mt-5">
          Create Captain Account
        </button>
        
      </form>
      <p className=" text-center text-xs mt-2">Already have a account? <Link to='/captain-login' className=" text-blue-600">Login Here</Link></p>
    </div>

    <div>
    <p className="text-[9px] leading-tight text-gray-800">This site is protected by reCAPTCHA and the <span className=" underline text-black">Google Privacy Policy</span> and <span className=" underline">Terms of Service</span> apply.
    </p>
    </div>
  </div>
  )
}

export default CaptainSignup
