import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavigationRoutes } from '../components/naviagtion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function App() {


  return (
    <>
      <Navbar />
      <NavigationRoutes />
      <Footer />
    </>
  )
}

export default App
