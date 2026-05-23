import React, { useContext } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import { MdDelete } from "react-icons/md"

function Cart() {

    const {
        cartItem,
        products,
        currency,
        delivery_fee,
        setCartItem
    } = useContext(shopDataContext)

    let cartData = []

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

    const updateQuantity = (itemId, size, value) => {

        const cartCopy = structuredClone(cartItem)

        if (value <= 0) {
            delete cartCopy[itemId][size]
        } else {
            cartCopy[itemId][size] = value
        }

        setCartItem(cartCopy)
    }

    const subtotal = cartData.reduce((total, item) => {

        const product = products.find((p) => p._id === item._id)

        return total + (product.price * item.quantity)

    }, 0)

    return (
        <div className='min-h-screen bg-gradient-to-br from-black via-[#07131a] to-[#102532] text-white pt-[120px] px-[20px] md:px-[60px]'>

            <h1 className='text-5xl font-bold mb-10'>
                Shopping Cart
            </h1>

            <div className='flex flex-col gap-6'>

                {
                    cartData.length === 0
                        ?
                        <div className='text-2xl text-gray-400'>
                            Your Cart Is Empty
                        </div>

                        :

                        cartData.map((item, index) => {

                            const product = products.find(
                                (p) => p._id === item._id
                            )

                            return (

                                <div
                                    key={index}
                                    className='w-full bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-6'
                                >

                                    <div className='flex items-center gap-5 w-full md:w-[40%]'>

                                        <img
                                            src={product.image1}
                                            alt=""
                                            className='w-[120px] h-[120px] object-cover rounded-2xl'
                                        />

                                        <div>

                                            <h2 className='text-2xl font-semibold'>
                                                {product.name}
                                            </h2>

                                            <p className='text-cyan-300 mt-2'>
                                                Size : {item.size}
                                            </p>

                                            <p className='text-xl mt-2'>
                                                {currency}{product.price}
                                            </p>

                                        </div>

                                    </div>

                                    <div className='flex items-center gap-4'>

                                        <button
                                            className='w-[40px] h-[40px] rounded-full bg-white text-black text-xl'
                                            onClick={() =>
                                                updateQuantity(
                                                    item._id,
                                                    item.size,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span className='text-2xl'>
                                            {item.quantity}
                                        </span>

                                        <button
                                            className='w-[40px] h-[40px] rounded-full bg-cyan-400 text-black text-xl'
                                            onClick={() =>
                                                updateQuantity(
                                                    item._id,
                                                    item.size,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className='flex items-center gap-5'>

                                        <p className='text-2xl font-bold'>
                                            {currency}
                                            {product.price * item.quantity}
                                        </p>

                                        <MdDelete
                                            className='text-red-500 w-[32px] h-[32px] cursor-pointer'
                                            onClick={() =>
                                                updateQuantity(
                                                    item._id,
                                                    item.size,
                                                    0
                                                )
                                            }
                                        />

                                    </div>

                                </div>
                            )
                        })
                }

            </div>

            {
                cartData.length > 0 &&

                <div className='w-full md:w-[400px] ml-auto mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5'>

                    <h2 className='text-3xl font-bold'>
                        Cart Total
                    </h2>

                    <div className='flex justify-between text-lg'>
                        <span>Subtotal</span>
                        <span>{currency}{subtotal}</span>
                    </div>

                    <div className='flex justify-between text-lg'>
                        <span>Delivery Fee</span>
                        <span>{currency}{delivery_fee}</span>
                    </div>

                    <hr className='border-gray-700' />

                    <div className='flex justify-between text-2xl font-bold'>
                        <span>Total</span>
                        <span>{currency}{subtotal + delivery_fee}</span>
                    </div>

                    <button
                        onClick={() => window.location.href = "/placeorder"}
                        className='w-full py-4 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-[102%] duration-300'
                    >
                        Proceed To Checkout
                    </button>

                </div>
            }

        </div>
    )
}

export default Cart