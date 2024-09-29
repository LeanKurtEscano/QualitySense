import React from 'react'
import { features } from '../Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Features = () => {
  return (
    <section className='flex  bg-darkbg min-h-screen items-center justify-center flex-wrap'>
      <div className=' flex flex-col'>
        <div className='flex items-center justify-center mb-4'>
        <h1 className='md:text-4xl text-2xl font-bold text-white'>Main Features
        </h1>

        </div>
        <div className='md:w-[700px] w-[300px] mb-8'>
        <p className='text-darktext3'>DataSense combines the intelligence of AI with the robust capabilities of traditional data cleaning tools.
           Effortlessly detect errors, 
          validate data types, and receive real-time AI-powered suggestions.</p>
          </div>
        
       
      </div>
      <div className='w-max flex flex-wrap items-center justify-center'>
    {features.map((item, index) => (
      
      <div className='flex  p-4 w-[400px] flex-row h-[200px]  m-4' key={index}>
        <div className='flex-grow flex  pl-3 pt-2 '>
          <FontAwesomeIcon icon={item.icon} className="text-xl p-2 h-5 w-6 mr-2 border-1 rounded-lg bg-cyan-600 text-slate-100" />
        </div>
        <div className='flex-grow flex pt-3 flex-col'>
          <h1 className='text-lg  text-slate-200 mb-2 font-semibold '>{item.title}</h1>
          <div className=' flex w-[300px] h-[300px] '>
            <p className='text-darktext3'>{item.description}</p>
          </div>
        </div>
      </div>

    ))}
    </div>
  </section>
     
  )
}

export default Features