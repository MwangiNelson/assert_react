import React, { useContext, useEffect, useState } from 'react'
import { Loader, ProtestCard } from '../components/features'
import axios from 'axios';

function Protests() {
    const [loading, setLoading] = useState(true)
    const [protests, setProtests] = useState(null)

    const fetchProtests = async () => {
        const url = 'http://127.0.0.1:8000/api/protests';
        try {
            const response = await axios.get(url);
            const data = response.data.protests;
            setProtests(data);
            // console.log('Protest fetch successful:', data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchProtests()
        }, 2000)
    }, []);



    return (
        <div className="w-100 d-flex flex-row justify-content-center bg-primary-green vh-100 animate-in">
            <div className="w-75 d-flex flex-column align-items-center pt-4">
                <h1 className="display-1 text-light mt-4">JOIN THE MOVEMENT <b className='text-success'>.</b></h1>
                <p className="text-secondary fs-4 mb-4">Join other people who seek change in our society in a peaceful way for the benefit of us all</p>
                {/* <span className="border-bottom w-100 border-success border-0 py-4"></span> */}
                <div className="d-flex w-100 flex-row py-4 flex-wrap">
                    {
                        loading ?
                            <Loader /> :
                            protests.map((protest, index) => {
                                return (
                                    <ProtestCard key={index} title={protest.title} venue={protest.venue} date={protest.event_date} />
                                )
                            })

                    }
                </div>

            </div>
        </div>
    )
}

export default Protests