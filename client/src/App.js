import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from 'scenes/loginPage'; // purpose of jsconfig.json is to allow us to use absolute path imports like this one here without having to use relative paths

const App = () => {
  return (
    <div className="app">
      Hi astrogram members!
      <BrowserRouter>
        <Routes>
          {/* our Routes goes here */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
