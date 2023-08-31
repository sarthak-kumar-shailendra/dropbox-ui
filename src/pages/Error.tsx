import React from 'react'
import Button from 'react-bootstrap/Button';

const Error = () => {
  return (
    <div className='text-center mt-10'>
    <h1 className='text-center text-2xl'>Error - Please check URL or click below</h1>
    <Button className={'border-2 bg-sky-600 p-2 m-10 '} onClick={()=>{
      window.location.href="/"
    }}>Go to Homepage
      </Button>
      </div>
  )
}

export default Error