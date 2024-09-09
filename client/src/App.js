// client/src/App.js

import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from 'scenes/loginPage'; // purpose of jsconfig.json is to allow us to use absolute path imports like this one here without having to use relative paths
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import HomePage from 'scenes/homePage';
import LandingPage from 'scenes/landingPage';
import ProfilePage from 'scenes/profilePage';
import EventsPage from 'scenes/eventsPage';
import EventDetailsPage from 'scenes/eventDetailsPage';
import EventForm from 'scenes/eventForm';

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/*' element={<LandingPage />} />
            <Route path='/user-auth' element={<LoginPage />} />
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to='/' />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/' />}/>
            <Route path="/events"element={isAuth ? <EventsPage /> : <Navigate to="/" />}/>
            <Route path="/events/:eventId" element={isAuth ? <EventDetailsPage /> : <Navigate to="/" />}/>
            <Route path="/events/create"element={isAuth ? <EventForm /> : <Navigate to="/" />}/>
            <Route path="/events/:eventId/edit"element={isAuth ? <EventForm /> : <Navigate to="/" />}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
