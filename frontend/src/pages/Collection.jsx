import React, { useContext, useEffect, useState } from 'react'
import ProductSkeleton from '../component/ProductSkeleton'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../Context/ShopContext';
import Card from '../component/Card';



function Collection() {

  let [showFilter, setShowFilter] = useState(false)
  let { products, search, showSearch } = useContext(shopDataContext)
  let [filterProduct, setFilterProduct] = useState([])
  let [category, setCategory] = useState([])
  let [subCategory, setSubCategory] = useState([])
  let [sortType, setSortType] = useState("relevant")
  const [visible, setVisible] = useState(8)
  const [loading, setLoading] = useState(true)

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = () => {

    let productCopy = [...products]

    // SEARCH

    if (showSearch && search) {

      productCopy = productCopy.filter((item) =>

        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    // CATEGORY

    if (category.length > 0) {

      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      )
    }

    // SUBCATEGORY

    if (subCategory.length > 0) {

      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      )
    }

    // SORTING

    if (sortType === "low-high") {

      productCopy.sort((a, b) => a.price - b.price)
    }

    else if (sortType === "high-low") {

      productCopy.sort((a, b) => b.price - a.price)
    }

    setFilterProduct(productCopy)
  }

  useEffect(() => {
      if(products.length > 0){

    setLoading(false)
  }
    setFilterProduct(products)
  }, [products])

  useEffect(() => {

    applyFilter()

  }, [products, category, subCategory, search, showSearch, sortType])

  useEffect(() => {

  setVisible(8)

}, [category, subCategory, search, sortType])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2]'>

      <div className='md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed'>

        <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer'
          onClick={() => setShowFilter(prev => !prev)}>
          FILTERS
          {!showFilter && <FaArrowRight className='text-[18px] md:hidden' />}
          {showFilter && <FaArrowDown className='text-[18px] md:hidden' />}
        </p>

        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>

          <p className='text-[18px] text-[#f8fafa]'>
            CATEGORIES
          </p>

          <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>

            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>

              <input
                type="checkbox"
                value={'Men'}
                className='w-3'
                onChange={toggleCategory}
              />

              Men

            </p>

            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>

              <input
                type="checkbox"
                value={'Women'}
                className='w-3'
                onChange={toggleCategory}

              />

              Women

            </p>

            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>

              <input
                type="checkbox"
                value={'Kids'}
                className='w-3'
                onChange={toggleCategory}

              />

              Kids

            </p>

          </div>
        </div>

        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>


          <p className='text-[18px] text-[#f8fafa]'>
            SUB-CATEGORIES
          </p>

          <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>

            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>

              <input
                type="checkbox"
                value={'TopWear'}
                className='w-3'
                onChange={toggleSubCategory}

              />

              TopWear

            </p>

            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>

              <input
                type="checkbox"
                value={'BottomWear'}
                className='w-3'
                onChange={toggleSubCategory}

              />

              BottomWear

            </p>

            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>

              <input
                type="checkbox"
                value={'WinterWear'}
                className='w-3'
                onChange={toggleSubCategory}

              />

              WinterWear

            </p>

          </div>
        </div>

      </div>

      <div className='lg:pl-[20%] md:py-[10px]'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>

          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            name=""
            id=""
            className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px]'
            onChange={(e) => setSortType(e.target.value)}
          >

            <option value="relevant" className='w-[100%] h-[100%]'>
              Sort By: relevant
            </option>

            <option value="low-high" className='w-[100%] h-[100%]'>
              Sort By: Low to High
            </option>

            <option value="high-low" className='w-[100%] h-[100%]'>
              Sort By: High to Low
            </option>

          </select>

        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center
      flex-wrap gap-[30px]'>
       {
  loading

  ?

  Array(8).fill("").map((_, index) => (

    <ProductSkeleton key={index} />

  ))

  :

  filterProduct.slice(0, visible).map((item, index) => (

    <Card
      key={index}
      id={item._id}
      name={item.name}
      price={item.price}
      image={item.image1}
    />
  ))
}
        </div>
        {
  visible < filterProduct.length && (

    <div className='w-full flex items-center justify-center mt-10 mb-10'>

      <button

        onClick={() => setVisible((prev) => prev + 4)}

        className='
          px-8
          py-4

          rounded-2xl

          bg-cyan-400
          hover:bg-cyan-500

          text-black
          font-bold

          shadow-lg
          shadow-cyan-500/30

          duration-300
        '
      >
        Load More
      </button>

    </div>
  )
}
      </div>

    </div>
  )
}

export default Collection
