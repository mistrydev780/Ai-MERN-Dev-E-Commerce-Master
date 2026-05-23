import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function AiAssistant() {

    const navigate = useNavigate()

    const [listening, setListening] = useState(false)

    const recognitionRef = useRef(null)

    const speak = (text) => {

        const utterance = new SpeechSynthesisUtterance(text)

        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1

        const voices = window.speechSynthesis.getVoices()

        const femaleVoice = voices.find(

            voice =>

                voice.name.includes("Female") ||

                voice.name.includes("Google UK English Female")
        )

        if (femaleVoice) {

            utterance.voice = femaleVoice
        }

        window.speechSynthesis.speak(utterance)
    }

    useEffect(() => {

        const SpeechRecognition =

            window.SpeechRecognition ||

            window.webkitSpeechRecognition

        if (!SpeechRecognition) {

            return
        }

        const recognition = new SpeechRecognition()

        recognition.continuous = false

        recognition.lang = "en-US"

        recognition.interimResults = false

        recognition.maxAlternatives = 1

        recognition.onresult = (event) => {

            const transcript =

                event.results[0][0].transcript.toLowerCase()

            console.log("VOICE => ", transcript)

            // HOME

            if (transcript.includes("home")) {

                speak("Opening home page")

                navigate("/")
            }

            // COLLECTION

            else if (

                transcript.includes("collection") ||

                transcript.includes("shop")
            ) {

                speak("Opening collections")

                navigate("/collection")
            }

            // CART

            else if (transcript.includes("cart")) {

                speak("Opening your cart")

                navigate("/cart")
            }

            // ORDERS

            else if (

                transcript.includes("orders") ||

                transcript.includes("my orders")
            ) {

                speak("Opening your orders")

                navigate("/myorders")
            }

            // CONTACT

            else if (transcript.includes("contact")) {

                speak("Opening contact page")

                navigate("/contact")
            }

            // ABOUT

            else if (transcript.includes("about")) {

                speak("Opening about page")

                navigate("/about")
            }

            // TSHIRT

            else if (

                transcript.includes("t shirt") ||

                transcript.includes("tshirt")
            ) {

                speak("Opening t shirts collection")

                navigate("/collection")
            }

            // JACKET

            else if (

                transcript.includes("jacket") ||

                transcript.includes("jackets")
            ) {

                speak("Opening jackets collection")

                navigate("/collection")
            }

            // SHOES

            else if (

                transcript.includes("shoe") ||

                transcript.includes("shoes")
            ) {

                speak("Opening shoes collection")

                navigate("/collection")
            }

            else {

                speak("Sorry, command not recognized")
            }
        }

        recognition.onstart = () => {

            setListening(true)
        }

        recognition.onend = () => {

            setListening(false)
        }

        recognition.onerror = () => {

            setListening(false)

            speak("Something went wrong")
        }

        recognitionRef.current = recognition

    }, [navigate])

    const startListening = () => {

        if (recognitionRef.current) {

            recognitionRef.current.start()
        }
    }

    return (

        <motion.div

            initial={{ scale: 0 }}

            animate={{ scale: 1 }}

            transition={{ duration: 0.5 }}

            onClick={startListening}

            className='

            fixed

            bottom-6
            right-6

            z-[999]

            cursor-pointer
            '
        >

            {/* AI TEXT */}

            <p
                className='

                text-cyan-300
                text-sm

                mb-3

                text-center

                animate-pulse
                '
            >
                AI Assistant
            </p>

            {/* MAIN BUTTON */}

            <motion.div

                animate={

                    listening

                        ? {

                            scale: [1, 1.15, 1],

                            boxShadow: [

                                "0 0 20px #06b6d4",

                                "0 0 70px #06b6d4",

                                "0 0 20px #06b6d4"
                            ]
                        }

                        : {}
                }

                transition={{

                    duration: 1.5,

                    repeat: Infinity
                }}

                className='

                relative

                w-[82px]
                h-[82px]

                rounded-full

                bg-black/40
                backdrop-blur-xl

                border
                border-cyan-400/30

                flex
                items-center
                justify-center

                shadow-[0_0_40px_rgba(34,211,238,0.7)]

                overflow-hidden
                '
            >

                {/* ROTATING RING */}

                <motion.div

                    animate={{ rotate: 360 }}

                    transition={{

                        duration: 6,

                        repeat: Infinity,

                        ease: "linear"
                    }}

                    className='

                    absolute

                    w-full
                    h-full

                    rounded-full

                    border-[3px]
                    border-cyan-400/20

                    border-t-cyan-400
                    '
                />

                {/* SECOND RING */}

                <motion.div

                    animate={{ rotate: -360 }}

                    transition={{

                        duration: 8,

                        repeat: Infinity,

                        ease: "linear"
                    }}

                    className='

                    absolute

                    w-[65px]
                    h-[65px]

                    rounded-full

                    border-[2px]
                    border-blue-400/20

                    border-b-blue-400
                    '
                />

                {/* CENTER AI ORB */}

                <div
                    className='

                    relative

                    w-[34px]
                    h-[34px]

                    rounded-full

                    bg-white

                    flex
                    items-center
                    justify-center
                    '
                >

                    {/* PULSE */}

                    <div
                        className='

                        absolute

                        w-[16px]
                        h-[16px]

                        rounded-full

                        bg-cyan-500

                        animate-ping
                        '
                    />

                    {/* CENTER DOT */}

                    <div
                        className='

                        w-[16px]
                        h-[16px]

                        rounded-full

                        bg-cyan-500

                        z-10
                        '
                    />

                </div>

            </motion.div>

        </motion.div>
    )
}

export default AiAssistant