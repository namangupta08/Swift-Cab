import { useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6";


const CaptainLogin = () => {
    const [email, setEmail] = useState("")
        const [password, setPassword] = useState('')
        const [captainData, setCaptainData] = useState({})
    
        const submitHandler = (e) => {
            e.preventDefault(); 
    
            
            setCaptainData({
                email:email,
                password:password
            })
            console.log(captainData)
            setEmail('')
            setPassword('')
        }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen">
      <div>
        <div className="flex gap-1">
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        /><FaArrowRight className="-mt-[1px]" size={25}/>
        </div>
        <form onSubmit={(e) => {submitHandler(e)}}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="  flex w-full items-center justify-center bg-black text-white py-3 rounded-lg mt-5 font-bold">
            Login
          </button>
          
        </form>
        <p className=" text-center text-xs mt-2">Drive with us? <Link to='/captain-signup' className=" text-blue-600">Sign up</Link></p>
      </div>

      <div>
      <Link to='/login'
      className="  flex w-full items-center justify-center bg-[#F1D163] text-black py-3 rounded-lg mt-5 font-bold">
            Sign in as User
          </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
