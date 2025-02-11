import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState('')
        const [firstName, setfirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [userData, setUserData] = useState({})

        const navigate = useNavigate();
        const {user , setUser} = React.useContext(UserDataContext)
    
        const submitHandler = async (e) => {
            e.preventDefault();
            const newuser = {
                fullname:{
                    firstname:firstName,
                    lastname:lastName
                },
                email:email,
                password:password
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register` , newuser)
            if(response.status === 200){
              const data = response.data;
              console.log(data);
              setUser(data.user)
              localStorage.setItem('token' , JSON.stringify(data.token));
              navigate('/home')
            }
            console.log(userData);
            console.log("here")

            setfirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        }
       
      
  return (
    <div className=" p-7 flex flex-col justify-between h-screen">
    <div>
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
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

        <button className=" font-bold  flex w-full items-center justify-center bg-black text-white py-3 rounded-lg mt-5">
          Sign Up
        </button>
        
      </form>
      <p className=" text-center text-xs mt-2">Already have a account? <Link to='/login' className=" text-blue-600">Login Here</Link></p>
    </div>

    <div>
    <p className="text-[9px] leading-tight text-gray-800">This site is protected by reCAPTCHA and the <span className=" underline text-black">Google Privacy Policy</span> and <span className=" underline">Terms of Service</span> apply.
    </p>
    </div>
  </div>
  )
}

export default UserSignup
