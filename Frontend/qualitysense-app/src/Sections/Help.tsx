import React from 'react'

const Help = () => {
  return (
    <section className='w-full bg-darkbg flex flex-col items-center justify-start min-h-screen p-10'>
    <h1 className='text-slate-200 text-3xl mb-6'>Help</h1>
    
    <div className='bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl'>
        <h2 className='text-slate-200 text-2xl mb-4'>Getting Started</h2>
        <p className='text-slate-300 mb-4'>Learn how to navigate our data quality assistant and make the most of its features.</p>
        
        <h3 className='text-slate-200 text-xl mt-4'>Importing Datasets</h3>
        <p className='text-slate-300 mb-4'>Follow these steps to import your datasets...</p>
        
        <h3 className='text-slate-200 text-xl mt-4'>Generating Quality Reports</h3>
        <p className='text-slate-300 mb-4'>To generate quality reports, simply...</p>
      
       
    </div>
</section>

    
  )
}

export default Help