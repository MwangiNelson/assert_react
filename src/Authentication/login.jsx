import React, { useContext, useRef } from 'react'
import { AppContext } from '../Contexts/AuthContext'
function Login(props) {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { loginUser } = useContext(AppContext)

  function handleLogin(e) {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    loginUser(loginData)

    passwordRef.current.value = '';
    emailRef.current.value = '';
  }


  return (

    <div className="w-50 position-relative d-flex bg-primary-green rounded-2 flex-column align-items-center p-4 gap-4 animate-in">
      <h1 className="display-3 d-flex flex-column text-primary w-75">SIGN IN <span className="bg-secondary-green rounded-1 w-25 align-self-start p-1"></span></h1>
      <form onSubmit={(e) => { handleLogin(e) }} className='w-75 d-flex flex-column text-light gap-4 py-4'>
        <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
          <i className="fa-solid fa-envelope text-light fs-3"></i>
          <input type="email" ref={emailRef} className="app-input w-100" placeholder='Email *' />
        </div>
        <div className="input-wrapper d-flex flex-row align-items-center border-0 border-bottom p-1">
          <i className="fa-solid fa-lock text-light fs-3"></i>
          <input type="password" ref={passwordRef} className="app-input w-100" placeholder='Password *' />
        </div>
        <span className='font-primary d-flex flex-row gap-2'>Don't have an account? <p className='text-info font-primary cursor-pointer' onClick={props.toggleAuth}>Sign up here.</p></span>

        <button className="btn btn-primary fs-3 w-50" onClick={handleLogin}>
          SUBMIT
        </button>
      </form>
    </div >
  )
}

export default Login