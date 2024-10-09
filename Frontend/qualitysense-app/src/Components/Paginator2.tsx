import React from 'react';

interface PaginatorProps {
    pageNumber: number;
    totalPages:number;
    setPageNumber: (value: number) => void; 
      
  }
  
const Paginator2: React.FC<PaginatorProps> = ({pageNumber,totalPages,setPageNumber}) => {
    const handleNextPage = () => {
        if(pageNumber < totalPages) {
          setPageNumber(pageNumber + 1);
        
        }
      }
    
      const handleReturnPage = () => {
        if(pageNumber > 1) {
          setPageNumber(pageNumber - 1);
        }
      }
    
  return (
    <div>
    <div className="flex">
      <button
        onClick={handleReturnPage}
        className={`flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 ${pageNumber === 1 ? 'cursor-not-allowed opacity-50' : ''} dark:hover:text-white`}
      disabled = {pageNumber === 1}>
         &lt;
        
      </button>
      <button
        onClick={handleNextPage}
        className={`flex items-center justify-center text-lg px-4 h-10 font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
          pageNumber === totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}>  
        &gt;
      </button>
    </div>
  </div>
  
  );
};

export default Paginator2;
