import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter here
import Product from './Product';
import Navbar from '../components/navbar/Navbar';
import Home from '../components/home/Home';
import Footer from '../components/footer/Footer';
import About from '../components/about/about';

const HomePage = () => {
    const data = useSelector((state) => state.auth?.user);

    useEffect(() => {
        console.log('User Data:', data);
    }, [data]);

   

    return (
        <>
      
            <Navbar/>
          
                   {/* Nested Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        {/* <Route path="contact" element={<ContactPage />} /> */}
      </Routes>
             <Footer/>


                    </>
    );
};

export default HomePage;
