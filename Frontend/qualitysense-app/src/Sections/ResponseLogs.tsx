import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../Components/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteGenerated } from '../Api/Axios';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import Download from '../Components/Download';
import Paginator2 from '../Components/Paginator2';


interface PaginateItems {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}
const ResponseLogs: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { isAuthenticated, data, setData, result, setResult } = useMyContext();
    const [ItemID , setItemID] = useState(0);
    const [paginateItems, setPaginateItems] = useState<PaginateItems>({
        totalItems: 0,
        itemsPerPage: 0,
        currentPage: 0,
    })
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = (id: number) => {
        setShowOptions(!showOptions);
        setItemID(id);  

    }

    const [totalPages, setTotalPages] = useState<number>(0);

    const deleteData = async (id: number) => {
        const response = await deleteGenerated(id);

        if (response) {
            const filterData = data.filter((item: { id: number; }) => item.id !== id)
            setData(filterData);
        }
    }

    const selectGenerated = (id: number) => {
        setResult(id);

    };

    const cleanText = (text: string) => {
        return text.replace(/[#*`']+/g, '');
    };

    useEffect(() => {
        if (isAuthenticated) {
            getGenerated();
        }
    }, [isAuthenticated, pageNumber]);

    const getGenerated = async () => {
        const userToken = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`http://localhost:8000/dashboard-api/generated/?page=${pageNumber}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            if (response.status === 200) {
                setData(response.data.data);

                setPaginateItems({
                    totalItems: response.data.totalItems,
                    itemsPerPage: response.data.itemsPerPage,
                    currentPage: response.data.currentPage,

                })
                setTotalPages(response.data.totalPages)
            }
        } catch {
            alert("Failed to get Data");
        }
    };

    const generatedData = data.filter((item: { id: any; }) => item.id === result);

    return (
        <section className="w-full min-h-screen h-auto flex flex-col overflow-hidden bg-darkbg">
            <div className='w-full flex justify-center pr-80'>
                <Paginator2 pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />

            </div>
            <div className="flex pb-10 h-full">
                <div className="flex-1 pt-20 flex flex-col justify-start pl-40 min-h-screen items-center bg-darkbg">
                    {data.map((item: any, index: any) => (
                        <div
                            onClick={() => selectGenerated(item.id)}
                            key={index}
                            className={`flex cursor-pointer 
            hover:bg-gray-800
            flex-row w-[450px] bg-loginbg border border-gray-800 text-slate-200 shadow-lg p-4`}
                        >
                            <div className='mr-2 pt-2 w-[250px] whitespace-nowrap overflow-hidden text-ellipsis font-bold'>
                                <span className='truncate'>{item.file_name}</span>
                            </div>
                            <div className='pl-4 pt-2'>
                                <span>{item.generated_at}</span>
                            </div>

                            <div className='flex items-center ml-6'>
                                <div
                                     onClick={(event) => {
                                        event.stopPropagation(); 
                                        toggleOptions(item.id);
                                    }}
                                    className='font-bold  hover:text-white transition-colors duration-200'>
                                    ...
                                </div>
                                {showOptions && item.id === ItemID ? (
                                    <div className='flex border  border-gray-800 bg-darkbg rounded-lg shadow-lg absolute flex-col items-center justify-center ml-16 p-4'>
                                        <div className='flex pr-8 flex-row items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-md' onClick={() => deleteData(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} className='text-red-600' />
                                            <p className='ml-2 text-red-600'>Delete</p>
                                        </div>
                                       <Download generatedText={item.result} fileName={item.file_name} />
                                    </div>
                                ) : null }

                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 pt-16 h-full overflow-hidden flex justify-center items-center bg-darkbg">
                    <div className="max-h-screen w-full p-4 overflow-y-auto">
                        {generatedData.map((item: any, index: any) => {
                            const cleanedText = cleanText(item.result || '');
                            const lines = cleanedText.split('\n');

                            return (
                                <div key={index} className='mb-4'>
                                    <p className='md:whitespace-pre-wrap text-darktext3 md:w-auto w-[250px]'>{lines.join('\n')}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponseLogs;
