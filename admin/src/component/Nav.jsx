import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'

import { authDataContext } from '../contex/AuthContext'
import { adminDataContext } from '../contex/AdminContext'

function Nav() {

  const navigate = useNavigate()

  const { serverUrl } = useContext(authDataContext)

  const { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {

    try {

      await axios.get(
        serverUrl + "/api/auth/logout",
        { withCredentials: true }
      )

      getAdmin()

      navigate("/")

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div
      className='

      fixed
      top-0
      right-0
      z-50

      w-[calc(100%_-_260px)]
      h-[80px]

      bg-[#dcdbdbf8]
      backdrop-blur-lg

      border-b
      border-black/10

      flex
      items-center
      justify-between

      px-[40px]

      shadow-lg
    '
    >

      {/* LEFT */}

      <div
        className='flex items-center gap-4 cursor-pointer'
        onClick={() => navigate("/")}
      >

        <img
          src={logo}
          alt=""
          className='w-[42px]'
        />

        <div>

          <h1 className='text-[30px] font-bold text-black'>
            Dev-E-Commerce
          </h1>

          <p className='text-[13px] text-gray-600'>
            Admin Dashboard
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className='flex items-center gap-5'>

        <div className='hidden md:flex flex-col items-end'>

          <h2 className='text-[16px] font-bold text-black'>
            Admin
          </h2>

          <p className='text-[13px] text-gray-500'>
            admin@devecommerce.com
          </p>

        </div>

        <button

          onClick={logOut}

          className='
            bg-black
            hover:bg-cyan-500
            hover:text-black

            duration-300

            text-white
            font-semibold

            px-6
            py-3

            rounded-2xl

            shadow-md
          '
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Nav