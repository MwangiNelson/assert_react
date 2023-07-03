import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'

const Navbar = () => {
    const { isAuthenticated, userData } = useContext(AppContext)

    return (
        <nav className='w-100 bg-primary-green d-flex flex-row justify-content-center z-top border-0 border-bottom border-secondary border-1'>
            <div className="w-75 d-flex flex-row justify-content-between align-items-center">
                <img src="images/app_logo.png" alt="" className='logo-img' />
                <div className="w-75 d-flex flex-row align-items-center justify-content-around align-items-center gap-4">
                    <div className="nav-links d-flex flex-row justify-content-center align-items-center">
                        <ul className="d-flex gap-4 flex-row justify-content-center align-items-center m-0 text-bold">
                            <li className='nav-link '><Link to='/' className='fs-3 text-light text-decoration-none'>HOME</Link></li>
                            <li className='nav-link'><Link to='/protests' className='text-light fs-3 text-decoration-none'>PROTESTS</Link></li>
                        </ul>
                    </div>
                    {!isAuthenticated ?
                        <div className="d-flex gap-4 flex-row">
                            <Link to='/auth'><button className="btn btn-primary px-4 rounded-1">LOG IN</button></Link>
                            <Link to='/auth'><button className="btn btn-success bg-secondary-green border-0 rounded-1 px-4">SIGN UP</button></Link>
                        </div>
                        :
                        <div className='d-flex gap-4 flex-row align-items-center'>
                            <img src="images/user.png" alt="" className='user-img img-contain' />
                            <h2 className="fs-4 text-uppercase text-info">{userData.username}</h2>
                        </div>}

                </div>
            </div>

        </nav>
    )
}

export default Navbar