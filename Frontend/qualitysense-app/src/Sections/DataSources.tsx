import React from 'react'
import { cardItems } from '../Constants'
import SourcesCard from '../Components/SourcesCard'

const DataSources:React.FC = () => {
  return (
    <section className='h-auto bg-darkbg flex  sm:overflow-y-auto col items-center flex-wrap justify-center min-h-screen w-full'>
      <div className='md:pl-40 pl-20 flex-wrap w-[1000px]'>
        <h1 className='text-slate-200 font-bold text-2xl md:text-4xl'>Explore a wide range of datasets for machine learning and data science projects</h1>
        <p className='text-slate-300 text-md mt-4'>
          Discover and utilize these datasets within QualitySense to  assess your data quality for machine learning and data science projects.
        </p>
      </div>
      <div className='flex w-[1000px] h-auto p-4 pl-24 justify-center items-center flex-wrap'>
        {cardItems.map((item) => (
          <SourcesCard text={item.text} desc={item.desc} url={item.url} />
        ))}
      </div>
    </section>
  )
}

export default DataSources