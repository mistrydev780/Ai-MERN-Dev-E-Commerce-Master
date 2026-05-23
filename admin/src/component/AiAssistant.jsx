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

    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {

    const SpeechRecognition =

      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"

    recognition.continuous = false

    recognition.interimResults = false

    recognition.maxAlternatives = 1

    recognition.onstart = () => {

      setListening(true)
    }

    recognition.onend = () => {

      setListening(false)
    }

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript.toLowerCase()

      console.log("VOICE => ", transcript)

      // DASHBOARD

      if (
        transcript.includes("dashboard") ||
        transcript.includes("home")
      ) {

        speak("Opening dashboard")

        navigate("/")
      }

      // ADD PRODUCT

      else if (
        transcript.includes("add") ||
        transcript.includes("product")
      ) {

        speak("Opening add product")

        navigate("/add")
      }

      // PRODUCT LIST

      else if (
        transcript.includes("list") ||
        transcript.includes("products")
      ) {

        speak("Opening product list")

        navigate("/lists")
      }

      // ORDERS

      else if (
        transcript.includes("orders") ||
        transcript.includes("order")
      ) {

        speak("Opening orders")

        navigate("/orders")
      }

      else {

        speak("Command not recognized")
      }
    }

    recognition.onerror = () => {

      setListening(false)

      speak("Something went wrong")
    }

    recognitionRef.current = recognition

  }, [navigate])

  const startListening = () => {

    recognitionRef.current?.start()
  }

  return (

    <motion.div

      initial={{ scale: 0 }}

      animate={{ scale: 1 }}

      transition={{ duration: 0.5 }}

      className='

      fixed

      bottom-6
      right-6

      z-[999]
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
        Admin AI
      </p>

      {/* MAIN BUTTON */}

      <motion.div

        onClick={startListening}

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

        cursor-pointer
      '
      >

        {/* OUTER ROTATING RING */}

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

        {/* INNER ROTATING RING */}

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