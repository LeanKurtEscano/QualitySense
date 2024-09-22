import React from 'react'

const Generate: React.FC = () => {
  return (
    <section className='w-screen h-screen pt-4 fixed flex items-center justify-center'>
      <div className='border-red-200 border-2 p-4'>
        <input type='text' placeholder='Enter prompt here...'>
        </input>
      </div>
    </section>
  )
}

export default Generate