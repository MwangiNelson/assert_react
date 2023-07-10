import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router'
import { AppContext } from '../Contexts/AuthContext';


function SignUpVolunteer() {

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const userDocsNat = useRef(null);
    const userDocsConduct = useRef(null);


    const { registerVolunteer } = useContext(AppContext)

    const handleRegister = (e) => {
        e.preventDefault();

        const userData = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            phone_number: phoneRef.current.value,
            national_id: null, // Placeholder for file content
            conduct_certificate: null, // Placeholder for file content
        };

        const handleFileRead = (file, callback) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                callback(fileContent);
            };
            reader.readAsText(file);
        };

        const registerUser = () => {
            // Perform actions with form data
            if (registerVolunteer(userData)) {
                alert('Volunteer request has been received successfully');
            } else {
                alert('Volunteer request failed');
            }
        };

        const natFile = userDocsNat.current.files[0];
        if (natFile) {
            handleFileRead(natFile, (fileContent) => {
                userData.national_id = null;
                handleFileReadConduct();
            });
        } else {
            handleFileReadConduct();
        }

        const handleFileReadConduct = () => {
            const conductFile = userDocsConduct.current.files[0];
            if (conductFile) {
                handleFileRead(conductFile, (fileContent) => {
                    userData.conduct_certificate = null;
                    registerUser();
                });
            } else {
                registerUser();
            }
        };

        usernameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        userDocsNat.current.value = '';
        userDocsConduct.current.value = '';
    };

    const [pageToggle, setPageToggle] = useState(true)

    const toggle = () => {
        setPageToggle(!pageToggle)
    }

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };



    return (

        <div className="w-100 py-4 vh-75 bg-light d-flex jcc aic">

            <div className="w-50 position-relative d-flex bg-primary-green rounded-2 flex-column align-items-center p-4 gap-4 animate-in">
                <button className='close-btn position-absolute top-0 end-0 m-4 bg-light' onClick={handleGoBack}>
                    <img src="images/cancel.png" alt="" className='img-contain w-100' />
                </button>
                <h1 className="display-3 d-flex flex-column text-primary w-75">VOLUNTEER AS A PEACE USHER<span className="bg-secondary-green rounded-1 w-25 align-self-start p-1"></span></h1>
                <form onSubmit={handleRegister} className='w-75 d-flex flex-column text-light gap-4 py-4'>
                    <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
                        <i className="fa-solid fa-user text-light fs-3"></i>
                        <input type="text" required ref={usernameRef} className="app-input w-100" placeholder='Full names *' />
                    </div>
                    <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
                        <i className="fa-solid fa-envelope text-light fs-3"></i>
                        <input type="email" required ref={emailRef} className="app-input w-100" placeholder='Email *' />
                    </div>
                    <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
                        <i className="fa-solid fa-phone text-light fs-3"></i>
                        <input type="number" required ref={phoneRef} className="app-input w-100" placeholder='Phone number *' />
                    </div>
                    <div className="d-flex flex-column w-100">
                        <div className="position-relative input-wrapper d-flex flex-row align-items-center border-0 p-1">
                            <i className="fa-solid fa-file text-light  fs-3 pe-3"></i>
                            <div className="d-flex flex-column gap-3 border-0 border-start">
                                <div className="d-flex flex-row px-3  aic gap-4">
                                    <label htmlFor="" className='text-info fs-4 font-primary'>National Id</label>
                                    <input type="file" accept=".pdf" required ref={userDocsNat} className="" />

                                </div>
                                <div className="d-flex flex-row px-3 jcc aic gap-4">
                                    <label htmlFor="" className='text-info fs-4 font-primary'>Conduct certificate</label>
                                    <input type="file" accept=".pdf" required ref={userDocsConduct} className="" />

                                </div>
                            </div>
                        </div>
                        <small className="text-success fs-5">Add your personal documents here <br /> <i className="text-warning">(Please send a copy of your national id and certificate of conduct seperately)</i> </small>
                    </div>

                    <button className="btn btn-primary fs-3 w-50" type='submit'>
                        SUBMIT
                    </button>

                </form>
            </div>
        </div>

    )
}

export default SignUpVolunteer