import React from 'react'

import {
  IoIosAddCircleOutline
} from "react-icons/io"

import {
  FaRegListAlt,
  FaHome
} from "react-icons/fa"

import {
  SiTicktick
} from "react-icons/si"

import {
  useLocation,
  useNavigate
} from "react-router-dom"

function Sidebar() {

  const navigate = useNavigate()

  const location = useLocation()

  const menuItems = [

    {
      name: "Dashboard",
      icon: <FaHome className='text-[22px]' />,
      path: "/"
    },

    {
      name: "Add Product",
      icon: <IoIosAddCircleOutline className='text-[24px]' />,
      path: "/add"
    },

    {
      name: "Product List",
      icon: <FaRegListAlt className='text-[22px]' />,
      path: "/lists"
    },

    {
      name: "Orders",
      icon: <SiTicktick className='text-[20px]' />,
      path: "/orders"
    }

  ]

  return (

    <div
      className='

        fixed
        left-0
        top-0
        z-40

        w-[260px]
        min-h-screen

        bg-[#07131a]

        border-r
        border-white/10

        pt-[100px]
        px-4

        shadow-2xl
      '
    >

      <div className='flex flex-col gap-5'>

        {
          menuItems.map((item, index) => (

            <div

              key={index}

              onClick={() => navigate(item.path)}

              className={`

                flex
                items-center
                gap-4

                px-5
                py-4

                rounded-2xl

                cursor-pointer

                duration-300

                border

                ${location.pathname === item.path

                  ? `

                    bg-cyan-400
                    text-black
                    font-bold

                    border-cyan-300

                    shadow-lg
                    shadow-cyan-500/30
                  `

                  : `

                    text-white

                    border-transparent

                    hover:bg-white/10
                    hover:border-white/10
                  `
                }
              `}
            >

              {item.icon}

              <p className='text-[16px] tracking-wide'>
                {item.name}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Sidebar