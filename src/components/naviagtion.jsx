import { Routes, Route } from "react-router-dom";
import React, { useContext } from 'react'
import { AppContext } from "../Contexts/AuthContext";

import Home from "../screens/home";
import Protests from "../screens/protests";
import AuthWrapper from "../Authentication/auth";
import PostProtests from "../screens/post_protests";
import SignUpVolunteer from "../Volunteer/signup";
import AdminPanel from "../Administrator/admin";
// import ProtestView from "../screens/protest_view";


export const NavigationRoutes = () => {
    const { isAuthenticated } = useContext(AppContext)


    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />

            {/* {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/protests" element={<Protests />} />
            <Route path="/auth" element={<AuthWrapper />} />
            <Route
                path="/post-protests"
                element={isAuthenticated ? <PostProtests /> : <AuthWrapper />}
            />
            <Route path="/register-volunteer" element={<SignUpVolunteer />} />
        </Routes>
    );
}