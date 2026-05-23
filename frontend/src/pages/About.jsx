import React from 'react'
import about from '../assets/E-commerce MERN Assets/about.png'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-[99vw] md:w-[100vw] min-h-[100vh] flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] gap-[50px]'>

      <Title text1={'ABOUT'} text2={'US'} />

      <div className='w-[90%] flex flex-col lg:flex-row items-center justify-center gap-[40px]'>

        {/* LEFT SIDE IMAGE */}
        <div className='lg:w-[50%] w-[100%] flex justify-center'>
          <img
            src={about}
            alt=""
            className='lg:w-[70%] w-[90%] rounded-lg shadow-lg shadow-black'
          />
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className='lg:w-[50%] w-[100%] flex flex-col gap-[15px] text-left'>

          <p className='text-white md:text-[16px] text-[13px] leading-relaxed'>
            OneCart born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>

          <p className='text-white md:text-[16px] text-[13px] leading-relaxed'>
            For modern shoppers—combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you'll love.
          </p>

          <p className='text-[18px] text-white font-bold mt-[10px]'>
            Our Mission
          </p>

          <p className='text-white md:text-[16px] text-[13px] leading-relaxed'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>

        </div>

      </div>

      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>

        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px]'>

          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]'>

            <b className='text-[20px] font-semibold text-[#bff1f9]'>
              Quality Assurance
            </b>

            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always</p>

          </div>

           <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]'>

            <b className='text-[20px] font-semibold text-[#bff1f9]'>
              Convenience
            </b>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste repudiandae reiciendis autem explicabo necessitatibus atque, blanditiis aliquid, numquam enim.</p>

          </div>


 <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]'>

            <b className='text-[20px] font-semibold text-[#bff1f9]'>
             Exceptional Customer Service
            </b>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, repellendus quibusdam libero dolores magni vero quas eligendi perferendis atque at totam commodi!</p>

          </div>


        </div>

      </div>
      <NewLetterBox />

    </div>
  )
}

export default About