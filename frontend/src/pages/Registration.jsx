import React, { use, useContext, useState } from 'react'
import Logo from '../assets/E-commerce MERN Assets/logo.png'
import google from '../assets/E-commerce MERN Assets/google.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../Context/UserContext';

function Registration() {
    const [show, setShow] = useState(false);
    let { serverUrl } = useContext(authDataContext)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { getCurrentUser } = useContext(userDataContext)

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post(
                serverUrl + '/api/auth/registration',
                { name, email, password },
                { withCredentials: true }
            )

            getCurrentUser()
            navigate("/login")         // optional redirect
            console.log(result.data)   // ✅ success response


        } catch (error) {
            console.log(error.response?.data || error.message) // ✅ error
        }
    }

    const googleRegistration = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            // console.log(response);
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl + '/api/auth/googlelogin', {
                name,
                email
            }, { withCredentials: true })
            console.log(result.data);
            getCurrentUser()
            navigate("/login")


        } catch (error) {
            console.log(error);

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
                <span className="text-2xl font-semibold">Registration Page</span>
                <span className="text-sm text-gray-300">
                    Welcome to Dev-E-Commerce, Place Your Order
                </span>
            </div>

            {/* Card */}
            <div className="max-w-[600px] w-[90%] h-[500px] bg-white/10 border border-white/20 backdrop-blur-2xl rounded-xl shadow-xl flex items-center justify-center">
                <form className="w-[90%] h-[90%] flex flex-col items-center gap-6" onSubmit={handleSignup}>

                    {/* Google */}
                    <div className="w-[90%] h-12 bg-[#42656c] hover:bg-[#4f7680] transition rounded-lg flex items-center justify-center gap-3 cursor-pointer text-sm font-medium" onClick={googleRegistration}>
                        <img src={google} alt="google" className="w-5" />
                        Registration With Google
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
                            type="text"
                            placeholder="UserName"
                            required
                            className="w-full h-12 px-5 rounded-lg bg-transparent border border-white/30 backdrop-blur-sm placeholder-gray-300 focus:outline-none focus:border-white transition"
                            onChange={(e) => setName(e.target.value)} value={name}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full h-12 px-5 rounded-lg bg-transparent border border-white/30 backdrop-blur-sm placeholder-gray-300 focus:outline-none focus:border-white transition"
                            onChange={(e) => setEmail(e.target.value)} value={email}
                        />

                        {/* Password with eye */}
                        <div className="w-full relative">
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                required
                                className="w-full h-12 px-5 pr-12 rounded-lg bg-transparent border border-white/30 backdrop-blur-sm placeholder-gray-300 focus:outline-none focus:border-white transition"
                                onChange={(e) => setPassword(e.target.value)} value={password}
                            />

                            {show ? (
                                <FaEyeSlash
                                    className="w-5 h-5 text-white absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
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
                            Create Account
                        </button>

                        <p className="flex gap-2 text-sm">
                            You have any account?
                            <span
                                className="text-[#5555f6cf] text-base font-semibold cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                Login
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

      "ai-mern-dev-e-commerce-master-5u47-hz8wkaapf.vercel.app",

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

export default Registration
