import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Hero from '../component/Hero'

import back1 from '../assets/E-commerce MERN Assets/back1.png'
import back2 from '../assets/E-commerce MERN Assets/back2.png'
import back3 from '../assets/E-commerce MERN Assets/back3.png'
import back4 from '../assets/E-commerce MERN Assets/back4.png'

import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import AiAssistant from '../component/AiAssistant'

export default function Home() {

  const heroData = [

    {
      text1: "30% OFF Limited Offer",
      text2: "Style that Accessories Sale!"
    },

    {
      text1: "Discover the Best of Bold Fashion",
      text2: "Limited Time Only!"
    },

    {
      text1: "Explore Our Best Collection",
      text2: "Shop Now!"
    },

    {
      text1: "Choose your Perfect Fashion Fit",
      text2: "Now on Sale!"
    }

  ]

  const images = [back1, back2, back3, back4]

  const [heroCount, setHeroCount] = useState(0)

useEffect(() => {

  const interval = setInterval(() => {

    setHeroCount((prev) =>
      prev === 3 ? 0 : prev + 1
    )

  }, 3000)

  const script = document.createElement("script")

  script.src =
    "https://ai-customer-support-saa-s-platform.vercel.app/chatBot.js"

  script.async = true

  script.setAttribute(
    "data-owner-id",
    "usr_124031414378169090"
  )

  document.body.appendChild(script)

  return () => {

    clearInterval(interval)

    document.body.removeChild(script)

  }

}, [])
  

  return (

    <div className='overflow-x-hidden pt-[70px]'>

      {/* HERO SECTION */}

      <div
        className='

        w-full
        min-h-screen

        grid

        grid-cols-1
        lg:grid-cols-[40%_60%]

      '
      >

        {/* LEFT */}

        <div
          className='
          bg-[#0c2025]
          relative

          flex
          items-center
          justify-center

          min-h-[50vh]
          lg:min-h-screen
        '
        >

          <Nav />

          <Hero
            heroData={heroData[heroCount]}
            heroCount={heroCount}
            setHeroCount={setHeroCount}
          />

        </div>

        {/* RIGHT IMAGE */}

        <div
          className='
          min-h-[50vh]
          lg:min-h-screen

          bg-cover
          bg-center
          duration-500
        '
          style={{
            backgroundImage: `url(${images[heroCount]})`
          }}
        />

      </div>

      {/* OTHER SECTIONS */}

      <Product />

      <OurPolicy />

      <NewLetterBox />
      <script
        src="https://ai-customer-support-saa-s-platform.vercel.app/chatBot.js"
        data-owner-id="usr_124031414378169090">
      </script>
      <AiAssistant />
      <Footer />

    </div>
  )
}