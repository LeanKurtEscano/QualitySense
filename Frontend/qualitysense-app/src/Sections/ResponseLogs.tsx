import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../Components/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteGenerated } from '../Services/Axios';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { cleanText } from '../Utils';
import Download from '../Components/Download';
import Paginator2 from '../Components/Paginator2';



interface PaginateItems {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}
const ResponseLogs: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [emptyHistory, setEmptyHistory] = useState("");
    const { isAuthenticated, data, setData, result, setResult } = useMyContext();
    const [ItemID, setItemID] = useState(0);
    // @ts-ignore
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


    const deleteData = async (id: number) => {
        const response = await deleteGenerated(id);

        if (response) {
            const filterData = data.filter((item: { id: number; }) => item.id !== id)
            getGenerated();
            setData(filterData);
        }
    }

    const selectGenerated = (id: number) => {
        setResult(id);

    };



    useEffect(() => {
        if (isAuthenticated) {
            getGenerated();
        }
    }, [isAuthenticated, pageNumber]);

    useEffect(() => {

        if (data.length === 0) {
            setEmptyHistory("You haven't generated any history yet.");

        }

    }, [data])

    const getGenerated = async () => {
        const userToken = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL2}/generated/?page=${pageNumber}`, {
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

                if (response.data.data.length === 0) {
                    setEmptyHistory("You haven't generated any history yet.")

                } else {
                    setEmptyHistory("");
                }
            }
        } catch {
            return;
        }
    };

    const generatedData = data.filter((item: { id: any; }) => item.id === result);

    return (
        <section className="w-full min-h-screen sm:overflow-y-auto h-auto flex flex-col overflow-hidden bg-darkbg">

            {emptyHistory ? (
                <div className='flex  items-center justify-center pt-24 pl-16'>
                    <h1 className='text-slate-200 md:text-4xl text-[12px] pr-14 font-bold'>{emptyHistory}</h1>
                </div>
            ) : (
                <div>
                    <div className='w-full flex justify-center pt-10 mb-4 md:pr-80'>
                        <Paginator2 pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />

                    </div>
                    <div className="flex  md:flex-row items-center justify-center  flex-col h-auto min-h-screen">

                        <div className="flex  flex-col md:pl-40 min-h-screen items-center bg-darkbg">
                            {data.map((item: any, index: any) => (
                                <div
                                    onClick={() => selectGenerated(item.id)}
                                    key={index}
                                    className={`flex cursor-pointer 
            hover:bg-gray-800 w-[200px]
            flex-row md:w-[450px] bg-loginbg border border-gray-800 text-slate-200 shadow-lg p-4`}
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
                                            <div className='flex border  border-gray-800 bg-darkbg rounded-lg shadow-lg absolute flex-col items-center justify-center  right-7 mt-40 md:right-[480px] md:mb-20 md:ml-16 p-4'>
                                                <div className='flex pr-8 flex-row items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-md' onClick={() => deleteData(item.id)}>
                                                    <FontAwesomeIcon icon={faTrash} className='text-red-600' />
                                                    <p className='ml-2 text-red-600'>Delete</p>
                                                </div>
                                                <Download generatedText={item.result} fileName={item.file_name} />
                                            </div>
                                        ) : null}

                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 min-h-screen  pt-1 overflow-hidden flex md:pl-0 pl-11 justify-center md:pb-20 items-center bg-darkbg">
                            <div className="max-h-screen min-h-screen pt-9 flex-grow  w-full p-4 overflow-y-auto">
                                {generatedData.length > 0 ? (
                                    generatedData.map((item: any, index: any) => {
                                        const cleanedText = cleanText(item.result || '');
                                        const lines = cleanedText.split('\n');

                                        return (
                                            <div key={index} className="mb-4">
                                                <p className="md:whitespace-pre-wrap text-darktext3 md:w-auto w-[250px]">
                                                    {lines.join('\n')}
                                                </p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">No data available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
};

export default ResponseLogs;