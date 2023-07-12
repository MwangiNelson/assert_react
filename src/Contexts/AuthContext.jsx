// MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [protests, setProtests] = useState(null)
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        setIsAuthenticated(userData !== null);
    }, [userData]);

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
            setIsAuthenticated(true);
        } else {
            sessionStorage.removeItem('userData');
            setIsAuthenticated(false);
        }
    }, [userData]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (userData) {
                sessionStorage.setItem('userData', userData);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const registerUser = async (username, email, password) => {
        const url = `http://127.0.0.1:8000/api/user/register`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role: 'protestor',
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                alert(`Registration successful ${data.data.user.username}`);
                window.location.href = '/';

                return true
            } else {
                console.log('Registration failed.');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }
    };
    const registerUserAdmin = async (userData) => {
        const url = `http://127.0.0.1:8000/api/user/register`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data.user.username);

                return true
            } else {
                console.log('Registration failed.');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }
    };

    const loginUser = async (userData) => {
        const url = `http://127.0.0.1:8000/api/user/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                console.log('Login successful:', data);
                alert('User login successfully')
                window.location.href = '/';
                return true
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.log('Error:', error);
            alert(`Login failed with this error:${error}`)
        }
    };

    const fetchMyProtests = async (userToken) => {
        const url = `http://127.0.0.1:8000/api/protests/${userToken}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProtests(data.data);
                console.log('Protest fetch successful:', data);

                return true
            } else {
                alert('Data could not be fetched.');
            }
        } catch (error) {
            alert('Error:', error);
        }
    };

    const postProtests = async (protestData) => {
        const url = `http://127.0.0.1:8000/api/protests`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(protestData),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                console.log('Post successful:', data);

                return true
            } else {
                console.log('Registration failed.');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }
    };

    const updateUser = async (userData) => {
        const url = `http://127.0.0.1:8000/api/updateUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('User updated successfully');
            } else {
                alert('User could not be updated.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }

    const registerVolunteer = async (volunteerData) => {
        const url = `http://127.0.0.1:8000/api/volunteer/register`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(volunteerData),
            });

            if (response.ok) {
                const data = await response.json();

                console.log('Registration successful:', data.message);

                return true
            } else {
                console.log('Registration failed.');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }
    }


    const logout = () => {
        setUserData(null)
        setIsAuthenticated(false)
        sessionStorage.removeItem('userData');
        window.location.href = '/';
    }

    const contextValue = {
        userData,
        isAuthenticated,
        registerUser,
        registerUserAdmin,
        loginUser,
        fetchMyProtests,
        visible,
        setVisible,
        postProtests,
        registerVolunteer,
        updateUser,
        logout

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
