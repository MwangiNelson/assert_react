// MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [protests, setProtests] = useState(null)

    useEffect(() => {
        setIsAuthenticated(userData !== null);
    }, [userData]);


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

    const loginUser = async (email, password) => {
        const url = `http://127.0.0.1:8000/api/user/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                console.log('Login successful:', data);

                return true
            } else {
                console.log('Login failed.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const fetchProtests = async () => {
        const url = 'http://127.0.0.1:8000/api/protests';
        try {
            const response = await axios.get(url);
            const data = response.data.data;
            setProtests(data);
            console.log('Protest fetch successful:', data);
        } catch (error) {
            console.log('Error:', error);
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
                console.log('Data could not be fetched.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };



    const contextValue = {
        userData,
        isAuthenticated,
        registerUser,
        loginUser,
        fetchMyProtests,
        fetchProtests,
        protests
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
