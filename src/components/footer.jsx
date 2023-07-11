import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'


const Footer = () => {
  const { isAuthenticated, userData, logout } = useContext(AppContext)


  return (
    <div className="w-100 bg-primary-green d-flex jcc">
      <div className="w-75 d-flex flex-row jsb">
        <div className="w-25 py-3 d-flex flex-column aic">
          <img src="images/app_logo.png" alt="" className='logo-img' />
          <h4 className="fs-4 text-light">EQUITY & JUSTICE</h4>
        </div>
        <div className="w-25 d-flex flex-column jcc">
          <h3 className="text-secondary">QUICK LINKS</h3>
          {
            (userData !== null && userData.user_privileges == 'administrator') ?
              <ul className="d-flex gap-2 flex-column justify-content-center align-items-start m-0 text-bold">
                <li className='nav-link'><Link to='/admin' className='text-light fs-3 text-decoration-none'>ADMIN DASHBOARD</Link></li>
              </ul>
              :
              <ul className="d-flex gap-2 flex-column justify-content-center align-items-start m-0 text-bold">
                <li className='nav-link '><Link to='/' className='fs-3 text-light text-decoration-none'>HOME</Link></li>
                <li className='nav-link'><Link to='/protests' className='text-light fs-3 text-decoration-none'>PROTESTS</Link></li>
                {
                  userData !== null ? <li className='nav-link'><Link to='/post-protests' className='text-light fs-3 text-decoration-none'>POST PROTESTS</Link></li>
                    : null
                }

              </ul>
          }
        </div>
        <div className="w-25 d-flex jcc aic">
          <h4 className="text-light">
            Copyright ASSERT 2023. <br />
            DONATE FOR THE CAUSE ; )          </h4>
        </div>
      </div>
    </div>
  )
}

export default Footer