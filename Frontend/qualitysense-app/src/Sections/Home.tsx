import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const line1: string = "Effortlessly assess your data quality and uncover valuable insights with AI, helping you achieve smarter data-driven decisions.";

const transition = { duration: 1, ease: [.25, .1, .25, 1] };
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.02,
    }
  }
}

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToGenerate = () => {
    navigate('/generate');
  }

  return (
    <section 
      className='bg-darkbg w-full flex min-h-screen flex-col items-center pb-20 justify-center relative'
    >
    <motion.div
      className="bg-darkbg w-full flex min-h-screen flex-col items-center pb-20 justify-center relative"
      initial="hidden"
      whileInView="visible"
      variants={variants}
      transition={transition}
    >
      <div className='absolute z-0 w-[40%] h-[40%] top-0 left-0 transform rotate-12 blue__gradient'></div>

      <div className='absolute z-0 w-[30%] h-[30%] bottom-40 right-20  transform -rotate-12 blue__gradient'></div>

      <div className='flex flex-row z-10 relative'>
        <motion.h1
          className='text-slate-200 md:text-6xl text-3xl font-bold mr-2'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className='bg-gradient-to-br md:text-6xl text-3xl from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold'>QualitySense</span>
        </motion.h1>
        {/* <h1 className='bg-gradient-to-br md:text-6xl text-3xl from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold'>QualitySense</h1> */}
      </div>

      <div className='md:w-[700px] w-[380px] items-center mt-4 mb-4 z-10 relative'>
        {/* <p className='text-slate-200 font-normal md:text-lg text-sm text-center'>
          Effortlessly assess your data quality and uncover valuable insights with AI, helping you achieve smarter data-driven decisions.
        </p> */}
        <motion.p
          className="text-slate-200 font-normal md:text-lg text-sm text-center"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {line1.split("").map((char, index) => {
            return (
              <motion.span
                className="text-slate-200 font-normal md:text-lg text-sm text-center"
                key={char + "-" + index}
                variants={letter}
              >
                {char}
              </motion.span>
            )
          })}
        </motion.p>
      </div>

      <div className='bg-spotlight z-10 relative'></div>

      <div className='z-10 relative'>
        <motion.button
          onClick={goToGenerate}
          type="button"
          className="text-slate-200 text-lg md:text-2xl z-50 bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl px-10 py-2.5 text-center me-2 mb-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Start Now -&gt;
        </motion.button>
      </div>


      </motion.div>

    </section>
  )
}

export default Home