import React from 'react'
import './loader.css'

export const ProtestCard = (props) => {
    return (
        <div className="input-wrapper d-flex flex-row">
            <i className="fa-solid fa-envelope text-light"></i>
            <input type="text" className="app-input w-100" placeholder='Email *' />
        </div>
    )
}

export const Loader = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div class="lds-facebook"><div></div><div></div><div></div></div></div >
    )
}