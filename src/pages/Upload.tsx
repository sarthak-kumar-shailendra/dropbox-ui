import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {postFile} from '../utils.ts';

function Upload() {
  const [file,setFile] = useState();
  const [fileUploadResponse, setFileUploadResponse] = useState<any>();

function onChange(file){
  if(!file) {
    return;
  }
  setFile(file);
}

async function handleSubmit(){
  if(file){
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(postFile(), {
    method: 'POST',
    body: formData,
    })

    const resData = await response.json();
    setFileUploadResponse(resData);
    setFile(null);
  }
}

  return (
    <div className='text-center'>
    <div className='text-2xl m-4'>Welcome</div>
    <Button className={'border-2 bg-sky-600 p-2 m-10 '} onClick={()=>{
      window.location.href="/files"
    }}>SEE ALL UPLOADED FILES</Button>
 
    <div className='m-4'>
    <input
    type='file'
    onChange={(event) => onChange(event?.target?.files[0])}
  />
    <Button className={'border-2 bg-sky-600 p-2 m-10 '} onClick={handleSubmit}>Upload</Button>
    </div>
    <h3>{fileUploadResponse?.message}</h3>
    <h3>{fileUploadResponse?.fileId ? "File Id is " + fileUploadResponse?.fileId : null}</h3>
    </div>
  )
}

export default Upload;