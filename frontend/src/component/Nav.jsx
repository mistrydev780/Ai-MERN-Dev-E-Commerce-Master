import React, { useContext, useState } from 'react'
import logo from '../assets/E-commerce MERN Assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchCircle } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { HiCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { shopDataContext } from '../Context/ShopContext';



function Nav() {
    let { userData, getCurrentUser } = useContext(userDataContext)
    let { serverUrl } = useContext(authDataContext)
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    let [showProfile, setShowProfile] = useState(false)
    let navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            console.log(result.data);
            getCurrentUser()

        } catch (error) {
            console.log(error);

        }
    }

    return (
       <div
className='

w-full
h-[75px]

bg-[#ecfafaee]
backdrop-blur-xl

fixed
top-0
left-0

z-50

flex
items-center
justify-between

px-[15px]
sm:px-[25px]
md:px-[35px]

shadow-lg
shadow-black/10
'
>

            {/* Logo */}
            <div className='flex items-center gap-[10px]'>
                <img src={logo} alt="logo" className='w-[30px]' />
              <h1
className='

text-[18px]
sm:text-[22px]

text-black
font-bold
tracking-wide
'
>
                    Dev E-Commerce
                </h1>
            </div>

           <div className='hidden lg:flex items-center'>
             <ul className='flex items-center gap-[14px] xl:gap-[18px]'>
                    <li className='text-[14px] text-white bg-black px-[20px] py-[8px] rounded-2xl cursor-pointer hover:bg-slate-600'
                        onClick={() => navigate("/")}>
                        HOME
                    </li>
                    <li className='text-[14px] text-white bg-black px-[20px] py-[8px] rounded-2xl cursor-pointer hover:bg-slate-600'
                        onClick={() => navigate("/collection")}>
                        COLLECTIONS
                    </li>
                    <li className='text-[14px] text-white bg-black px-[20px] py-[8px] rounded-2xl cursor-pointer hover:bg-slate-600'
                        onClick={() => navigate("/about")}>
                        ABOUT
                    </li>
                    <li className='text-[14px] text-white bg-black px-[20px] py-[8px] rounded-2xl cursor-pointer hover:bg-slate-600'
                        onClick={() => navigate("/contact")}>
                        CONTACT
                    </li>
                </ul>
            </div>
         <div className='flex items-center justify-end gap-[14px] sm:gap-[20px]'>
                {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />}
                {showSearch && <IoSearchCircle className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}
                {!userData && <FaCircleUser className='w-[30px] h-[30px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}
               {userData ? (
 <div

onClick={() => setShowProfile(prev => !prev)}

className='

w-[38px]
h-[38px]

rounded-full

bg-gradient-to-r
from-cyan-400
to-blue-500

text-white
font-bold

flex
items-center
justify-center

cursor-pointer

shadow-lg
shadow-cyan-500/30

uppercase
'
>

{
  userData?.name

    ? userData.name.charAt(0).toUpperCase()

    : userData?.email

    ? userData.email.charAt(0).toUpperCase()

    : "U"
}

</div>
                ) : (
                    <FaCircleUser
                        className='w-[30px] h-[30px] text-[#000000] cursor-pointer'
                        onClick={() => setShowSearch(prev => !prev)}
                    />
                )}

                <MdOutlineShoppingCart
                    className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block'
                    onClick={() => navigate("/cart")}
                />
              <p
className='

absolute

w-[18px]
h-[18px]

flex
items-center
justify-center

bg-black
text-white

rounded-full

text-[9px]

top-[12px]
right-[10px]
md:right-[18px]
'
>{getCartCount()}</p>

            </div>

            {showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd]
           absolute top-[100%] left-0 right-0 flex items-center justify-center'>
               <input
type="text"

className='

w-[90%]
sm:w-[70%]
md:w-[55%]

h-[55px]

bg-black
text-white

rounded-full

px-[25px]

outline-none

placeholder:text-gray-400
'

placeholder='Search Here'

onChange={(e) => {
setSearch(e.target.value)
}}

value={search}
/>
            </div>}

           {
showProfile &&

<div className='absolute w-[240px] bg-[#000000ef] top-[110%] right-[4%] border border-[#3b3b3b] rounded-2xl z-20 overflow-hidden shadow-2xl backdrop-blur-xl'>

    <ul className='flex flex-col text-white text-[16px]'>

        {
            !userData &&

            <li
                className='px-[20px] py-[14px] hover:bg-[#1f1f1f] cursor-pointer duration-200'
                onClick={() => {
                    navigate("/login")
                    setShowProfile(false)
                }}
            >
                Login
            </li>
        }

        {
            userData &&

            <li
                className='px-[20px] py-[14px] hover:bg-[#1f1f1f] cursor-pointer duration-200'
                onClick={() => {
                    navigate("/myorders")
                    setShowProfile(false)
                }}
            >
                My Orders
            </li>
        }

        <li
            className='px-[20px] py-[14px] hover:bg-[#1f1f1f] cursor-pointer duration-200'
            onClick={() => {
                navigate("/about")
                setShowProfile(false)
            }}
        >
            About
        </li>

        {
            userData &&

            <li
                className='px-[20px] py-[14px] hover:bg-red-500/20 text-red-400 cursor-pointer duration-200'
                onClick={() => {
                    handleLogout()
                    setShowProfile(false)
                }}
            >
                Logout
            </li>
        }

    </ul>

</div>
}
           <div
className='

w-full
h-[75px]

fixed
bottom-0
left-0

bg-[#111111f5]
backdrop-blur-xl

border-t
border-white/10

flex
items-center
justify-around

md:hidden

z-50
'
>
                <button className='text-white flex flex-col items-center gap-[2px]'
                    onClick={() => navigate("/")}>
                    <IoMdHome className='w-[28px] h-[28px]' />
                    Home
                </button>

                <button className='text-white flex flex-col items-center gap-[2px]'
                    onClick={() => navigate("/collection")}>
                    <HiCollection className='w-[28px] h-[28px]' />
                    Collections
                </button>

                <button className='text-white flex flex-col items-center gap-[2px]'
                    onClick={() => navigate("/contact")}>
                    <MdContacts className='w-[28px] h-[28px]' />
                    Contact
                </button>

                <button
                    className='text-white flex flex-col items-center gap-[2px]'
                    onClick={() => navigate("/cart")}
                >
                    <MdOutlineShoppingCart className='w-[28px] h-[28px]' />
                    Cart
                </button>


            </div>

        </div>
    )
}

export default Nav
