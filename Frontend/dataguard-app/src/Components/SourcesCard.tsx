import React from 'react'
import { RiH1 } from 'react-icons/ri';

interface SourcesData {
    text: string;
    desc: string;
    url: string;


}

const SourcesCard: React.FC<SourcesData> = ({ text, desc, url }) => {
    return (
        <div className="p-6 md:w-[400px] m-4 md:h-[300px] w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-loginbg dark:border-gray-700">
            <a href="#" className="block">
                <h1 className="mb-2  md:text-2xl text-lg   font-bold tracking-tight text-gray-900 md:whitespace-nowrap dark:text-white">
                    {text}
                </h1>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {desc}
            </p>
            <div className="flex items-center justify-center mt-8">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Read more
                    <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                </a>
            </div>
        </div>
    );
};

export default SourcesCard;