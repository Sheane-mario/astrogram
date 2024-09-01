import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from 'scenes/loginPage'; // purpose of jsconfig.json is to allow us to use absolute path imports like this one here without having to use relative paths
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import HomePage from 'scenes/homePage';

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
            <Route path="/" element={<LoginPage />} />
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to='/' />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
