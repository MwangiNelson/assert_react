import React from 'react'
import './loader.css'

export const ProtestCard = (props) => {


    return (
        <div className="w-50 p-3 d-flex flex-row ">
            <div className="bg-light w-100 d-flex flex-row rounded" >
                <img src="images/demos.jpg" alt="" className="w-50 img-cover" />
                <div className="w-50 d-flex flex-column p-4">
                    <h2 className="fs-2 text-uppercase text-bold ">{props.title.toString().toLowerCase()}</h2>
                    <span className="w-50 border-primary-bg mb-4"></span>
                    <h4 className='text-capitalize d-flex gap-1'>Venue <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary'>{props.venue.toString().toLowerCase()}</b></h4>
                    <h4 className='text-capitalize d-flex gap-1'>Date <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary justify-content-center d-flex'>{props.date}</b></h4>
                    <button className='btn btn-outline-success w-50 rounded-0'>More details</button>
                </div>
            </div>
        </div>
    )
}

export const Loader = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook"><div></div><div></div><div></div></div></div >
    )
}

