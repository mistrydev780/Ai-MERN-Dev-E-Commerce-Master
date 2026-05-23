import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from '../contex/AuthContext'

function Orders() {

const { serverUrl } = useContext(authDataContext)

    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {

        try {

            const result = await axios.get(
                serverUrl + "/api/order/allorders"
            )

            setOrders(result.data.orders)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const handleStatus = async (orderId, status) => {

        try {

            await axios.post(
                serverUrl + "/api/order/status",
                {
                    orderId,
                    status
                }
            )

            getAllOrders()

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className='min-h-screen ml-[260px] pt-[100px] bg-gradient-to-br from-black via-[#07131a] to-[#102532] text-white p-[30px]'>

            <h1 className='text-5xl font-bold mb-10'>
                All Orders
            </h1>

            <div className='flex flex-col gap-8'>

                {
                    orders.map((order, index) => (

                        <div
                            key={index}
                            className='bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg'
                        >

                            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8'>

                                {/* LEFT */}

                                <div className='flex flex-col gap-3'>

                                    <h2 className='text-2xl font-bold'>
                                        Order #{index + 1}
                                    </h2>

                                    <p className='text-cyan-300'>
                                        {new Date(order.createdAt).toDateString()}
                                    </p>

                                    <div className='flex flex-col gap-2'>

                                        {
                                            order.items.map((item, i) => (

                                                <div key={i}>
                                                    Size : {item.size}
                                                    {" | "}
                                                    Qty : {item.quantity}
                                                </div>
                                            ))
                                        }

                                    </div>

                                </div>

                                {/* ADDRESS */}

                                <div className='flex flex-col gap-2'>

                                    <h3 className='text-xl font-bold'>
                                        Delivery Address
                                    </h3>

                                    <p>
                                        {order.address.firstName}
                                        {" "}
                                        {order.address.lastName}
                                    </p>

                                    <p>
                                        {order.address.street}
                                    </p>

                                    <p>
                                        {order.address.city},
                                        {" "}
                                        {order.address.state}
                                    </p>

                                    <p>
                                        {order.address.country}
                                    </p>

                                    <p>
                                        {order.address.phone}
                                    </p>

                                </div>

                                {/* RIGHT */}
<div className='flex flex-col gap-5'>

    {/* TOTAL */}

    <p className='text-3xl font-bold'>
        ₹{order.amount}
    </p>

    {/* PAYMENT METHOD */}

    <p className='text-cyan-300 text-lg font-semibold'>
        Payment : {order.paymentMethod}
    </p>

    {/* PAYMENT STATUS */}

    <div
        className={`

            px-4 py-2
            rounded-full

            text-center
            font-semibold
            text-white

            ${
                order.payment

                    ? "bg-green-500"

                    : "bg-red-500"
            }
        `}
    >

        {
            order.payment

                ? "Paid Online"

                : "Cash On Delivery"
        }

    </div>

    {/* STATUS SELECT */}

    <select

        value={order.status}

        onChange={(e) =>
            handleStatus(
                order._id,
                e.target.value
            )
        }

        className='
        bg-black

        border
        border-gray-700

        px-5 py-3

        rounded-xl

        outline-none
        '
    >

        <option>Order Placed</option>

        <option>Packed</option>

        <option>Shipped</option>

        <option>Out For Delivery</option>

        <option>Delivered</option>

    </select>

</div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Orders