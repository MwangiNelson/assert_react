import React, { useContext, useEffect, useState } from 'react'
import { Loader } from '../components/features'
import { AppContext } from '../Contexts/AuthContext'

function Protests() {
    const { fetchProtests, protests } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    fetchProtests()

    useEffect(() => {
        setLoading(protests == null)
    }, [protests])

    return (
        <div className="w-100 d-flex flex-row justify-content-center bg-primary-green vh-100 animate-in">
            <div className="w-75 d-flex flex-column align-items-center pt-4">
                <h1 className="display-1 text-light">JOIN THE MOVEMENT <b className='text-success'>.</b></h1>
                <p className="text-secondary fs-4">Join other people who seek change in our society in a peaceful way for the benefit of us all</p>
                <span className="border-bottom w-100 border-success border-0 py-4"></span>
                {
                    loading ?
                        <Loader /> :
                        <div>
                            <h2>Data is ready</h2>
                        </div>
                }
            </div>
        </div>
    )
}

export default Protests