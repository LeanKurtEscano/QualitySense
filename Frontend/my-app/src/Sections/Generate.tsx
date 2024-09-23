import React from 'react'

const Generate: React.FC = () => {
  return (
    <section className='w-screen  pt-4 flex items-center fixed justify-center'>
      <div className='border-red-200 border-2 p-4'>
        <input type='text' placeholder='Enter prompt here...'>
        </input>
      </div>
    </section>
  )
}

export default Generate