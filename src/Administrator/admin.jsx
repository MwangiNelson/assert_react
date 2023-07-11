import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'
import VolunteerDashboard from './volunteers_dashboard'
import UserDashboard from './users_dashboard'
import ProtestDashboard from './protest_dashboard'



function AdminPanel() {
  const [tab, setTab] = useState(0)
  const dashboards = [<VolunteerDashboard />, <ProtestDashboard />, <UserDashboard />]
  return (
    <div className='w-100 vh-100 bg-webflow aic d-flex flex-column'>
      <nav className='w-100 bg-secondary d-flex flex-row justify-content-center z-over border-0 border-bottom border-secondary border-1'>
        <div className="w-75 d-flex flex-row jcc">
          <button className={`btn ${(tab == 0) ? 'btn-success text-light' : 'btn-light'} text-success fs-4 rounded-0 border-0 w-25 border-end border-secondary`} onClick={() => { setTab(0) }}>VOLUNTEERS</button>
          <button className={`btn ${(tab == 1) ? 'btn-success text-light' : 'btn-light'} text-success fs-4 rounded-0 border-0 w-25 border-end border-secondary`} onClick={() => { setTab(1) }}>PROTESTS</button>

          <button className={`btn ${(tab == 2) ? 'btn-success text-light' : 'btn-light'} text-success fs-4 rounded-0 w-25`} onClick={() => { setTab(2) }}>USERS</button>
        </div>

      </nav>
      {dashboards[tab]}
    </div>
  )
}

export default AdminPanel



