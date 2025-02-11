import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler =  async (e) => {
    e.preventDefault();

    const userData = {
      email:email,
      password:password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , userData)
    

    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token' , JSON.stringify(data.token));
      navigate('/home');
    }

    console.log(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className=" p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className=" text-lg font-medium mb-2">What is your Email</h3>
          <input
            className=" bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />

          <h3 className=" text-lg font-medium mb-2">Enter Password</h3>
          <input
            className=" bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className=" font-bold  flex w-full items-center justify-center bg-black text-white py-3 rounded-lg mt-5">
            Login
          </button>
        </form>
        <p className=" text-center text-xs mt-2">
          New Here?{" "}
          <Link to="/signup" className=" text-blue-600">
            Create New Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="  flex w-full items-center font-bold justify-center bg-[#36ae3cc9] text-black py-3 rounded-lg mt-5"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
