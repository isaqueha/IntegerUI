import React from 'react';

import './App.css';

import Router from './router';

function App() {

  return (
    <div className="container">
      <div className="applicationTitle">
        <h1>Integer Application</h1>
      </div>

      <div className="content">
        <Router />
      </div>
    </div>
  );
}

export default App;
