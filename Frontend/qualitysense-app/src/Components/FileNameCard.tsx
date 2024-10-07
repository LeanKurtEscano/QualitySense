import React from 'react'
interface GenerateLogs {
   fileName: string;
   date: string;
}
const FileNameCard: React.FC<GenerateLogs> = ({fileName, date}) => {
  return (
    <div className='flex flex-row bg-loginbg border border-gray-800 text-slate-200 shadow-lg p-4'>
        <div className='mr-2 font-bold '>
            <h2>{fileName}</h2>
        </div>
        <div className='pl-16'>
            <h2>{date} </h2>
        </div>

    </div>
  )
}

export default FileNameCard