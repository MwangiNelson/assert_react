import React, { useContext, useRef } from 'react'
import { AppContext } from '../Contexts/AuthContext';

function Registration(props) {

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const { registerUser } = useContext(AppContext)

  const handleRegister = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    // Perform actions with form data
    registerUser(username, email, password, confirm);

    // Reset the form
    usernameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmRef.current.value = '';
  };




  return (

    <div className="w-50 position-relative d-flex bg-primary-green rounded-2 flex-column align-items-center p-4 gap-4 animate-in">
      <h1 className="display-3 d-flex flex-column text-primary w-75">SIGN UP <span className="bg-secondary-green rounded-1 w-25 align-self-start p-1"></span></h1>
      <form onSubmit={handleRegister} className='w-75 d-flex flex-column text-light gap-4 py-4'>
        <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
          <i className="fa-solid fa-user text-light fs-3"></i>
          <input type="text" ref={usernameRef} className="app-input w-100" placeholder='Username *' />
        </div>
        <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
          <i className="fa-solid fa-envelope text-light fs-3"></i>
          <input type="email" ref={emailRef} className="app-input w-100" placeholder='Email *' />
        </div>
        <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
          <i className="fa-solid fa-lock text-light fs-3"></i>
          <input type="password" ref={passwordRef} className="app-input w-100" placeholder='Password *' />
        </div>
        <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
          <i className="fa-solid fa-key text-light fs-3"></i>
          <input type="password" ref={confirmRef} className="app-input w-100" placeholder='Confirm *' />
        </div>
        <p className='font-primary d-flex flex-row gap-2'>Already have an account? <p className='text-info font-primary cursor-pointer' onClick={props.toggleAuth} >Sign in here.</p></p>

        <button className="btn btn-primary fs-3 w-50" onClick={handleRegister}>
          SUBMIT
        </button>

      </form>
    </div>

  )
}

export default Registration