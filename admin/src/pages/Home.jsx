import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { adminDataContext } from '../contex/AdminContext'

import {
    FaBoxOpen,
    FaUsers,
    FaMoneyBillWave,
    FaShoppingCart
} from "react-icons/fa"
import AiAssistant from '../component/AiAssistant'

function Home() {

    const { serverUrl } = useContext(adminDataContext)

    const [analytics, setAnalytics] = useState({})
    const [recentOrders, setRecentOrders] = useState([])

    const getDashboardData = async () => {

        try {

          const result = await axios.get(

   serverUrl + "/api/admin/dashboard",

   {
      withCredentials: true
   }
)
            setAnalytics(result.data.analytics)
            setRecentOrders(result.data.recentOrders)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return (

       <div className='
min-h-screen
ml-[260px]
pt-[100px]
px-[30px]

bg-gradient-to-br
from-black
via-[#07131a]
to-[#102532]

text-white
'
>

            {/* TITLE */}

            <h1 className='text-5xl font-bold mb-10'>
                Admin Dashboard
            </h1>

            {/* ANALYTICS */}

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14'>

                {/* REVENUE */}

                <div
                    className='
                        rounded-3xl
                        p-8
                        bg-gradient-to-r
                        from-cyan-500
                        to-cyan-400
                        shadow-lg shadow-cyan-500/20
                        hover:scale-[102%]
                        duration-300
                    '
                >

                    <FaMoneyBillWave className='text-5xl mb-5 text-black' />

                    <h2 className='text-4xl font-bold text-black'>
                        ₹{analytics.totalRevenue}
                    </h2>

                    <p className='text-xl mt-2 text-black/80'>
                        Total Revenue
                    </p>

                </div>

                {/* ORDERS */}

                <div
                    className='
                        rounded-3xl
                        p-8
                        bg-gradient-to-r
                        from-purple-500
                        to-fuchsia-500
                        shadow-lg shadow-purple-500/20
                        hover:scale-[102%]
                        duration-300
                    '
                >

                    <FaShoppingCart className='text-5xl mb-5' />

                    <h2 className='text-4xl font-bold'>
                        {analytics.totalOrders}
                    </h2>

                    <p className='text-xl mt-2'>
                        Total Orders
                    </p>

                </div>

                {/* PRODUCTS */}

                <div
                    className='
                        rounded-3xl
                        p-8
                        bg-gradient-to-r
                        from-green-500
                        to-emerald-500
                        shadow-lg shadow-green-500/20
                        hover:scale-[102%]
                        duration-300
                    '
                >

                    <FaBoxOpen className='text-5xl mb-5' />

                    <h2 className='text-4xl font-bold'>
                        {analytics.totalProducts}
                    </h2>

                    <p className='text-xl mt-2'>
                        Total Products
                    </p>

                </div>

                {/* USERS */}

                <div
                    className='
                        rounded-3xl
                        p-8
                        bg-gradient-to-r
                        from-pink-500
                        to-rose-500
                        shadow-lg shadow-pink-500/20
                        hover:scale-[102%]
                        duration-300
                    '
                >

                    <FaUsers className='text-5xl mb-5' />

                    <h2 className='text-4xl font-bold'>
                        {analytics.totalUsers}
                    </h2>

                    <p className='text-xl mt-2'>
                        Total Users
                    </p>

                </div>

            </div>

            {/* RECENT ORDERS */}

            <div
                className='
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-8
                    backdrop-blur-lg
                '
            >

                <h2 className='text-3xl font-bold mb-8'>
                    Recent Orders
                </h2>

                <div className='flex flex-col gap-5'>

                    {
                        recentOrders.map((order, index) => (

                            <div
                                key={index}
                                className='
                                    flex
                                    items-center
                                    justify-between

                                    bg-white/5
                                    hover:bg-white/10

                                    duration-300

                                    p-5
                                    rounded-2xl
                                '
                            >

                                <div>

                                    <p className='text-xl font-bold'>
                                        Order #{index + 1}
                                    </p>

                                    <p className='text-cyan-300'>
                                        {new Date(order.createdAt).toDateString()}
                                    </p>

                                </div>

                                <div className='text-2xl font-bold'>
                                    ₹{order.amount}
                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>
<AiAssistant />
        </div>
        
    )
}

export default Home