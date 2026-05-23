
import React, { useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/uploadimg.png'
import axios from 'axios'

function Add() {

  const [loading, setLoading] = useState(false)

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const serverUrl = "http://localhost:8000"

  const toggleSize = (size) => {
    setSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((item) => item !== size)
      } else {
        return [...prev, size]
      }
    })
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setPrice("")
    setCategory("Men")
    setSubCategory("TopWear")
    setBestSeller(false)
    setSizes([])

    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()

    if (sizes.length === 0) {
      alert("Please select at least one size")
      return
    }

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      console.log(sizes)

      const result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        {
          withCredentials: true
        }
      )

      console.log(result.data)

      alert("Product Added Successfully 🔥")

      resetForm()

    } catch (error) {
      console.log(error)
      alert("Product Upload Failed")
    }
    finally {
      setLoading(false)
    }
  }

  const sizeList = ["S", "M", "L", "XL", "XXL"]

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
overflow-hidden
'
>

     

     <div className='w-full flex justify-center'>

        <form
          onSubmit={handleAddProduct}
          className='w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col gap-8'
        >

          <div>
            <h1 className='text-3xl md:text-5xl font-bold'>
              Add Product
            </h1>

            <p className='text-gray-400 mt-2'>
              Upload premium products to your store
            </p>
          </div>

          {/* Upload Images */}

          <div className='flex flex-col gap-4'>

            <p className='text-xl font-semibold'>
              Upload Images
            </p>

            <div className='flex flex-wrap gap-5'>

              {[1,2,3,4].map((item)=>{

                const image =
                  item === 1 ? image1 :
                  item === 2 ? image2 :
                  item === 3 ? image3 :
                  image4

                const setImage =
                  item === 1 ? setImage1 :
                  item === 2 ? setImage2 :
                  item === 3 ? setImage3 :
                  setImage4

                return(
                  <label
                    key={item}
                    htmlFor={`image${item}`}
                    className='w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-dashed border-cyan-400 cursor-pointer hover:scale-105 duration-300'
                  >

                    <img
                      src={!image ? upload : URL.createObjectURL(image)}
                      alt=""
                      className='w-full h-full object-cover'
                    />

                    <input
                      type="file"
                      id={`image${item}`}
                      hidden
                      onChange={(e)=>setImage(e.target.files[0])}
                    />

                  </label>
                )
              })}

            </div>
          </div>

          {/* Product Name */}

          <div className='flex flex-col gap-3'>

            <p className='text-xl font-semibold'>
              Product Name
            </p>

            <input
              type="text"
              placeholder='Enter product name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className='w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400'
              required
            />

          </div>

          {/* Description */}

          <div className='flex flex-col gap-3'>

            <p className='text-xl font-semibold'>
              Product Description
            </p>

            <textarea
              placeholder='Write product description'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className='w-full h-36 bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 resize-none'
              required
            />

          </div>

          {/* Category */}

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

            <div className='flex flex-col gap-3'>

              <p className='text-xl font-semibold'>
                Category
              </p>

              <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400'
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>

            </div>

            <div className='flex flex-col gap-3'>

              <p className='text-xl font-semibold'>
                Sub Category
              </p>

              <select
                value={subCategory}
                onChange={(e)=>setSubCategory(e.target.value)}
                className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400'
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>

            </div>

            <div className='flex flex-col gap-3'>

              <p className='text-xl font-semibold'>
                Product Price
              </p>

              <input
                type="number"
                placeholder='₹ 2000'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className='bg-[#1a1a1a] border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400'
                required
              />

            </div>

          </div>

          {/* Sizes */}

          <div className='flex flex-col gap-4'>

            <p className='text-xl font-semibold'>
              Product Sizes
            </p>

            <div className='flex flex-wrap gap-4'>

              {
                sizeList.map((item,index)=>(
                  <button
                    type='button'
                    key={index}
                    onClick={()=>toggleSize(item)}
                    className={`px-6 py-3 rounded-xl border transition-all duration-300 font-semibold
                    ${sizes.includes(item)
                      ? "bg-cyan-400 text-black border-cyan-400 scale-105"
                      : "bg-[#1a1a1a] border-gray-700 hover:border-cyan-400"
                    }`}
                  >
                    {item}
                  </button>
                ))
              }

            </div>

          </div>

          {/* Bestseller */}

          <div className='flex items-center gap-4'>

            <input
              type="checkbox"
              checked={bestSeller}
              onChange={()=>setBestSeller(prev => !prev)}
              className='w-6 h-6 cursor-pointer accent-cyan-400'
            />

            <p className='text-lg font-medium'>
              Add to BestSeller
            </p>

          </div>

          {/* Submit */}

          <button
            disabled={loading}
            className='w-full md:w-[250px] py-4 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-105 duration-300 disabled:opacity-50'
          >
            {
              loading ? "Uploading..." : "Add Product"
            }
          </button>

        </form>

      </div>

    </div>
  )
}

export default Add

