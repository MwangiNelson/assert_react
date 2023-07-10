import React, { useContext, useEffect, useState } from 'react';
import { volunteerCategories } from './data';
import { AppContext } from '../Contexts/AuthContext';

function VolunteerDashboard() {
    const [ushers, setUshers] = useState([]);
    const [displayedUshers, setDisplayedUshers] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [verifiedCount, setVerifiedCount] = useState(0);
    const [unverifiedCount, setUnverifiedCount] = useState(0);


    const fetchUshers = async (params) => {
        const url = `http://127.0.0.1:8000/api/volunteers`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUshers(data.volunteers);
                console.log(data.volunteers);
            } else {
                console.log('Data could not be fetched.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    };

    const getVerified = () => {
        const filteredArray = ushers.filter((obj) => obj.is_validated);
        setDisplayedUshers(filteredArray);
        setVerifiedCount(filteredArray.length);
        setUnverifiedCount(ushers.length - filteredArray.length)
    };

    const getUnverified = () => {
        const filteredArray = ushers.filter((obj) => !obj.is_validated);
        setDisplayedUshers(filteredArray);
        setUnverifiedCount(filteredArray.length);
        setVerifiedCount(ushers.length - filteredArray.length)
    };

    // an array of methods for the btns
    const methods = [getVerified, getUnverified, getVerified, getUnverified];
    const countValues = [verifiedCount, unverifiedCount, verifiedCount, unverifiedCount]
    useEffect(() => {
        methods[tabIndex]();
    }, [tabIndex]);

    useEffect(() => {
        fetchUshers();
        methods[tabIndex]();
    }, []);

    useEffect(() => {
        methods[tabIndex]();
    }, [ushers]);

    async function disapprove(usherId, is_validated) {
        const url = `http://127.0.0.1:8000/api/volunteer/update`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    id: usherId,
                    is_validated: !is_validated,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('tried to reload here');
                // Update the is_validated status in the ushers state
                const updatedUshers = ushers.map((usher) => {
                    if (usher.id === usherId) {
                        return {
                            ...usher,
                            is_validated: !usher.is_validated,
                        };
                    }
                    return usher;
                });
                setUshers(updatedUshers);
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
    }

    function deleteUsher(usherId) { }

    const DashCard = (props) => {
        return (
            <div
                className='w-100 gap-3 btn btn-light rounded-2 border-secondary d-flex flex-column pt-2 px-4 tas ais'
                onClick={props.method}
            >
                <h3 className='fs-3 w-100'>{props.title}</h3>
                <h1 className='display-5 text-secondary-green text-bold'>{countValues[props.index]}</h1>
            </div>
        );
    };
    const componentCount = 4;
    console.log(tabIndex);
    console.log(displayedUshers);
    console.log(ushers);

    return (
        <div className='w-75 d-flex flex-column py-4'>
            <h1 className='display-3'>VOLUNTEERS</h1>
            <div className='d-flex flex-row py-4 gap-4'>
                {volunteerCategories.map((category, index) => {
                    return (
                        <DashCard
                            key={index}
                            title={category}
                            method={() => {
                                setTabIndex(index);
                            }}
                            index={index}
                        />
                    );
                })}
            </div>
            <div className='p-4 w-100 d-flex flex-column rounded border'>
                <h3 className='fs-3'>Administrator table view</h3>
                <p className='text-secondary font-primary'>
                    Please operate carefully, data is pretty sensitive
                </p>

                <table className='table pt-4 font-primary'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col' className=''>
                                Name
                            </th>
                            <th scope='col' className='w-25'>
                                Email
                            </th>
                            <th scope='col' className=''>
                                Phone Number
                            </th>
                            <th scope='col'>Status</th>
                            <th scope='col' className='tac'>
                                Documents
                            </th>
                            <th scope='col'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUshers.map((usher, index) => {
                            return (
                                <tr key={index}>
                                    <th scope='row' className='fs-4'>
                                        {index + 1}
                                    </th>
                                    <td className='fs-3'>{usher.username}</td>
                                    <td className='fs-3'>{usher.email}</td>
                                    <td className='fs-3'>{usher.phone_number}</td>
                                    <td
                                        className={`fs-5 ${usher.is_validated ? 'text-success' : 'text-warning'
                                            }`}
                                    >
                                        {usher.is_validated ? 'Validated' : 'Not validated'}
                                    </td>
                                    <td>
                                        <div className='d-flex flex-row aic jcc gap-4'>
                                            <button className='btn btn-info font-primary gap-2 rounded-1 d-flex flex-row jcc aic'>
                                                National ID{' '}
                                                <i className='fa-solid fa-download'></i>
                                            </button>
                                            <button className='btn btn-info font-primary gap-2 rounded-1 d-flex flex-row jcc aic'>
                                                Conduct cert.{' '}
                                                <i className='fa-solid fa-download'></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex flex-row jcc aic gap-4'>
                                            <button
                                                className={`btn gap-3 fs-4 p-0 px-3 d-flex jcc aic flex-row ${usher.is_validated ? 'btn-warning' : 'btn-success'
                                                    }`}
                                                onClick={() => {
                                                    disapprove(usher.id, usher.is_validated);
                                                }}
                                            >
                                                {usher.is_validated ? 'Disapprove' : 'Approve'}
                                                <i className={`fa-solid  ${usher.is_validated ? 'fa-ban' : 'fa-check'} fs-5`}></i>
                                            </button>
                                            <button
                                                className='btn btn-danger gap-3 fs-4 p-0 px-3 d-flex jcc aic flex-row'
                                                onClick={deleteUsher(usher.id)}
                                            >
                                                Delete
                                                <i className='fa-solid fa-trash fs-5'></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VolunteerDashboard;
