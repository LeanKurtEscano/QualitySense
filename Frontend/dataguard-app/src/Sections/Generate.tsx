import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DataOverview from '../Components/DataOverview';
import NullChart from '../Components/NullChart';
import { useMyContext } from '../Components/MyContext';
import GenerateLogin from '../Components/GenerateLogin';

interface dataCount {
  totalRows: number;
  totalCols: number;
  columns: string[];
  na_values: number[];
  result: string;
}



const Generate: React.FC = () => {
  const [disable, setDisable] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [emptyError, setEmptyError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useMyContext();
  const [dataDetails, setDataDetails] = useState<dataCount>({
    totalRows: 0,
    totalCols: 0,
    columns: [],
    na_values: [],
    result: '',
  });

  const loginToGenerate = () => {
    setShowLogin(!showLogin);

  }



  const handleFileName = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      setFileName(file.name);
      setEmptyError(null);
      setDisable(false);
    } else {
      setFileName('');
      setDisable(true);
    }
  };

  const removeFile = () => {
    setDisable(true);
    setFileName('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (disable) {
      setDisable(false);
    }
  }, [disable]);

  const sendFile = async () => {
    setLoading(true);
    setSuccess(false);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setEmptyError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const userToken = localStorage.getItem('access_token');
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
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
          result: response.data.result,
        });



        setLoading(false);
        setSuccess(true);
      }

      if (response.status == 500) {
        alert("Something is wrong with the dataset");
      }
    } catch (error: any) {
      if (error.response) {
        setLoading(false);
        const { data } = error.response;

        if (data.Empty) {
          setEmptyError(data.Empty);
        }
      }

    }
  };

  const isButtonDisabled = !fileName || emptyError !== null || isAuthenticated === false || loading == true;

  return (
    <section className='w-full min-h-screen bg-darkbg pt-4 flex flex-col items-center justify-center'>
      <div className='flex-col flex   bg-darkbg p-4 rounded-lg shadow-lg mb-20'>
      <h2 className="pr-9 text-4xl text-cyan-500 mb-3 font-bold">Import your Dataset Here</h2>
                <div className="flex flex-wrap w-[550px]">
                    <p className="text-darktext2">
                        AI-powered Data Quality Checker will automatically detect and suggest improvements for data issues such as missing values, outliers, and potential errors.
                    </p>
                </div>
        {isAuthenticated ? (
        <div className='flex items-center justify-center'>
        <div className="flex items-center justify-center pt-4 mb-1">
          <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-cyan-400 text-white rounded-md p-4 flex items-center justify-center hover:bg-formhover transition w-[550px] h-48 ">
            <FontAwesomeIcon icon={faCloud} className='mr-2 text-cyan-400 text-base' />
            
            {!fileName && (
              <div className="pt-2 text-center">
                <p className="text-darktext2">Browse Files to Upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Accepted Formats: .csv & .xlsx</p>
              </div>
            )}
      
            {fileName && (
              <>
                <span className="ml-2 mr-4 overflow-hidden">{fileName}</span>
                <FontAwesomeIcon icon={faTrash} className='text-red-600 pl-2' onClick={removeFile} />
              </>
            )}
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
      </div>
      
       ) : (
        <div className='flex items-center justify-center'>
          <div onClick={loginToGenerate} className="flex items-center   justify-center pt-4 mb-1 ">
            <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-cyan-400 text-white rounded-md p-4 flex items-center justify-center w-[550px] h-48 hover:bg-formhover transition ">
              <FontAwesomeIcon icon={faCloud} className=' mr-2 text-cyan-400 text-base' />
              <div className="pt-2 text-center">
                <p className="text-darktext2">Browse Files to Upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Accepted Formats: .csv & .xlsx</p>
              </div>
            </label>

          </div>
          </div>

        )}

        {emptyError && (
          <p className='text-red-600 pr-6'>{emptyError}</p>
        )}
        <div className='flex items-center justify-center'>
          <button
            onClick={sendFile}
            className={`flex items-center justify-center p-2 pr-5 pl-5 mt-2 text-white  transition duration-300 ${isButtonDisabled ? 'bg-formhover cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-blue-500'} w-48 `} // Set a fixed width
            disabled={isButtonDisabled}
          >
            {loading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>

              </>
            ) : (
              'Assess Data'
            )}
          </button>


        </div>
       
      </div>
      <div className='flex flex-col items-center justify-center flex-grow'>
        {loading && (
          <div className='flex flex-col items-center justify-center pb-20 h-full'>
            <div className='flex space-x-2 justify-center pb-4 items-center'>
              <span className='sr-only'>Loading...</span>
              <div className='h-8 w-8 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-8 w-8 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-8 w-8 bg-cyan-500 rounded-full animate-bounce'></div>
            </div>
            <p className='text-slate-200 mt-2 flex items-center'>
              AI is currently assessing your data for insights and recommendations, please wait
              <span className='ml-2 animate-bounce [animation-delay:-0.3s]'>.</span>
              <span className='animate-bounce [animation-delay:-0.15s]'>.</span>
              <span className='animate-bounce'>.</span>
            </p>
          </div>
        )}

        {showLogin && !isAuthenticated &&(
          
            <GenerateLogin setShowLogin={setShowLogin}/>
          
          
        )}
        {success && (
          <div className='flex flex-col md:flex-row w-auto h-auto mb-4'>
            <div className='flex flex-row items-center mb-2 justify-center mr-10 border-1 bg-loginbg w-[300px] h-[150px] p-6 rounded-lg shadow-lg'>
              <h1 className='text-cyan-500 mr-1'>Total number of rows:</h1>
              <h1 className='text-slate-200'>{dataDetails.totalRows}</h1>
            </div>
            <div className='flex flex-row items-center justify-center border-1 bg-loginbg p-6 rounded-lg shadow-lg w-[300px] h-[150px]'>
              <h1 className='text-cyan-500 mr-1 '>Total number of columns:</h1>
              <h1 className='text-slate-200'>{dataDetails.totalCols}</h1>
            </div>
          </div>
        )}
        <div className='pr-10 justify-center items-center lg:p-10'>
          {success && (
            <div className='md:w-[600px] md:h-[400px] sm:w-[500px] sm:h-[350px] w-[400px] h-[300px] mb-4 p-4 flex items-center justify-center bg-loginbg rounded-lg shadow-lg'>
              <NullChart data={dataDetails.na_values} labels={dataDetails.columns} />
            </div>

          )}
        </div>



        {success && (
          <DataOverview result={dataDetails.result} dataDetails={dataDetails.result} fileName={fileName} />
        )}

      </div>
      
    </section>
  );
};

export default Generate;
