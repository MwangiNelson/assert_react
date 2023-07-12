import React, { useContext, useEffect, useRef, useState } from 'react';
import { userCategories } from './data';
import { Link } from 'react-router-dom';
import { AppContext } from '../Contexts/AuthContext';


function UserDashboard() {
    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [verifiedCount, setVerifiedCount] = useState(0);
    const [selectedUser, setSelectedUser] = useState({})
    // const [unverifiedCount, setUnverifiedCount] = useState(0);


    const fetchUsers = async (params) => {
        const url = `http://127.0.0.1:8000/api/users`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);
                console.log(data.data);
            } else {
                console.log('Data could not be fetched.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    };

    // an array of methods for the btns
    const filterBanned = () => {
        const filteredArray = users.filter((obj) => obj.is_banned)
        setDisplayedUsers(filteredArray)
        setVerifiedCount(filteredArray.length)
    }
    const filterNotBanned = () => {
        const filteredArray = users.filter((obj) => !obj.is_banned)
        setDisplayedUsers(filteredArray)
        setVerifiedCount(users.length - filteredArray.length)
    }

    const countValues = [(users.length - verifiedCount), verifiedCount]
    const methods = [filterNotBanned, filterBanned]
    useEffect(() => {
        methods[tabIndex]();
    }, [tabIndex]);

    useEffect(() => {
        fetchUsers();
        methods[tabIndex]();
    }, []);

    useEffect(() => {
        methods[tabIndex]();
    }, [users]);
    async function toggleBan(userId, is_banned) {
        const url = `http://127.0.0.1:8000/api/updateUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    is_banned: !is_banned,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('tried to reload here');
                // Update the is_banned status in the ushers state
                const updatedUsers = users.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            is_banned: !user.is_banned,
                        };
                    }
                    return user;
                });
                setUsers(updatedUsers);
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



    const DashCard = (props) => {
        return (
            <div
                className={`w-100 gap-3 btn btn-light rounded-2 border-secondary d-flex flex-column pt-2 px-4 tas ais ${tabIndex == props.index ? 'bg-secondary' : ''} `}
                onClick={props.method}
            >
                <h3 className='fs-3 w-100'>{props.title}</h3>
                <h1 className={`display-4 ${props.index == tabIndex ? 'text-secondary-green ' : 'text-dark'}  text-bold`}>{countValues[props.index]}</h1>
            </div>
        );
    };

    const UserEditor = () => {
        const newUsernameRef = useRef(null)
        const newEmailRef = useRef(null)
        const newRoleRef = useRef(null)

        const { updateUser } = useContext(AppContext)

        function updateUserData(e) {
            e.preventDefault()

            const userData = {
                id: selectedUser.id,
                username: newUsernameRef.current.value,
                email: newEmailRef.current.value,
                role: newRoleRef.current.value
            }

            updateUser(userData)
            // console.log(userData)
            setSelectedUser({})
            fetchUsers()
        }


        return (
            <div className="w-100 top-0 start-0 vh-100  position-fixed bg-blur animate-in d-flex jcc aic">
                <div className="w-50 bg-light rounded-1 border shadow-lg p-4">
                    <h3 className="fs-4 pb-2 border-0 border-bottom border-dark">EDIT USER</h3>
                    <form
                        onSubmit={updateUserData}
                        className='w-100 d-flex flex-column gap-2 py-3 align-items-end'>
                        <div className="d-flex flex-row gap-3 w-100">
                            <label htmlFor=""
                                className='font-tertiary fs-2 w-25 tac'
                            >Name :</label>
                            <input
                                type="text"
                                placeholder={selectedUser.username}
                                ref={newUsernameRef}
                                className='form-control w-75 font-tertiary py-0 fs-4'
                            />
                        </div>
                        <div className="d-flex flex-row gap-3 w-100">
                            <label htmlFor="" className='font-tertiary fs-2 w-25 tac'>Email :</label>
                            <input
                                type="email"
                                placeholder={selectedUser.email}
                                className='form-control w-75 font-tertiary py-0 fs-4'
                                ref={newEmailRef}
                            />
                        </div>
                        <div className="d-flex flex-row gap-3 w-100">
                            <label htmlFor=""
                                className='font-tertiary fs-2 w-25 tac'
                            >Role :</label>
                            <select name=""
                                ref={newRoleRef}
                                className='form-control font-tertiary w-75'
                                id="">
                                {
                                    roles.map((role) => {
                                        return (
                                            <option value={role}
                                                className='font-tertiary' selected={role == selectedUser.role} >{role}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-75 d-flex flex-row ps-2 jsb gap-4">
                            <button
                                className="btn btn-primary font-tertiary"
                                type='submit'
                            >SAVE CHANGES
                                <i className="fa-solid ps-3 fa-floppy-disk"></i>
                            </button>
                            <button
                                onClick={() => { setSelectedUser({}) }}
                                className="btn btn-outline-danger w-25 font-tertiary" type='button'>CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    selectedUser
    console.log(tabIndex)

    const roles = [
        'administrator',
        'protestor'
    ]

    return (
        <div className='w-75 d-flex flex-column py-4'>
            {
                Object.keys(selectedUser).length !== 0 ? <UserEditor /> : null
            }
            <div className="w-100 d-flex flex-row aic jsb">
                <h2 className="display-3 pt-3">USERS/PROTESTORS</h2>
                <Link to={'/admin-registration'}>            <button className="btn btn-outline-dark rounded-1">ADD NEW USER</button>
                </Link>
            </div>
            <div className='d-flex flex-row py-4 gap-4'>
                {userCategories.map((category, index) => {
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
                            <th scope='col' className='w-25 tac'>
                                Email
                            </th>
                            <th scope='col' className='tac'>
                                Protests Posted
                            </th>
                            <th className='tac'>Role</th>
                            <th scope='col' className='tac'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope='row' className='fs-4'>
                                        {index + 1}
                                    </th>
                                    <td className='fs-3'>{user.username}</td>
                                    <td className='fs-3'>{user.email}</td>
                                    <td className='fs-3 tac'>{10}</td>
                                    <td className='fs-3 tac'>{user.role}</td>


                                    <td>
                                        <div className='d-flex flex-row-reverse jcc aic gap-4'>
                                            <button
                                                className={`btn gap-3 fs-4 p-0 px-3 d-flex jcc aic flex-row ${user.is_banned ? 'btn-success' : 'btn-danger'
                                                    }`}
                                                onClick={() => {
                                                    toggleBan(user.id, user.is_banned);
                                                }}
                                            >
                                                {user.is_banned ? 'Unban' : 'Ban'}
                                                <i className={`fa-solid  ${!user.is_banned ? 'fa-ban' : 'fa-check'} fs-5`}></i>
                                            </button>
                                            <button
                                                className='btn btn-warning gap-3 fs-4 p-0 px-3 d-flex jcc aic flex-row'
                                                onClick={() => { setSelectedUser(user) }}
                                            >
                                                Edit
                                                <i className='fa-solid fa-pen fs-5'></i>
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

export default UserDashboard;
