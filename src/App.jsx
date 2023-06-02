import React, { useState } from 'react';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Encrypt from './components/encrypt/Encrypt';
import Login from './components/forms/Login';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className='App'>
      <Router>
        {loggedIn && (
          <>
            <Header />
            <Nav />
            <Encrypt />
          </>
        )}
        <Routes>
          <Route path='/' element={<Login handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;