import React, { useContext, useState } from 'react'
import Logo from '../assets/E-commerce MERN Assets/logo.png'
import google from '../assets/E-commerce MERN Assets/google.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'


function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let { getCurrentUser } = useContext(userDataContext)

  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )

      console.log(result.data)
      await getCurrentUser()
      navigate("/")   // login ke baad home

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }


  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)

      const user = response.user
      const name = user.displayName
      const email = user.email

      // backend google login
      await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      )

      // user context update
      await getCurrentUser()

      // home page
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">

      {/* Header */}
      <div className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer">
        <img className="w-10" src={Logo} alt="logo" />
        <h1
          className="text-xl font-semibold tracking-wide"
          onClick={() => navigate("/")}
        >
          Dev-E-Commerce
        </h1>
      </div>

      {/* Title */}
      <div className="w-full h-24 flex flex-col items-center justify-center gap-2">
        <span className="text-2xl font-semibold">Login Page</span>
        <span className="text-sm text-gray-300">
          Welcome Back, Login to Continue
        </span>
      </div>

      {/* Card */}
      <div className="max-w-[600px] w-[90%] h-[450px] bg-white/10 border border-white/20 backdrop-blur-2xl rounded-xl shadow-xl flex items-center justify-center">
        <form
          className="w-[90%] h-[90%] flex flex-col items-center gap-6"
          onSubmit={handleLogin}
        >

          {/* Google Login */}
          <div
            className="w-[90%] h-12 bg-[#42656c] hover:bg-[#4f7680] transition rounded-lg
             flex items-center justify-center gap-3 cursor-pointer text-sm font-medium"
            onClick={googleLogin}
          >
            <img src={google} alt="google" className="w-5" />
            Login With Google
          </div>


          {/* Divider */}
          <div className="w-full flex items-center gap-3 text-sm text-gray-300">
            <div className="flex-1 h-px bg-white/20"></div>
            OR
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Inputs */}
          <div className="w-[90%] flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-5 rounded-lg bg-transparent border border-white/30 backdrop-blur-sm placeholder-gray-300 focus:outline-none focus:border-white transition"
            />

            {/* Password */}
            <div className="w-full relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-5 pr-12 rounded-lg bg-transparent border border-white/30 backdrop-blur-sm placeholder-gray-300 focus:outline-none focus:border-white transition"
              />

              {show ? (
                <FaEyeSlash
                  className="w-5 h-5 text-black absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(false)}
                />
              ) : (
                <FaEye
                  className="w-5 h-5 text-black absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-gradient-to-r from-[#1f6b75] to-[#2fa4b2] rounded-lg text-white font-semibold tracking-wide hover:opacity-90 transition active:scale-95"
            >
              Login
            </button>

            <p className="flex gap-2 text-sm">
              Don't have an account?
              <span
                className="text-[#5555f6cf] text-base font-semibold cursor-pointer"
                onClick={() => navigate("/registration")}
              >
                Register
              </span>
            </p>

          </div>
        </form>
      </div>
      <div
className='

w-full

flex
items-center
justify-center

mt-6
'
>

<button

onClick={() =>

   window.open(

      "http://localhost:5174",

      "_blank"
   )
}

className='

px-6
py-3

rounded-2xl

bg-gradient-to-r
from-cyan-400
to-blue-500

text-white
font-semibold

shadow-lg
shadow-cyan-500/30

hover:scale-105

duration-300
'
>

Admin Login →

</button>

</div>
    </div>
  )
}

export default Login
