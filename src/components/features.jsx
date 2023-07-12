import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Contexts/AuthContext'
import './loader.css'

export const ProtestCard = (props) => {
    const [isVolunteer, setIsVolunteer] = useState(false)
    const { userData } = useContext(AppContext)

    const volunteerAsUsher = async (protest_id) => {
        if (!isVolunteer) {
            return
        }

        const url = `http://127.0.0.1:8000/api/volunteer/usher`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    volunteer_id: userData.user_token,
                    protest_id: protest_id
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message)

            } else {
                console.log('Data could not be fetched.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }

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
                            <div className="w-100 d-flex gap-2 flex-row">
                                <button
                                    className={`btn gap-4 rounded-1 p-2 px-3 m-0 d-flex jcc aic ${props.selected == props.index ? 'w-50 btn-outline-secondary ' : 'w-50 btn-outline-success '} `}
                                    onClick={() => { props.method(props.index) }}
                                >
                                    {props.selected == props.index ? 'SHOW LESS' : 'SHOW MORE'}
                                    {props.selected == props.index ? <i className="fa-solid fa-angle-left fs-5"></i> : <i className="fa-solid fa-angle-right fs-5"></i>}

                                </button>
                                <button className="w-50 btn btn-outline-info"
                                    onClick={() => { props.postMethod() }}
                                >
                                    SHARE POST
                                    <i className="fa-solid fa-share ps-2"></i>
                                </button>
                            </div>

                            {
                                isVolunteer ? <button
                                    className={`btn my-2 gap-4 rounded-1 p-2 px-3 m-0 d-flex btn-outline-info jcc aic ${props.selected == props.index ? 'w-50 ' : 'w-75'} `}
                                    onClick={() => { volunteerAsUsher(props.protest_id) }}
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

export const ProtestPost = (props) => {
    return (
        <div className="w-100 position-fixed bg-blur vh-100 top-0 start-0 d-flex jcc aic">
            <div className="p-4 d-flex flex-column gap-2 w-25 shadow-lg animate-in bg-light rounded-1 border-1">
                <div className="d-flex jsb aic w-100 border-0 border-bottom border-dark flex-row">
                    <h1 className="text-dark fs-2 ">
                        COMMENT & POST
                    </h1>
                    <button className="btn btn-dark px-2 p-0"
                        onClick={() => { props.closeMethod() }}
                    >
                        <i className="fa-solid fa-xmark fs-2"></i>
                    </button>
                </div>
                <div className="w-100 border border-dashed border-primary rounded-1 p-2 vh-25 d-flex flex-column jcc aic">
                    <i className="fa-solid fa-plus text-primary fs-2"></i>
                    <h3 className="fs-3 text-primary">Post a photo</h3>
                </div>
                <div className="w-100 d-flex flex-column">
                    <label htmlFor="" className="font-tertiary text-secondary">Post your comment on the protest below</label>
                    <textarea id="" cols="30" rows="3" className='form-control'></textarea>
                </div>
                <button className="btn btn-primary w-50">POST</button>

            </div>
        </div>
    )
}