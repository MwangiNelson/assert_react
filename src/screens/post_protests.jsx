import React, { useRef, useContext } from 'react'
import { AppContext } from '../Contexts/AuthContext';

function PostProtests() {
    const protestTitle = useRef(null);
    const protestVenue = useRef(null);
    const protestDate = useRef(null);
    const protestDescription = useRef(null);

    const { userData, postProtests } = useContext(AppContext)

    function postUserProtest(e) {
        e.preventDefault();

        const protestData = {
            title: protestTitle.current.value,
            venue: protestVenue.current.value,
            event_date: protestDate.current.value,
            description: protestDescription.current.value,
            creator_token: userData.user_token
        }

        if (postProtests(protestData)) {
            alert('Protest posted successfully, waiting approval...')
        } else {
            alert('Post failed')
        }


        protestVenue.current.value = '';
        protestTitle.current.value = '';
        protestDate.current.value = ''
        protestDescription.current.value = ''
    }

    return (
        <div className="w-100 vh-100 bg-light d-flex jcc py-4">
            <div className="w-50 d-flex flex-column py-4">
                <h2 className="fs-1 text-green">
                    FILL OUT THIS FORM TO POST A PROTEST
                </h2>
                <span className="border w-25 border-success"></span>

                <form onSubmit={postUserProtest} className="d-flex flex-column w-100 py-4">
                    <div className="d-flex w-100 flex-row jcc aic gap-4 jcs">
                        <i className="fa-solid fa-user fs-2"></i>
                        <input type="text" ref={protestTitle} className="form-control w-75 rounded-1 fs-3 py-0" required placeholder='Enter title here *' />
                    </div>
                    <small className="form-text fs-5 text-secondary font-italic pb-4">Preferably summarise the reason for the protest and use it as the title <b className='text-success ps-2'>eg. Women Rights Protest</b></small>
                    <div className="d-flex w-100 flex-row jcc aic gap-4 jcs pb-4">
                        <i className="fa-solid fa-location-dot fs-2"></i>
                        <input type="text" ref={protestVenue} className="form-control w-75 rounded-1 fs-3 py-0" required placeholder='Enter venue location here *' />
                    </div>
                    <div className="d-flex w-100 flex-row jcc aic gap-4 jcs">
                        <i className="fa-solid fa-calendar-days fs-2"></i>
                        <input type="date" ref={protestDate} className="form-control w-75 rounded-1 fs-3 py-0" required placeholder='Enter title here *' />
                    </div>
                    <small className="form-text fs-5 text-secondary font-italic pb-4">Events should be posted <b className='text-info'> 4 days </b> prior with a maximum limit of <b className='text-info'>14 days</b> from posting day</small>

                    <div className="d-flex w-100 flex-row jcc gap-4 jcs pb-4">
                        <i className="fa-solid fa-paperclip fs-2"></i>
                        <textarea ref={protestDescription} cols="30" rows="6" className="form-control w-75 fs-3 py-0" required placeholder='Enter your protest description here *' ></textarea>
                    </div>
                    <div className="d-flex flex-row w-100 gap-4 aic">
                        <input type="checkbox" required aria-label="Checkbox for following text input" className='' />
                        <h4 className='p-0 m-0'>By ticking here you accept our terms and conditions</h4>
                    </div>
                    <small className="text-success form-text fs-5 text-secondary font-italic pb-4">Events posted will be reviewed by the organiser panel and posted once reviewed</small>
                    <button className="btn btn-primary w-25 fs-3 py-1" type='submit'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default PostProtests