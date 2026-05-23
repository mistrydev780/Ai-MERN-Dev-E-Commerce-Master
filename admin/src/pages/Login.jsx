import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { adminDataContext } from "../contex/AdminContext";
import { authDataContext } from "../contex/AuthContext";



function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {adminData , getAdmin} = useContext(adminDataContext)
  let { serverUrl } = useContext(authDataContext)



  const navigate = useNavigate();

  // ✅ ADMIN LOGIN
  const AdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      console.log(res.data);
      getAdmin()
      navigate("/"); // dashboard / home

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">

      {/* Header */}
      <div className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer">
        <img className="w-10" src={Logo} alt="logo" />
        Dev-E-Commerce
      </div>

      {/* Title */}
      <div className="w-full h-24 flex flex-col items-center justify-center gap-2">
        <span className="text-2xl font-semibold">Admin Login</span>
        <span className="text-sm text-gray-300">
          Welcome Back, Admin
        </span>
      </div>

      {/* Card */}
      <div className="max-w-[600px] w-[90%] h-[450px] bg-white/10 border border-white/20 backdrop-blur-2xl rounded-xl shadow-xl flex items-center justify-center">

        <form
          className="w-[90%] h-[90%] flex flex-col items-center gap-6"
          onSubmit={AdminLogin}
        >
          <div className="w-[90%] flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-5 rounded-lg bg-transparent border border-white/30 placeholder-gray-300 focus:outline-none"
            />

            <div className="w-full relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-5 pr-12 rounded-lg bg-transparent border border-white/30 placeholder-gray-300 focus:outline-none"
              />

              {show ? (
                <FaEyeSlash
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(false)}
                />
              ) : (
                <FaEye
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#1f6b75] to-[#2fa4b2] rounded-lg font-semibold hover:opacity-90"
            >
              Login
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
