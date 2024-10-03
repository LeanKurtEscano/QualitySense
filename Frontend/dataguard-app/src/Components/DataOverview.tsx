import React from 'react';
import PdfDownloadButton from './PdfDownload';

interface Result {
  result: string;
  dataDetails: string;
  fileName: string;
}

const DataOverview: React.FC<Result> = ({ result, dataDetails, fileName }) => {
 
  const sections = result.split('\n\n');


  function cleanText(text: string) {
    return text.replace(/[#*`']+/g, ''); 
  }
  const cleanedText = cleanText(dataDetails); 

  return (
    <div className='w-max h-auto bg-darkbg flex flex-col '>
      <div className='flex flex-row mb-5'>
        <h1 className='font-bold text-3xl mb-3 text-cyan-500 pr-32'>Data Overview</h1>
        <PdfDownloadButton generatedText={cleanedText} fileName={fileName}/>
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

