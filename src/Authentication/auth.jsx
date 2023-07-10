import React, { useState } from 'react'
import Login from './login'
import Registration from './registration'
import { useNavigate } from 'react-router';


const AuthWrapper = () => {

  const [pageToggle, setPageToggle] = useState(true)

  const toggle = () => {
    setPageToggle(!pageToggle)
  }

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-100 bg-light d-flex justify-content-center vh-100 align-items-center position-fixed z-top animate-in" >
      <button className='close-btn' onClick={handleGoBack}>
        <img src="images/cancel.png" alt="" className='img-contain w-100' />
      </button>
      {pageToggle ? <Login toggleAuth={toggle} /> : <Registration toggleAuth={toggle} />}
    </div >
  )
}

export default AuthWrapper
