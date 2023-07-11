import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Contexts/AuthContext'
import './loader.css'

export const ProtestCard = (props) => {
    const [isVolunteer, setIsVolunteer] = useState(false)
    const { userData } = useContext(AppContext)

    useEffect(() => {
        (userData !== null && userData.user_privileges == 'volunteer') ? setIsVolunteer(true) : setIsVolunteer(false)
    }, [userData])

    return (
        <div className={`${props.selected == props.index ? 'w-100' : 'w-50'} p-3 d-flex flex-row`}>
            <div className={`btn rounded-1 bg-light border p-0 w-100 d-flex flex-row rounded`} >
                <img src="images/demos.jpg" alt="" className={`${props.selected == props.index ? 'w-25' : 'w-50'} rounded-1 img-cover `} />
                <div className="w-75 ais d-flex flex-column p-4">
                    <div className="w-100 d-flex flex-row border-0 border-bottom border-2 border-dark aic justify-content-between">
                        <h2 className="fs-2 text-uppercase text-bold p-0 m-0 tas">{props.title.toString().toLowerCase()}</h2>
                    </div>

                    <div className="d-flex flex-row w-100 pt-3">
                        <div className={`${props.selected == props.index ? 'w-25' : 'w-100'}  w-50 d-flex flex-column`}>
                            <h4 className='text-capitalize d-flex gap-1'>Venue <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary'>{props.venue.toString().toLowerCase()}</b></h4>
                            <h4 className='text-capitalize d-flex gap-1'>Date <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary justify-content-center d-flex'>{props.date}</b></h4>
                            <button
                                className={`btn gap-4 rounded-1 p-2 px-3 m-0 d-flex jcc aic ${props.selected == props.index ? 'w-50 btn-outline-secondary ' : 'w-75 btn-outline-success '} `}
                                onClick={() => { props.method(props.index) }}
                            >
                                {props.selected == props.index ? 'SHOW LESS' : 'SHOW MORE'}
                                {props.selected == props.index ? <i className="fa-solid fa-angle-left fs-5"></i> : <i className="fa-solid fa-angle-right fs-5"></i>}

                            </button>

                            {
                                isVolunteer ? <button
                                    className={`btn my-2 gap-4 rounded-1 p-2 px-3 m-0 d-flex btn-outline-info jcc aic ${props.selected == props.index ? 'w-50 ' : 'w-75'} `}
                                >
                                    VOLUNTEER TO USHER
                                </button> : null
                            }
                        </div>
                        <div className="w-75 text-secondary tas animate-down" style={{ display: (props.selected == props.index) ? '' : 'none', overflow: 'hidden' }} >
                            <h3 className="fs-2 text-dark border-0 border-bottom">Event Description</h3>
                            <p className='tas m-0 '>{props.description}</p>
                        </div>
                    </div>



                </div>

            </div>
        </div >
    )
}

export const Loader = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook lds-facebook-white"><div></div><div></div><div></div></div></div >
    )
}

export const LoaderGreen = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook lds-facebook-green"><div></div><div></div><div></div></div></div >
    )
}

