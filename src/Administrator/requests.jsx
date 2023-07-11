import React, { useState, useEffect } from 'react';
import { requestCategories } from './data';

function VolunteerRequests() {
    const [requests, setRequests] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [displayRequests, setDisplayRequests] = useState([]);
    const [verifiedCount, setVerifiedCount] = useState(0);
    const [unverifiedCount, setUnverifiedCount] = useState(0);

    const getVolunteerRequests = async () => {
        const url = 'http://127.0.0.1:8000/api/volunteerRequests';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data.volunteer_requests);
            } else {
                console.log('Data could not be fetched.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const getVerified = () => {
        const filteredArray = requests.filter((obj) => obj.is_validated);
        setDisplayRequests(filteredArray);
        setVerifiedCount(filteredArray.length);
        setUnverifiedCount(requests.length - filteredArray.length);
    };

    const getUnverified = () => {
        const filteredArray = requests.filter((obj) => !obj.is_validated);
        setDisplayRequests(filteredArray);
        setUnverifiedCount(filteredArray.length);
        setVerifiedCount(requests.length - filteredArray.length);
    };

    const getVolunteerData = async (volunteer_id) => {
        const url = `http://127.0.0.1:8000/api/volunteers/${volunteer_id}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const volunteer = data.volunteer;
                return volunteer;
            } else {
                console.log('Data could not be fetched.');
                return null;
            }
        } catch (error) {
            console.log('Error:', error);
            return null;
        }
    };

    const getProtestData = async (protest_id) => {
        const url = `http://127.0.0.1:8000/api/protest/${protest_id}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const protest = data.data;
                return protest;
            } else {
                console.log('Data could not be fetched.');
                return null;
            }
        } catch (error) {
            console.log('Error:', error);
            return null;
        }
    };

    const toggleValidation = async (requestId, is_validated) => {
        const url = `http://127.0.0.1:8000/api/request/update`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: requestId,
                    is_validated: !is_validated,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('tried to reload here');
                // Update the is_validated status in the ushers state
                const updatedRequests = requests.map((request) => {
                    if (request.id === requestId) {
                        return {
                            ...request,
                            is_validated: !request.is_validated,
                        };
                    }
                    return request;
                });
                setRequests(updatedRequests);
                // Update the displayedUshers state based on the new approval status
                methods[tabIndex]();
            } else {
                console.log('User could not be updated.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    };

    const getVolunteerAndProtestData = async () => {
        const promises = requests.map(async (request) => {
            const volunteer = await getVolunteerData(request.volunteer_id);
            const protest = await getProtestData(request.protest_id);
            return { ...request, volunteer, protest };
        });
        const requestData = await Promise.all(promises);
        setDisplayRequests(requestData);
    };
    const methods = [getVerified, getUnverified];
    const countValues = [verifiedCount, unverifiedCount];

    useEffect(() => {
        getVolunteerRequests();
        methods[tabIndex]();
        getVolunteerAndProtestData();
    }, []);

    useEffect(() => {
        getVolunteerAndProtestData()
        methods[tabIndex]();
    }, [requests]);





    const DashCard = ({ title, method, index }) => {
        const isActive = tabIndex === index;
        const count = countValues[index];

        return (
            <div
                className={`w-100 gap-3 btn btn-light rounded-2 border-secondary d-flex flex-column pt-2 px-4 tas ais ${isActive ? 'bg-secondary' : ''
                    }`}
                onClick={method}
            >
                <h3 className='fs-3 w-100'>{title}</h3>
                <h1 className={`display-5 ${isActive ? 'text-secondary-green' : 'text-dark'} text-bold`}>
                    {count}
                </h1>
            </div>
        );
    };

    return (
        <div className='w-75 d-flex flex-column py-4'>
            <div className='w-100 d-flex flex-row aic jsb'>
                <h2 className='display-3 pt-3'>VOLUNTEER REQUESTS</h2>
            </div>
            <div className='d-flex flex-row py-4 gap-4'>
                {requestCategories.map((category, index) => (
                    <DashCard
                        key={index}
                        title={category}
                        method={() => {
                            setTabIndex(index);
                        }}
                        index={index}
                    />
                ))}
            </div>
            <div className='p-4 w-100 d-flex flex-column rounded border'>
                <h3 className='fs-3'>Administrator table view</h3>
                <p className='text-secondary font-primary'>Please operate carefully, data is pretty sensitive</p>

                <table className='table pt-4 font-primary'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col' className=''>
                                VOLUNTEER
                            </th>
                            <th>VOLUNTEER VERIFICATION</th>
                            <th scope='col' className='w-25 tac'>
                                PROTEST
                            </th>
                            <th scope='col' className='tac'>
                                PROTEST VERIFICATION
                            </th>
                            <th className='tac'>REQUEST VERIFICATION</th>
                            <th scope='col' className='tac'>
                                OPTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayRequests.map((request, index) => (
                            <tr key={index}>
                                <th scope='row' className='fs-4'>
                                    {request.id}
                                </th>
                                <td className='fs-4'>{request.volunteer?.username}</td>
                                <td className={`fs-4 tac ${request.volunteer?.is_validated ? 'text-success' : 'text-danger'}`}>{request.volunteer?.is_validated ? 'NOT BANNED' : 'BANNED'}</td>
                                <td className='fs-4 tac'>{request.protest?.title}</td>
                                <td className={`fs-4 tac ${request.protest?.is_validated ? 'text-success' : 'text-danger'}`}>{request.protest?.is_validated ? 'VALIDATED' : 'NOT VALIDATED'}</td>
                                <td className='fs-4 tac'>{request.is_validated ? 'REQUEST VALIDATED' : 'REQUEST NOT VALIDATED'}</td>


                                <td>
                                    <div className='d-flex flex-row-reverse jcc aic gap-4'>
                                        <button
                                            className={`btn gap-3 fs-4 p-0 px-3 d-flex jcc aic flex-row ${request.is_validated ? 'btn-danger' : 'btn-success'
                                                }`}
                                            onClick={() => {
                                                toggleValidation(request.id, request.is_validated);
                                            }}
                                        >
                                            {request.is_validated ? (
                                                <>
                                                    REJECT <i className='fa-solid fa-ban fs-5'></i>
                                                </>
                                            ) : (
                                                <>
                                                    ACCEPT <i className='fa-solid fa-check fs-5'></i>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VolunteerRequests;
