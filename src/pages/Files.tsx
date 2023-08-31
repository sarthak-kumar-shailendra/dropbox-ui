import React, { useEffect, useState } from 'react'
import { IFiles, getAllFiles} from '../utils.ts';
import { Button } from 'react-bootstrap';
import File from './File.tsx';
import { isEmpty } from 'lodash-es';

function Files(){

  const [files,setFiles] = useState<IFiles[]>([]);

  useEffect(()=>{
    if(isEmpty(files)){
      fetchFiles();
    }
  },[]); 
  

  async function fetchFiles(){
    const response = await fetch(getAllFiles());
    const resData = await response.json();
    setFiles(resData);
  }

  return (
    <div>
      <h1 className="text-2xl text-center">List of files uploaded - {files.length}</h1>
      <Button variant="primary" className='border-2 bg-sky-700 p-2 ml-10 ' onClick={()=>{window.location.href="/"}}>Upload File</Button>
      <div className='text-center'>
      {
        files.map((ele)=>(
          <File key={ele?.id} ele={ele}
           />
        ))
      }
      </div>
    </div>
  )
}

export default Files;