import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

import { authDataContext } from '../contex/AuthContext'

function Edit() {

    const { id } = useParams()

    const navigate = useNavigate()

    const { serverUrl } = useContext(authDataContext)

    const [product, setProduct] = useState(null)

    const [loading, setLoading] = useState(false)

    const getProduct = async () => {

        try {

            const result = await axios.get(
                serverUrl + "/api/product/list"
            )

            const singleProduct = result.data.find(
                (item) => item._id === id
            )

            setProduct(singleProduct)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            await axios.put(

                serverUrl + `/api/product/update/${id}`,

                product,

                { withCredentials: true }

            )

            alert("Product Updated Successfully 🔥")

            navigate("/lists")

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
        }
    }

    if (!product) {

        return (

            <div
                className='
                min-h-screen
                ml-[260px]
                pt-[100px]

                flex
                items-center
                justify-center

                text-white
                text-3xl
            '
            >
                Loading...
            </div>
        )
    }

    return (

        <div
            className='
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

            <h1
                className='
                    text-5xl
                    font-extrabold

                    mb-10

                    bg-gradient-to-r
                    from-white
                    to-cyan-400

                    bg-clip-text
                    text-transparent
                '
            >
                Edit Product
            </h1>

            <form

                onSubmit={handleUpdate}

                className='
                    w-full
                    max-w-5xl

                    bg-white/5
                    backdrop-blur-xl

                    border
                    border-white/10

                    rounded-3xl

                    p-10

                    flex
                    flex-col
                    gap-8
                '
            >

                {/* NAME */}

                <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            name: e.target.value
                        })
                    }

                    placeholder='Product Name'

                    className='
                        w-full
                        p-4

                        rounded-2xl

                        bg-black/20
                        border
                        border-white/10

                        outline-none
                    '
                />

                {/* DESCRIPTION */}

                <textarea

                    value={product.description}

                    onChange={(e) =>
                        setProduct({
                            ...product,
                            description: e.target.value
                        })
                    }

                    rows={5}

                    placeholder='Description'

                    className='
                        w-full
                        p-4

                        rounded-2xl

                        bg-black/20
                        border
                        border-white/10

                        outline-none
                    '
                />

                {/* PRICE */}

                <input

                    type="number"

                    value={product.price}

                    onChange={(e) =>
                        setProduct({
                            ...product,
                            price: e.target.value
                        })
                    }

                    placeholder='Price'

                    className='
                        w-full
                        p-4

                        rounded-2xl

                        bg-black/20
                        border
                        border-white/10

                        outline-none
                    '
                />

                {/* CATEGORY */}

                <input

                    type="text"

                    value={product.category}

                    onChange={(e) =>
                        setProduct({
                            ...product,
                            category: e.target.value
                        })
                    }

                    placeholder='Category'

                    className='
                        w-full
                        p-4

                        rounded-2xl

                        bg-black/20
                        border
                        border-white/10

                        outline-none
                    '
                />

                {/* SUBCATEGORY */}

                <input

                    type="text"

                    value={product.subCategory}

                    onChange={(e) =>
                        setProduct({
                            ...product,
                            subCategory: e.target.value
                        })
                    }

                    placeholder='SubCategory'

                    className='
                        w-full
                        p-4

                        rounded-2xl

                        bg-black/20
                        border
                        border-white/10

                        outline-none
                    '
                />

                {/* BESTSELLER */}

                <div className='flex items-center gap-4'>

                    <input

                        type="checkbox"

                        checked={product.bestSeller}

                        onChange={(e) =>
                            setProduct({
                                ...product,
                                bestSeller: e.target.checked
                            })
                        }
                    />

                    <p>Bestseller Product</p>

                </div>

                {/* BUTTON */}

                <button

                    disabled={loading}

                    className='
                        w-full

                        py-4

                        rounded-2xl

                        bg-cyan-400
                        hover:bg-cyan-500

                        text-black
                        font-bold

                        text-lg

                        duration-300
                    '
                >
                    {
                        loading
                            ? "Updating..."
                            : "Update Product"
                    }
                </button>

            </form>

        </div>
    )
}

export default Edit