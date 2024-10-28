import React, { useState, useEffect } from 'react';
import UserTable from '../Components/UserTable';
import Paginator from '../Components/Paginator';
import axios from 'axios';

interface isAuthenticated {
    isAuthenticated: boolean;

}

interface UserData {
    file_name: string;
    uploaded_at: string;
    status: string;
    total_rows: number;
    total_columns: number;
}

const Activity: React.FC<isAuthenticated> = ({isAuthenticated}) => {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [userData, setUserData] = useState<UserData[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems , setTotalItems] = useState<number>(0);
   

    const getUserData = async () => {
        const UserToken = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`http://localhost:8000/dashboard-api/data/?page=${pageNumber}`, {
                headers: {
                    'Authorization': `Bearer ${UserToken}`
                }
            });

            if (response.status === 200) {
                setUserData(response.data.data);
                setTotalPages(response.data.totalPages);
                setTotalItems(response.data.totalItems);
                
               
            }
        } catch {
           return;
        }
    };

    useEffect(() => {
        if(isAuthenticated){
            getUserData();
        }
    }, [isAuthenticated,pageNumber]); 

    return (
        <section className='w-full  sm:overflow-y-auto flex min-h-screen justify-center pb-20 pt-20 md:pl-36 pl-20 bg-darkbg'>
            <div className='flex overflow-x-auto justify-center items-center flex-col'>
                <UserTable data={userData} />
                <Paginator pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber}/> 
            </div>
        </section>
    );
};

export default Activity;
