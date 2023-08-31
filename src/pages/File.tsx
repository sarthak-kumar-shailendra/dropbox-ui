import React, { useEffect, useState } from 'react'
import {  getFile } from '../utils.ts';
import moment from 'moment';
import { Button } from 'react-bootstrap';

function File({
  ele
}){

  const [link,setLink] = useState('');
  const [fileName,setFileName] = useState('');
  const [fName,setFName]= useState(ele?.fileName);
  const [updatedAt,setUpdatedAt]= useState(moment(ele?.updatedAt).format('DD-MM-YYYY hh:mm:ss'));
  const [disableBtn,setdisableBtn] = useState(true);
  const [text,setText] = useState('');

  const [showDelMsg,setShowDelMsg] = useState('');

  useEffect(()=>{
    if(link!=''){
      setdisableBtn(false);
    }
  },[link]);

  async function handleGet(){
    const response = await fetch(getFile(ele?.id));
    // console.log(response.headers.get('Content-Disposition')?.split('filename=')[1]?.slice(1, response.headers.get('Content-Disposition')?.length-2)); 
    const resData = await response.blob();
    const index: number = response.headers.get('Content-Disposition')?.indexOf(`attachment; filename="`) || 0;
    const len: number = response.headers.get('Content-Disposition')?.length || 0;
    const fileNameType = response.headers.get('Content-Disposition')?.slice(index + `attachment; filename="`.length, len-1);
    setFileName(fileNameType);
    const csvUrl = URL.createObjectURL(resData);
    setLink(csvUrl);
    
  } 
    
  async function handleDelete(){
    const response = await fetch(getFile(ele?.id), {
    method: 'DELETE',
    });
    const resData = await response.text();
    setShowDelMsg(resData);
    if(resData === "File Deleted Successfully")
      window.location.href="/files";
  }

  function handleText(value : any){
    setText(value);
  }

  async function handlePut(){
    const extension = fName.split('.')[1];

    if(text!=""){
      const payload = {
        fileName: text + "." + extension,
      };
      const response = await fetch(getFile(ele?.id), {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json'
      }
      });
      const resData = await response.json();
      if(resData?.fileName !=""){
        setFName(resData?.fileName);
        setUpdatedAt(moment(resData?.updatedAt).format('DD-MM-YYYY hh:mm:ss'))
        setFileName(resData?.fileName);
      }
      setText('');
   }
  }
  

  return (
    <div key={ele?.id} className="text-black border-double border-4 rounded-lg bg-white border-white  shadow-2xl m-6 font-serif ">
    <h3>File ID - {ele?.id}</h3>
    <h3>File NAME - {fName} </h3> 
    <h3>File TYPE - {ele?.type} </h3>
    <h3>File SIZE - {ele?.size} </h3>
    <h3>File CREATED AT - {moment(ele?.createdAt).format('DD-MM-YYYY hh:mm:ss')} </h3>
    <h3>File UPDATED AT - {updatedAt} </h3>
    <Button className={'border-2 p-2 m-4 w-50 bg-sky-500'} onClick={handleGet}>FETCH FILE CONTENT</Button>
    <a href={link} download={fileName}><Button className={'border-2 p-2 w-40 bg-sky-500' } disabled={disableBtn}>DOWNLOAD</Button> </a>
    <Button className={'border-2 p-2 m-4 w-40 bg-sky-500'} onClick={handleDelete}>DELETE FILE</Button>
    {showDelMsg}
    <div>
    <input name="rename" className="border-2" type="text" onChange={e=>{handleText(e.target.value)}} value={text} />
    <Button className={'border-2 p-2 m-4 w-40 bg-sky-500'} onClick={handlePut}>RENAME FILE</Button>
    </div>
    <div>(click on fetch file content cta to activate download button)</div>
     <div>(while renaming no need to add extension)</div>
  </div>
  )
}

export default File;