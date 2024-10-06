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
    <div className='md:w-max w-[300px] h-auto bg-darkbg flex flex-col '>
      <div className='flex md:flex-row flex-col md:w-auto w-[150px] mb-5'>
        <h1 className='font-bold text-3xl mb-3 text-cyan-500 pr-32'>Data Overview</h1>
        <PdfDownloadButton generatedText={cleanedText} fileName={fileName}/>
      </div>


      <div className='md:w-[680px] w-[200px] h-auto'>
        {sections.map((section, index) => {
          const cleanedSection = cleanText(section); 
          const lines = cleanedSection.split('\n'); 

          return (
            <div key={index} className='mb-4'>
              <p className='md:whitespace-pre-wrap text-darktext3 md:w-auto w-[250px] '>{lines.join('\n\n')}</p> 
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataOverview;

