import React, { useEffect, useState } from 'react';
import FileNameCard from '../Components/FileNameCard'; // Assuming you have this component
import axios from 'axios';
import { useMyContext } from '../Components/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ResponseLogs: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { isAuthenticated, data, setData, result, setResult } = useMyContext();

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
    }, [isAuthenticated]); 

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
            }
        } catch {
            alert("Failed to get Data");
        }
    };

    const generatedData = data.filter((item: { id: any; }) => item.id === result);

    return (
        <section className="w-full min-h-screen h-auto flex justify-start overflow-hidden bg-darkbg">
            <div className="flex pb-10 h-full">
                <div className="flex-1 pt-20 flex flex-col justify-center pl-40 min-h-screen items-center bg-darkbg">
                    {data.map((item: any, index: any) => (
                        <div onClick={() => selectGenerated(item.id)}
                            key={index} 
                            className={`flex cursor-pointer transition-all ${result === item.id ?  'bg-cyan-400 text-slate-200' : 'hover:bg-cyan-500 hover:text-white group'} flex-row w-[450px]  bg-loginbg border border-gray-800 text-slate-200 shadow-lg p-4`}
                        >
                            <div className='mr-2 w-[250px] whitespace-nowrap overflow-hidden text-ellipsis font-bold'>
                                <span className='truncate'>{item.file_name}</span> 
                            </div>
                            <div className='pl-4'>
                                <span>{item.generated_at}</span>
                            </div>

                            <div className='flex items-center justify-center pl-8'>
                                <FontAwesomeIcon icon={faTrash} />
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
