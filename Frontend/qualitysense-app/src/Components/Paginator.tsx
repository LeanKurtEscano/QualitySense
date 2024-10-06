import React from 'react';

interface PaginatorProps {
    pageNumber: number;
    totalPages:number;
    setPageNumber: (value: number) => void; 
      
  }
  
const Paginator: React.FC<PaginatorProps> = ({pageNumber,totalPages,setPageNumber}) => {
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
        <svg
          className="w-3.5 h-3.5 me-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Previous
      </button>
      <button
        onClick={handleNextPage}
        className={`flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
          pageNumber === totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}>
        Next
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  </div>
  
  );
};

export default Paginator;
