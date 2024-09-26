import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NullChart from '../Components/NullChart';
import Sparkle from '../Components/Sparkle';

interface dataCount {
  totalRows: number,
  totalCols: number,
  columns: string[],
  na_values: number[],
}

const Generate: React.FC = () => {
  const [disable, setDisable] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string | null>(null);
  const [emptyError, setEmptyError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dataDetails, setDataDetails] = useState<dataCount>({
    totalRows: 0,
    totalCols: 0,
    columns: [],
    na_values: [],
  });

  const handleFileName = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      setFileName(file.name);
      setEmptyError(null);
      setDisable(false);
    } else {
      setFileName(null);
    }
  };

  const removeFile = () => {
    setDisable(!disable);
    setFileName(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  }

  useEffect(() => {
    if (disable == true) {
      setDisable(false);
    }
  }, [disable])

  const sendFile = async () => {
    setLoading(true);
    setSuccess(false);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setEmptyError('Please select a file to file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const userToken = localStorage.getItem('access_token');
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData
        , {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },

        });

      if (response.data.success) {
        setDataDetails({
          totalRows: response.data.total_rows,
          totalCols: response.data.total_columns,
          columns: response.data.columns,
          na_values: response.data.na_values,
        })

        setLoading(false);
        setSuccess(true);
      }

    } catch (error) {
      alert("Invalid Format")
    }
  }

  return (
    <section className='w-screen ml-2 h-auto pt-4 flex items-center flex-col  overflow-y-auto justify-center'>
      <div className='flex-col flex items-center justify-center border-2 p-4 rounded-lg shadow-lg mb-20'>
        <h2 className='pr-9 text-2xl text-customPurple3 font-bold'>Import your Dataset Here</h2>
        <div className='flex flex-row pr-28 pl-2 mt-1'>
          <p className='mr-2 text-slate-500'>Accepted Formats: .csv & .xlsx</p>
        </div>
        <div className="flex items-center justify-center pt-4 mb-1 w-80">
          <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-customPurple3 rounded-md p-4 flex items-center justify-center hover:bg-gray-100 transition w-full">
            <FontAwesomeIcon icon={faCloud} className='text-customPurple3 mr-2 text-base' />
            <p className={`${fileName ? 'hidden' : ''} text-center`}>Browse Files to Upload</p>

            {fileName && <span className="ml-2 mr-4 overflow-hidden">{fileName}</span>}
            {fileName && <FontAwesomeIcon icon={faTrash} className='text-red-600 pl-2' onClick={removeFile} />}

          </label>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            onChange={handleFileName}
            accept='.csv, .xlsx'
            className='hidden'
            disabled={disable}
          />
        </div>
        {emptyError && (
          <p className='text-red-600 pr-6'>{emptyError}</p>
        )}
        <div>
          <button onClick={sendFile} className='p-2 pr-5 pl-5 mt-2 text-white bg-customPurple3 hover:bg-purple-700 transition duration-300'>
            Assess Data
          </button>
        </div>
      </div>
      {loading && (
        <Sparkle />
      )}
      {success && (
        <div className='flex flex-col md:flex-row w-auto h-auto mb-4'>
          <div className='flex flex-row items-center mb-2 justify-center mr-10 border-2 w-[300px] h-[150px] p-6 rounded-lg  shadow-lg'>
            <h1 className='text-customPurple3 mr-1'>Total number of rows:</h1>
            <h1>{dataDetails.totalRows}</h1>
          </div>
          <div className='flex flex-row items-center justify-center border-2 p-6 rounded-lg  shadow-lg w-[300px] h-[150px]'>
            <h1 className='text-customPurple3 mr-1 '>Total number of columns:</h1>
            <h1>{dataDetails.totalCols}</h1>
          </div>
        </div>
      )}
      <div className='pr-10 justify-center items-center lg:p-10'>
  {success && (
    <div className=' md:w-[600px] md:h-[400px] sm:w-[500px] sm:h-[350px] w-[400px] h-[300px] mb-4 border-slate p-4 flex items-center justify-center border-2 rounded-lg shadow-lg'>
      <NullChart data={dataDetails.na_values} labels={dataDetails.columns} />
    </div>
  )}
</div>

      
    </section>  
  );
}

export default Generate;
