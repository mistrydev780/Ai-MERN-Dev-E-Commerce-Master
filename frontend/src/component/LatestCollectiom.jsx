import React, { useContext, useEffect, useState } from 'react'

import { shopDataContext } from '../Context/ShopContext'

import Card from './Card'
import Title from './Title'

import ProductSkeleton from './ProductSkeleton'

function LatestCollectiom() {

  const { products } = useContext(shopDataContext)

  const [latestProducts, setLatestProducts] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (products.length > 0) {

      setLatestProducts(products.slice(0, 8))

      setLoading(false)
    }

  }, [products])

  return (

    <div className='w-full'>

      {/* TITLE */}

      <div className='w-full text-center md:mt-[50px]'>

        <Title
          text1={"LATEST"}
          text2={"COLLECTIONS"}
        />

        <p
          className='
            w-full

            m-auto

            text-[13px]
            md:text-[20px]

            px-[10px]

            text-blue-100
          '
        >
          Step Into Style ✨ New Collection Dropping This Season!
        </p>

      </div>

      {/* PRODUCTS */}

      <div
        className='
          w-full

          mt-[40px]

          flex
          items-start
          justify-center

          flex-wrap

          gap-[40px]
        '
      >

        {
          loading

            ?

            Array(8).fill("").map((_, index) => (

              <ProductSkeleton key={index} />

            ))

            :

            latestProducts.map((item, index) => (

              <Card

                key={index}

                name={item.name}

                image={item.image1}

                id={item._id}

                price={item.price}
              />
            ))
        }

      </div>

    </div>
  )
}

export default LatestCollectiom