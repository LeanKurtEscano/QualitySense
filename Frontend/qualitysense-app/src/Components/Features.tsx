import React from 'react'
import { features } from '../Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion';

const line1 = "DataSense combines the intelligence of AI with advanced data validation capabilities. Effortlessly detect data quality issues, validate categorical values, and receive real-time AI suggestions for smarter, more accurate decisions.";

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

const Features:React.FC = () => {

  return (
    <section className='flex  bg-darkbg min-h-screen items-center justify-center flex-wrap'>
      <div className=' flex flex-col'>
        <div className='flex items-center justify-center mb-4'>
          <h1 className='md:text-6xl text-4xl font-bold text-white'>Main <span className='bg-gradient-to-br md:text-6xl text-3xl from-cyan-500 to-blue-700 bg-clip-text text-transparent font-bold'>Features</span></h1>
        </div>
        <div className='md:w-[700px] w-[300px] mb-8'>
          <motion.p 
            className='text-darktext3 text-xl text-center'
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {line1.split("").map((char, index) => {
              return (
                <motion.span
                  className="text-darktext3"
                  key={char + "-" + index}
                  variants={letter}
                >
                  {char}
                </motion.span>
              )
            })}
          </motion.p>
        </div>

      </div>
      <div className='w-max flex flex-wrap items-center justify-center'>
        {features.map((item, index) => (
          <motion.div 
            className='flex p-4 w-[400px] flex-row h-[200px] m-4' key={index}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className='flex-grow flex pl-3 pt-2'>
              <FontAwesomeIcon icon={item.icon} className="text-xl p-2 h-5 w-6 mr-2 border-1 rounded-lg bg-cyan-600 text-slate-100" />
            </div>
            <div className='flex-grow flex p-3 flex-col border-2 border-cyan-800 rounded-lg'>
              <h1 className='text-lg text-slate-300 mb-2 font-semibold'>{item.title}</h1>
              <div className='flex w-[300px] h-[300px]'>
                <p className='text-darktext3'>{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

  )
}

export default Features