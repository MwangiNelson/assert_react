import { Routes, Route } from "react-router-dom";
import React, { useContext } from 'react'
import { AppContext } from "../Contexts/AuthContext";

import Home from "../screens/home";
import Protests from "../screens/protests";
// import ProtestView from "../screens/protest_view";


export const NavigationRoutes = () => {
    const { isAuthenticated } = useContext(AppContext)


    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/protests" element={<Protests />} />
        </Routes>
    );
}