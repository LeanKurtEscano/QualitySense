import React from 'react';
import puge from '../assets/puge.jpg';

const AboutUs:React.FC = () => {
  return (
    <section className='w-full flex items-center justify-center h-auto bg-darkbg'>
  <div className="flex h-screen items-center justify-center pl-24 p-5">
    <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
      <div className="text-left">
        <h1 className="mb-2 text-3xl font-bold text-white">
          <span className="text-cyan-500">Hi,</span> I am Lean Kurt Escano
        </h1>
        <p className="mb-6 text-white">
        The developer behind QualitySense and a sophomore student at Laguna University, pursuing a BS in Information Technology with a focus on System Development. 
        </p>
        <p className="mb-6 text-white">
        QualitySense is the product of my dedication to  help data professionals effectively check, maintain, and enhance the quality of their data. By simplifying data quality checks, I aim to make data-driven decisions more reliable and impactful.
        </p>
        <p className="text-white">
          I believe that good data leads to better insights, and QualitySense is designed to help you achieve just that!
        </p>
      </div>

      <div>
        <img src={puge} alt="Lean Kurt Escano" className="md:size-96 size-72 rounded-full" />
      </div>
    </div>
  </div>
</section>

  );
};

export default AboutUs;
