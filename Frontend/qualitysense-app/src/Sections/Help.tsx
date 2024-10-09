import React from 'react'
import { getStarted, dashboardSections } from '../Constants'

const Help: React.FC = () => {
  return (
    <section className='w-full min-h-screen h-auto bg-darkbg flex flex-col p-10'>
    <div className='flex pl-72 h-auto w-full'>
      <h1 className='text-slate-200 text-3xl font-bold mb-6'>Getting Started</h1>
    </div>
    
    <div className='mb-12'>
      {getStarted.map((item, index) => (
        <div className='pl-72 m-2 w-[800px]' key={index}>
          <h1 className='text-slate-200 text-lg font-semibold mb-4'>{index + 1}. {item.title}</h1>
          <p className='text-slate-200'>{item.description}</p>
        </div>
      ))}
    </div>
  
    <div>
      <h1 className='text-slate-200 pl-72 text-3xl font-bold mb-6'>Dashboard</h1>
      {dashboardSections.map((item, index) => (
        <div className='flex flex-col m-1 mb-3' key={index}>
          <div className='pl-72 m-2 w-[800px]'>
            <h1 className='text-slate-200 text-lg font-semibold mb-4'>{index + 1}. {item.title}</h1>
            <p className='text-slate-200'>{item.description}</p>
          </div>
          <div className='pl-12 flex justify-center'>
            <img src={item.image} className='w-[600px] h-auto mt-4' alt={`Dashboard section ${index + 1}`} />
          </div>
        </div>
      ))}
    </div>
  </section>
  

  )
}

export default Help