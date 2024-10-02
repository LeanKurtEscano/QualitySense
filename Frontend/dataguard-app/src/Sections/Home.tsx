import React from 'react'
import { useNavigate } from 'react-router-dom'
import Features from '../Components/Features';
const Home = () => {
  const navigate = useNavigate();

  const goToGenerate = () => {
    navigate('/generate');

  }
  return (
<section className='bg-darkbg w-full flex min-h-screen flex-col items-center pb-20 justify-center'>
  <div className='flex flex-row '>
    <h1 className='text-slate-200 md:text-6xl text-2xl font-bold mr-2'>Welcome to</h1>
    <h1 className='bg-gradient-to-br md:text-6xl text-2xl from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold'>DataGuard</h1>
  </div>
  <div className='md:w-[700px]  w-[380px] items-center mt-4 mb-4'>
    <p className='text-slate-200 font-normal md:text-lg text-sm text-center'>
      Effortlessly assess your datasets and uncover valuable insights with AI, helping you achieve smarter data-driven decisions.
    </p>
  </div>
  <div className='bg-spotlight'></div>
  <div className=''>
    <button onClick={goToGenerate} 
      type="button" 
      className="text-slate-200 text-lg md:text-2xl bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl px-10 py-2.5 text-center me-2 mb-2">
      Start Now -&gt;
    </button>
  </div>
</section>
  )
}

export default Home


