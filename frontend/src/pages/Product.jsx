import React from 'react'

import BestSeller from '../component/BestSeller'
import LatestCollection from '../component/LatestCollectiom'

function Product() {

  return (

    <div
      className='
        w-full
        min-h-screen

        bg-gradient-to-l
        from-[#141414]
        to-[#0c2025]

        flex
        items-center
        justify-start
        flex-col

        py-[20px]
      '
    >

      {/* LATEST COLLECTION */}

      <div
        className='
          w-full
          min-h-[70px]

          flex
          items-center
          justify-center

          gap-[10px]
          flex-col
        '
      >
        <LatestCollection />
      </div>

      {/* BEST SELLER */}

      <div
        className='
          w-full
          min-h-[70px]

          flex
          items-center
          justify-center

          gap-[10px]
          flex-col
        '
      >
        <BestSeller />
      </div>

    </div>
  )
}

export default Product