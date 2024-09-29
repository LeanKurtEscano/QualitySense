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
    <div className='w-max h-auto bg-darkbg flex flex-col '>
      <div>
        <h1 className='font-bold text-3xl mb-3 text-darkpurple pr-32'>Data Overview</h1>
      </div>

      <div className='w-[680px] h-auto'>
        {sections.map((section, index) => {
          const cleanedSection = cleanText(section); 
          const lines = cleanedSection.split('\n'); 

          return (
            <div key={index} className='mb-4'>
              <p className='whitespace-pre-wrap text-darktext3 '>{lines.join('\n\n')}</p> 
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataOverview;

