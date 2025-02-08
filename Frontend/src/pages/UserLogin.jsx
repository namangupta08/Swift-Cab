import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
    
    const [email, setEmail] = useState("")
  
    return (
    <div className=" p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form>
          <h3 className=" text-lg font-medium mb-2">What is your Email</h3>
          <input
            className=" bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value) } 
            required
            placeholder="email@example.com"
          />

          <h3 className=" text-lg font-medium mb-2">Enter Password</h3>
          <input
            className=" bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            required
            placeholder="password"
          />

          <button className="  flex w-full items-center justify-center bg-black text-white py-3 rounded-lg mt-5">
            Login
          </button>
          
        </form>
        <p className=" text-center text-xs mt-2">New Here? <Link to='/signup' className=" text-blue-600">Create New Account</Link></p>
      </div>

      <div>
      <button className="  flex w-full items-center justify-center bg-[#F1D163] text-black py-3 rounded-lg mt-5">
            Sign in as Captain
          </button>
      </div>
    </div>
  );
};

export default UserLogin;
