import React, { useContext, useEffect, useState } from 'react'
import { Loader, ProtestCard } from '../components/features'
import axios from 'axios';

function Protests() {
    const [loading, setLoading] = useState(true)
    const [protests, setProtests] = useState(null)
    const [selected, setSelected] = useState(null)

    const toggleDescription = (index) => {
        (index == selected) ? setSelected(null) : setSelected(index)
    }

    const fetchProtests = async () => {
        const url = 'http://127.0.0.1:8000/api/valid-protests';
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
                <div className="d-flex w-100 flex-row py-4 flex-wrap border-0 border-top border-1">
                    {
                        (loading) ?
                            <Loader /> :
                            (protests !== null) ?
                                protests.map((protest, index) => {
                                    return (
                                        <ProtestCard
                                            key={index}
                                            index={index}
                                            protest_id = {protest.protest_id}
                                            title={protest.title}
                                            venue={protest.venue}
                                            date={protest.event_date}
                                            description={protest.description}
                                            selected={selected}
                                            method={toggleDescription}
                                        />
                                    )
                                }) : <div className='w-100 bg-warning p-2 border tac text-secondary rounded-1'>
                                    No available protests at the moment
                                </div>

                    }
                </div>

            </div>
        </div>
    )
}

export default Protests