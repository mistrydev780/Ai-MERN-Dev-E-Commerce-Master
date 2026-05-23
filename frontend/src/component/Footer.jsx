import React from 'react'
import logo from '../assets/E-commerce MERN Assets/logo.png'

function Footer() {
    return (
        <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>

            <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]'>

                <div className='md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px]'>

                    <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]'>

                        <img
                            src={logo}
                            alt=""
                            className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]'
                        />

                        <p className='text-[19px] md:text-[20px] text-[black]'>
                            Dev-E-Commerce
                        </p>
                    </div>
                      <p className='text-[15px] text-[#1e2223] hidden md:block'>   Dev-E-Commerce is Your all-in-One online shopping destination, Offering top-quality Products, unbeatable deals, and
                            fast delivery-all backed by trusted service destination to make your life easier every day.
                        </p>
                        <p className='text-[15px] text-[#1e2223] hidden md:hidden'>Fast. Easy. Reliable.  Dev-E-Commerce Shopping</p>

                  

                </div>
                  <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>

                        <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>

                            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>
                                COMPANY
                            </p>

                        </div>

                        <ul>

                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>
                                Home
                            </li>

                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
                                About us
                            </li>

                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>
                                Delivery
                            </li>

                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
                                Privacy Policy
                            </li>

                        </ul>

                    </div>

                    <div className='w-[40%] h-[100%] flex items-center justify-center flex-col text-center'>
                          <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>

                            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>
                                GET IN TOUCH
                            </p>

                        </div>
                            <ul>

                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>
                               +91-9408836030
                            </li>

                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
                             contact@devecommerce.com
                            </li>

                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>
                               +1-123-456-7890
                            </li>

                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
                               admin@devecommerce.com
                            </li>

                        </ul> </div>

            </div>
            <div className='w-[100%] h-[1px] bg-slate-400'></div>
                 <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'>Copyright 2026@devecommerce. com-All Rights Reserved</div>

        </div>
    )
}

export default Footer
