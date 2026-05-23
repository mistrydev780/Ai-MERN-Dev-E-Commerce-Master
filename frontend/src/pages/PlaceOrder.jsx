import React, { useContext, useMemo, useState } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {

    const { serverUrl } = useContext(authDataContext)
const navigate = useNavigate()

const [method, setMethod] = useState("COD")

   const {
    cartItem,
    products,
    currency,
    delivery_fee,
    setCartItem
} = useContext(shopDataContext)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const cartData = []

    for (const itemId in cartItem) {

        for (const size in cartItem[itemId]) {

            if (cartItem[itemId][size] > 0) {

                cartData.push({
                    _id: itemId,
                    size,
                    quantity: cartItem[itemId][size]
                })
            }
        }
    }

    const subtotal = useMemo(() => {

        return cartData.reduce((total, item) => {

            const product = products.find(
                (p) => p._id === item._id
            )

            return total + (product.price * item.quantity)

        }, 0)

    }, [cartData, products])

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

const handlePlaceOrder = async () => {

    try {

        const orderItems = cartData.map((item) => ({

            productId: item._id,

            size: item.size,

            quantity: item.quantity
        }))

        const orderData = {

            items: orderItems,

            address: formData,

            amount: subtotal + delivery_fee
        }

        // COD

        if (method === "COD") {

            const result = await axios.post(

                serverUrl + "/api/order/place",

                orderData,

                { withCredentials: true }
            )

            if (result.data.success) {

                alert("Order Placed Successfully 🔥")

                setCartItem({})

                localStorage.removeItem("cart")

                navigate("/myorders")
            }
        }

        // RAZORPAY

        else {

            const result = await axios.post(

                serverUrl + "/api/order/razorpay",

                orderData,

                { withCredentials: true }
            )

            if (result.data.success) {

                initPay(result.data.order)
            }
        }

    } catch (error) {

        console.log(error)

        alert("Order Failed")
    }
}

const initPay = async (order) => {

    console.log(import.meta.env.VITE_RAZORPAY_KEY)

  const options = {

   key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: order.amount,

    currency: order.currency,

    name: "Dev E-Commerce",

    description: "Order Payment",

    order_id: order.id,

    handler: async (response) => {

      try {

        const verifyData = {

          razorpay_order_id: response.razorpay_order_id,

          razorpay_payment_id: response.razorpay_payment_id,

          razorpay_signature: response.razorpay_signature,

          items: cartData,
address: formData,

amount: subtotal + delivery_fee
        }

        const result = await axios.post(

          serverUrl + "/api/order/verifyrazorpay",

          verifyData,

          { withCredentials: true }
        )

        if (result.data.success) {

          toast.success("Payment Successful 🚀")

          setCartItem({})

          navigate("/myorders")
        }

      } catch (error) {

        console.log(error)
      }
    }
  }

  const razorpay = new window.Razorpay(options)

  razorpay.open()
}

    return (

        <div className='min-h-screen bg-gradient-to-br from-black via-[#07131a] to-[#102532] text-white pt-[120px] px-[20px] md:px-[60px]'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

                {/* LEFT */}

                <div className='bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg'>

                    <h1 className='text-4xl font-bold mb-8'>
                        Delivery Information
                    </h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <input
                            type="text"
                            name='firstName'
                            placeholder='First Name'
                            className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='lastName'
                            placeholder='Last Name'
                            className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name='email'
                            placeholder='Email Address'
                            className='md:col-span-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='street'
                            placeholder='Street'
                            className='md:col-span-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='city'
                            placeholder='City'
                            className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='state'
                            placeholder='State'
                            className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='zipcode'
                            placeholder='Zip Code'
                            className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='country'
                            placeholder='Country'
                            className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name='phone'
                            placeholder='Phone Number'
                            className='md:col-span-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none'
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* RIGHT */}

                <div className='bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg h-fit'>

                    <h2 className='text-4xl font-bold mb-8'>
                        Order Summary
                    </h2>

                    <div className='flex flex-col gap-5'>

                        {
                            cartData.map((item, index) => {

                                const product = products.find(
                                    (p) => p._id === item._id
                                )

                                return (

                                    <div
                                        key={index}
                                        className='flex items-center justify-between border-b border-gray-700 pb-4'
                                    >

                                        <div className='flex items-center gap-4'>

                                            <img
                                                src={product.image1}
                                                alt=""
                                                className='w-[70px] h-[70px] rounded-xl object-cover'
                                            />

                                            <div>

                                                <h3 className='text-lg font-semibold'>
                                                    {product.name}
                                                </h3>

                                                <p className='text-cyan-300'>
                                                    Size : {item.size}
                                                </p>

                                                <p>
                                                    Qty : {item.quantity}
                                                </p>

                                            </div>

                                        </div>

                                        <p className='font-bold'>
                                            {currency}
                                            {product.price * item.quantity}
                                        </p>

                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className='mt-8 flex flex-col gap-4'>

                        <div className='flex justify-between'>
                            <span>Subtotal</span>
                            <span>{currency}{subtotal}</span>
                        </div>

                        <div className='flex justify-between'>
                            <span>Delivery Fee</span>
                            <span>{currency}{delivery_fee}</span>
                        </div>

                        <hr className='border-gray-700' />

                        <div className='flex justify-between text-2xl font-bold'>
                            <span>Total</span>
                            <span>{currency}{subtotal + delivery_fee}</span>
                        </div>

                    <div className='flex flex-col gap-4 mt-8'>

  <div
    onClick={() => setMethod("COD")}
    className={`

      p-4
      rounded-2xl
      cursor-pointer

      border

      ${method === "COD"

        ? "border-cyan-400 bg-cyan-400/10"

        : "border-white/10"
      }
    `}
  >
    Cash On Delivery
  </div>

  <div
    onClick={() => setMethod("RAZORPAY")}
    className={`

      p-4
      rounded-2xl
      cursor-pointer

      border

      ${method === "RAZORPAY"

        ? "border-cyan-400 bg-cyan-400/10"

        : "border-white/10"
      }
    `}
  >
    Razorpay
  </div>
<button

    onClick={handlePlaceOrder}

    className='
    w-full
    mt-8

    bg-cyan-400
    hover:bg-cyan-500

    text-black
    font-bold

    py-4
    rounded-2xl

    duration-300
    '
>
    {
        method === "COD"

            ? "Place Order"

            : "Pay With Razorpay"
    }
</button>
</div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PlaceOrder