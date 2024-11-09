import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home:React.FC = () => {
  const navigate = useNavigate();


  const goToGenerate = () => {
    navigate('/generate');



  }


  return (
    <section className='bg-darkbg w-full flex min-h-screen flex-col items-center pb-20 justify-center relative'>
      <div className='absolute z-0 w-[40%] h-[40%] top-0 left-0 transform rotate-12 blue__gradient'></div>

      <div className='absolute z-0 w-[30%] h-[30%] bottom-40 right-20  transform -rotate-12 blue__gradient'></div>

      <div className='flex flex-row z-10 relative'>
        <h1 className='text-slate-200 md:text-6xl text-3xl font-bold mr-2'>Welcome to</h1>
        <h1 className='bg-gradient-to-br md:text-6xl text-3xl from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold'>QualitySense</h1>
      </div>

      <div className='md:w-[700px] w-[380px] items-center mt-4 mb-4 z-10 relative'>
        <p className='text-slate-200 font-normal md:text-lg text-sm text-center'>
          Effortlessly assess your data quality and uncover valuable insights with AI, helping you achieve smarter data-driven decisions.
        </p>
      </div>

      <div className='bg-spotlight z-10 relative'></div>

      <div className='z-10 relative'>
        <button onClick={goToGenerate}
          type="button"
          className="text-slate-200 text-lg md:text-2xl z-50 bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl px-10 py-2.5 text-center me-2 mb-2">
          Start Now -&gt;
        </button>

      </div>


    </section>

  )
}

export default Home


