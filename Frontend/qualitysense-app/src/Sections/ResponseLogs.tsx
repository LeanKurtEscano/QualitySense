import React from 'react';
import FileNameCard from '../Components/FileNameCard'; // Assuming you have this component
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMyContext } from '../Components/MyContext';

interface userData {
    file_name: string;
    generated_at: string;
    result: string;
}
const ResponseLogs: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { isAuthenticated } = useMyContext();
    const [data, setData] = useState<userData[]>([])

    useEffect(() => {
        if(isAuthenticated){
            getGenerated();
        }

    },[])


    const getGenerated = async () => {
        const userToken = localStorage.getItem('access_token')
        try {
            const response = await axios.get(`http://localhost:8000/dashboard-api/generated/?page=${pageNumber}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }

            })

            if(response.status === 200) {
                setData(response.data.data);
                console.log(response.data.data);

            }

        } catch {
            alert("Failed to get Data")
        }

    }
    return (
        <section className="w-full min-h-max h-auto overflow-y-hidden  bg-darkbg">
            <div className="flex min-h-max">
                {/* Left Div */}
                <div className="flex-1 pt-20 flex flex-col  justify-center pl-40 min-h-screen items-center bg-darkbg bo"> {/* Added border here */}
                   {data.map((item,index) => (
                    <FileNameCard fileName={item.file_name} date={item.generated_at}/>
                   ))}

                </div>

                {/* Right Div */}
                <div className="flex-1 flex justify-center items-center bg-blue-500">
                    Right Div
                </div>
            </div>
        </section>
    );
};

export default ResponseLogs;
