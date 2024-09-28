import React from 'react';

interface Result {
  result: string;
}

const DataOverview: React.FC<Result> = ({ result }) => {
 
  const sections = result.split('\n\n');


  function cleanText(text: string) {
    return text.replace(/[#*`']+/g, ''); 
  }

  return (
    <div className='w-max h-screen flex flex-col'>
      <div>
        <h1 className='font-bold text-3xl mb-3 text-customPurple3 pr-32'>Data Overview</h1>
      </div>

      <div className='w-[700px] h-auto'>
        {sections.map((section, index) => {
          const cleanedSection = cleanText(section); 
          const lines = cleanedSection.split('\n'); 

          return (
            <div key={index} className='mb-4'>
              <p className='whitespace-pre-wrap '>{lines.join('\n\n')}</p> 
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataOverview;

