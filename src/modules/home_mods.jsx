import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'

export const Landing = () => {


  const { isAuthenticated } = useContext(AppContext)
  return (
    <div className='w-100 bg-light p-4 d-flex justify-content-center'>
      <div className="w-75 d-flex flex-row">
        <div className="w-50 d-flex flex-column gap-2 justify-content-center h-100">
          <h1 className='display-1'>ASSERT</h1>
          <h2 className='display-1'>We vouch for <br /> <b className='text-primary'>EQUITY AND JUSTICE</b> </h2>
          <p className='font-primary'>We invite you to join us on our journey to create a better world.</p>
          <div className="d-flex flex-row w-100 justify-content-start gap-4">
            <Link to={isAuthenticated ? '/post-protests' : '/auth'}>
              <button className="btn btn-outline-success rounded-0 px-4 py-2 fs-2" >
                SCHEDULE A PROTEST
              </button>
            </Link>
            <Link to={'/register-volunteer'}>
              <button className="btn btn-outline-primary rounded-0 px-4 py-2 fs-2">
                BECOME A PEACE USHER
              </button>
            </Link>
          </div>
        </div>
        <div className="w-50 p-3">
          <img src="images/demos.jpg" className='w-100 vh-75 img-cover rounded-4' alt="" />
        </div>
      </div>
    </div>
  )
}
