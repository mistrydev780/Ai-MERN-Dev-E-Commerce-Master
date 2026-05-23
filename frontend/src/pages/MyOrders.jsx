import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'

function MyOrders() {

    const { serverUrl } = useContext(authDataContext)

    const [orders, setOrders] = useState([])

    const getOrders = async () => {

        try {

            const result = await axios.get(
                serverUrl + "/api/order/userorders",
                { withCredentials: true }
            )

            setOrders(result.data.orders)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (

        <div className='min-h-screen bg-gradient-to-br from-black via-[#07131a] to-[#102532] text-white pt-[120px] px-[20px] md:px-[60px]'>

            <h1 className='text-4xl md:text-5xl font-bold mb-10'>
                My Orders
            </h1>

            <div className='flex flex-col gap-8'>

                {
                    orders.map((order, index) => (

                        <div
                            key={index}
                            className='
                            bg-white/5
                            border border-white/10
                            rounded-3xl
                            p-6 md:p-8
                            backdrop-blur-lg
                            '
                        >

                            <div className='flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10'>

                                {/* LEFT */}

                                <div className='flex-1'>

                                    <h2 className='text-2xl font-bold mb-3'>
                                        Order #{index + 1}
                                    </h2>

                                    <p className='text-cyan-300 mb-5'>
                                        {new Date(order.createdAt).toDateString()}
                                    </p>

                                    <div className='flex flex-col gap-4'>

                                        {
                                            order.items.map((item, i) => (

                                                <div
                                                    key={i}
                                                    className='
                                                    flex items-center gap-4
                                                    bg-white/5
                                                    p-4
                                                    rounded-2xl
                                                    '
                                                >

                                                    <img
                                                        src={item.productId?.image1}
                                                        alt=""
                                                        className='
                                                        w-[90px]
                                                        h-[90px]
                                                        object-cover
                                                        rounded-xl
                                                        border border-white/10
                                                        '
                                                    />

                                                    <div className='flex flex-col gap-1'>

                                                        <h3 className='text-lg font-bold'>
                                                            {item.productId?.name}
                                                        </h3>

                                                        <p className='text-cyan-300'>
                                                            ₹{item.productId?.price}
                                                        </p>

                                                        <p>
                                                            Size : {item.size}
                                                        </p>

                                                        <p>
                                                            Qty : {item.quantity}
                                                        </p>

                                                    </div>

                                                </div>
                                            ))
                                        }

                                    </div>

                                </div>

                                {/* RIGHT */}

                                <div className='w-full xl:w-[300px] flex flex-col gap-6'>

                                    {/* TOTAL */}

                                    <p className='text-3xl font-bold'>
                                        ₹{order.amount}
                                    </p>

                                    {/* STATUS BADGE */}

                                    <div
                                        className={`

                                        px-5 py-3
                                        rounded-2xl
                                        font-semibold
                                        text-center
                                        text-white

                                        ${
                                            order.status?.toLowerCase() === "order placed"

                                                ? "bg-yellow-500"

                                                : order.status?.toLowerCase() === "packed"

                                                ? "bg-orange-500"

                                                : order.status?.toLowerCase() === "shipped"

                                                ? "bg-blue-500"

                                                : order.status?.toLowerCase() === "out for delivery"

                                                ? "bg-purple-500"

                                                : order.status?.toLowerCase() === "delivered"

                                                ? "bg-green-500"

                                                : "bg-cyan-500"
                                        }
                                    `}
                                    >
                                        {order.status}
                                    </div>

                                    {/* TIMELINE */}

                                    <div className='flex flex-col gap-4 bg-white/5 p-5 rounded-2xl'>

                                        {/* ORDER PLACED */}

                                        <div className='flex items-center gap-3'>

                                            <div
                                                className={`
                                                w-[16px]
                                                h-[16px]
                                                rounded-full

                                                ${
                                                    ["Order Placed", "Packed", "Shipped", "Out For Delivery", "Delivered", "Paid"]

                                                        .includes(order.status)

                                                        ? "bg-green-500"

                                                        : "bg-gray-500"
                                                }
                                            `}
                                            />

                                            <p>Order Placed</p>

                                        </div>

                                        {/* PACKED */}

                                        <div className='flex items-center gap-3'>

                                            <div
                                                className={`
                                                w-[16px]
                                                h-[16px]
                                                rounded-full

                                                ${
                                                    ["Packed", "Shipped", "Out For Delivery", "Delivered"]

                                                        .includes(order.status)

                                                        ? "bg-green-500"

                                                        : "bg-gray-500"
                                                }
                                            `}
                                            />

                                            <p>Packed</p>

                                        </div>

                                        {/* SHIPPED */}

                                        <div className='flex items-center gap-3'>

                                            <div
                                                className={`
                                                w-[16px]
                                                h-[16px]
                                                rounded-full

                                                ${
                                                    ["Shipped", "Out For Delivery", "Delivered"]

                                                        .includes(order.status)

                                                        ? "bg-green-500"

                                                        : "bg-gray-500"
                                                }
                                            `}
                                            />

                                            <p>Shipped</p>

                                        </div>

                                        {/* OUT FOR DELIVERY */}

                                        <div className='flex items-center gap-3'>

                                            <div
                                                className={`
                                                w-[16px]
                                                h-[16px]
                                                rounded-full

                                                ${
                                                    ["Out For Delivery", "Delivered"]

                                                        .includes(order.status)

                                                        ? "bg-green-500"

                                                        : "bg-gray-500"
                                                }
                                            `}
                                            />

                                            <p>Out For Delivery</p>

                                        </div>

                                        {/* DELIVERED */}

                                        <div className='flex items-center gap-3'>

                                            <div
                                                className={`
                                                w-[16px]
                                                h-[16px]
                                                rounded-full

                                                ${
                                                    order.status === "Delivered"

                                                        ? "bg-green-500"

                                                        : "bg-gray-500"
                                                }
                                            `}
                                            />

                                            <p>Delivered</p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default MyOrders