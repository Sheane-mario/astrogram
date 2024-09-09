// client/src/scenes/landingPage/index.jsx

import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

const LandingPage = () => {
    return (
        <Box>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/astro-about' element={<About />} />
            </Routes>
        </Box>
    )
}

export default LandingPage;
