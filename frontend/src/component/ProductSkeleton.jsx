import React from 'react'

function ProductSkeleton() {

  return (

    <div
      className='
        w-[300px]
        max-w-[90%]

        h-[400px]

        rounded-3xl

        bg-white/5

        border
        border-white/10

        p-4

        animate-pulse
      '
    >

      {/* IMAGE */}

      <div
        className='
          w-full
          h-[75%]

          rounded-2xl

          bg-white/10
        '
      />

      {/* TITLE */}

      <div
        className='
          w-[80%]
          h-[20px]

          mt-5

          rounded-full

          bg-white/10
        '
      />

      {/* PRICE */}

      <div
        className='
          w-[40%]
          h-[18px]

          mt-4

          rounded-full

          bg-white/10
        '
      />

    </div>
  )
}

export default ProductSkeleton