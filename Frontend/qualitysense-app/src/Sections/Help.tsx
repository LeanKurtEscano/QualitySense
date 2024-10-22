import React from 'react'
import { getStarted, dashboardSections } from '../Constants'

const Help: React.FC = () => {
  return (
    <section className='w-full min-h-screen h-auto bg-darkbg flex flex-col items-center p-4 md:p-10'>
    <div className='flex justify-center mb-6'>
        <h1 className='text-slate-200 text-3xl font-bold'>Getting Started</h1>
    </div>

    <div className='mb-12 flex flex-col items-center w-full'>
        {getStarted.map((item, index) => (
            <div className='m-2 flex flex-col items-center w-full max-w-[800px]' key={index}>
                <h1 className='text-slate-200 text-lg font-semibold mb-4 text-center'>{index + 1}. {item.title}</h1>
                <p className='text-slate-200 text-center'>{item.description}</p>
            </div>
        ))}
    </div>

    <div className='flex flex-col items-center w-full'>
        <h1 className='text-slate-200 text-3xl font-bold mb-6 text-center'>Dashboard</h1>
        {dashboardSections.map((item, index) => (
            <div className='flex flex-col items-center m-2 mb-3 w-full max-w-[800px]' key={index}>
                <h1 className='text-slate-200 text-lg font-semibold mb-4 text-center'>{index + 1}. {item.title}</h1>
                <p className='text-slate-200 text-center'>{item.description}</p>
                <div className='flex justify-center w-full mt-4'>
                    <img src={item.image} className='w-full max-w-[600px] h-auto' alt={`Dashboard section ${index + 1}`} />
                </div>
            </div>
        ))}
    </div>
</section>


    
  

  )
}

export default Help