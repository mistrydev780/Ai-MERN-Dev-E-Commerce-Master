import React from 'react'
import { FaCircle } from "react-icons/fa"

function Hero({

  heroData,
  heroCount,
  setHeroCount

}) {

  return (

    <div
      className='

      w-full
      h-full

      flex
      flex-col
      justify-center

      px-[8%]

      relative
      z-10
    '
    >

      {/* TEXT */}

      <div className='flex flex-col gap-5'>

        <h1
          className='

          text-[#88d9ee]

          text-[32px]
          sm:text-[45px]
          md:text-[60px]
          lg:text-[75px]

          font-bold
          leading-tight
        '
        >
          {heroData.text1}
        </h1>

        <p
          className='

          text-white

          text-[18px]
          sm:text-[24px]
          md:text-[30px]

          max-w-[600px]
        '
        >
          {heroData.text2}
        </p>

      </div>

      {/* DOTS */}

      <div
        className='

        flex
        items-center

        gap-4

        mt-10
      '
      >

        <FaCircle
          className={`

          cursor-pointer
          duration-300

          ${heroCount === 0

              ? "fill-orange-400 scale-125"

              : "fill-white"
            }
        `}
          onClick={() => setHeroCount(0)}
        />

        <FaCircle
          className={`

          cursor-pointer
          duration-300

          ${heroCount === 1

              ? "fill-orange-400 scale-125"

              : "fill-white"
            }
        `}
          onClick={() => setHeroCount(1)}
        />

        <FaCircle
          className={`

          cursor-pointer
          duration-300

          ${heroCount === 2

              ? "fill-orange-400 scale-125"

              : "fill-white"
            }
        `}
          onClick={() => setHeroCount(2)}
        />

        <FaCircle
          className={`

          cursor-pointer
          duration-300

          ${heroCount === 3

              ? "fill-orange-400 scale-125"

              : "fill-white"
            }
        `}
          onClick={() => setHeroCount(3)}
        />

      </div>

    </div>
  )
}

export default Hero