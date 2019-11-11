import React from 'react';

import './App.css';

import logo from './Assets/logo.svg'

import Router from './router';

function App() {

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <Router />
      </div>
    </div>
  );
}

export default App;
