import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Generate: React.FC = () => {
  const [disable, setDisable] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string | null>(null);
  const [emptyError, setEmptyError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    if(fileInputRef.current){
      fileInputRef.current.value = '';
    }

  }

  useEffect(()=> {
    if(disable == true) {
      setDisable(false);
    }
  },[disable])

  const sendFile = async () => {
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
      ,{
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type' : 'multipart/form-data',
        },

      });

      console.log(response.data)

    } catch(error) {
     alert("Invalid Format")
    }
  }



  return (
    <section className='w-screen pt-4 flex items-center fixed justify-center'>
      <div className='flex-col flex items-center justify-center border-2 p-4 rounded-lg shadow-lg'>
        <h2 className='pr-9 text-2xl text-customPurple3 font-bold'>Import your Dataset Here</h2>
        <div className='flex flex-row pr-28 pl-2 mt-1'> 
          <p className='mr-2 text-slate-500'>Accepted Formats: .csv & .xlsx</p>
        </div>
        <div className="flex items-center justify-center pt-4 mb-1 w-80"> 
          <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-customPurple3 rounded-md p-4 flex items-center justify-center hover:bg-gray-100 transition w-full">
            <FontAwesomeIcon icon={faCloud} className='text-customPurple3 mr-2 text-base' />
            <p className={`${fileName ? 'hidden' : ''} text-center`}>Browse Files to Upload</p>

            {fileName && <span className="ml-2 mr-4 overflow-hidden">{fileName}</span>}
            {fileName && <FontAwesomeIcon icon = {faTrash} className='text-red-600 pl-2' onClick = {removeFile}/>}
            
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
    </section>
  );
}

export default Generate;
