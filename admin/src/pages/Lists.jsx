import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../contex/AuthContext'
import axios from 'axios'

function Lists() {

  const navigate = useNavigate()

  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const [showModal, setShowModal] = useState(false)

  const [selectedId, setSelectedId] = useState(null)

  const [loadingDelete, setLoadingDelete] = useState(false)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  const removeList = async () => {

    try {

      setLoadingDelete(true)

      let result = await axios.post(

        `${serverUrl}/api/product/remove/${selectedId}`,

        {},

        { withCredentials: true }

      )

      if (result.data) {

        fetchList()

        setShowModal(false)

        setSelectedId(null)

      } else {

        console.log("Failed to remove Product")
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoadingDelete(false)
    }
  }

  useState(() => {
    fetchList()
  })

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

    {/* PAGE TITLE */}

    <div className='mb-10'>

      <h1
        className='
          text-4xl
          md:text-6xl
          font-extrabold

          bg-gradient-to-r
          from-white
          to-cyan-400

          bg-clip-text
          text-transparent
        '
      >
        All Listed Products
      </h1>

      <p className='text-gray-400 mt-3 text-lg'>
        Manage all uploaded products from your store
      </p>

    </div>

    {/* PRODUCTS */}

    <div className='flex flex-col gap-6'>

      {
        list?.length > 0 ? (

          list.map((item, index) => (

            <div

              key={index}

              className='
                w-full

                bg-white/5
                backdrop-blur-xl

                border
                border-white/10

                rounded-3xl

                p-5

                flex
                items-center
                justify-between

                hover:scale-[101%]
                hover:border-cyan-400/20

                duration-300

                shadow-xl
              '
            >

              {/* LEFT */}

              <div className='flex items-center gap-6'>

                <img
                  src={item.image1}
                  alt=""
                  className='
                    w-[90px]
                    h-[90px]

                    md:w-[120px]
                    md:h-[120px]

                    object-cover
                    rounded-2xl

                    border
                    border-white/10
                  '
                />

                <div className='flex flex-col gap-2'>

                  <h2 className='text-2xl font-bold text-cyan-300'>
                    {item.name}
                  </h2>

                  <p className='text-gray-300'>
                    Category :
                    {" "}
                    {item.category}
                  </p>

                  <p className='text-gray-300'>
                    SubCategory :
                    {" "}
                    {item.subCategory}
                  </p>

                  <p className='text-2xl font-bold text-white'>
                    ₹{item.price}
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className='flex items-center gap-4'>

                {/* EDIT BUTTON */}

<button

onClick={() => navigate(`/edit/${item._id}`)}

className='
px-6
py-3

rounded-2xl

bg-cyan-400
hover:bg-cyan-500

text-black
font-semibold

duration-300
'
>
Edit
</button>

                {/* DELETE BUTTON */}

                <button

                  onClick={() => {

                    setSelectedId(item._id)

                    setShowModal(true)

                  }}

                  className='
                    px-6
                    py-3

                    rounded-2xl

                    bg-red-500
                    hover:bg-red-600

                    text-white
                    font-semibold

                    duration-300
                  '
                >
                  Delete
                </button>

              </div>

            </div>
          ))

        ) : (

          <div
            className='
              w-full
              h-[300px]

              flex
              items-center
              justify-center

              bg-white/5
              border
              border-white/10

              rounded-3xl

              text-2xl
              text-gray-400
            '
          >
            No Products Available
          </div>
        )
      }

    </div>

    {/* DELETE MODAL */}

    <AnimatePresence>

      {
        showModal && (

          <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            className='
              fixed
              inset-0

              bg-black/70
              backdrop-blur-sm

              z-[999]

              flex
              items-center
              justify-center
            '
          >

            <motion.div

              initial={{
                scale: 0.8,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              exit={{
                scale: 0.8,
                opacity: 0
              }}

              className='
                w-[90%]
                max-w-md

                bg-[#07131a]

                border
                border-red-500/20

                rounded-3xl

                p-8

                shadow-2xl
                shadow-red-500/20
              '
            >

              <h2 className='text-3xl font-bold text-white mb-4'>
                Delete Product
              </h2>

              <p className='text-gray-300 mb-8 leading-relaxed'>
                Are you sure you want to delete this product?
                This action cannot be undone.
              </p>

              <div className='flex justify-end gap-4'>

                {/* CANCEL */}

                <button

                  onClick={() => {

                    setShowModal(false)

                    setSelectedId(null)

                  }}

                  className='
                    px-6
                    py-3

                    rounded-2xl

                    bg-white/10
                    hover:bg-white/20

                    text-white

                    duration-300
                  '
                >
                  Cancel
                </button>
                

                {/* DELETE */}

                <button

                  onClick={removeList}

                  disabled={loadingDelete}

                  className='
                    px-6
                    py-3

                    rounded-2xl

                    bg-red-500
                    hover:bg-red-600

                    text-white
                    font-semibold

                    duration-300
                  '
                >
                  {
                    loadingDelete
                      ? "Deleting..."
                      : "Delete"
                  }
                </button>

              </div>

            </motion.div>

          </motion.div>
        )
      }

    </AnimatePresence>

  </div>
)}

export default Lists