import React from 'react';
import './App.css';

import {
  Switch,
  Route
} from "react-router-dom";

import NavBar from './NavBar';

import TranscriptionWindow from './transcribe/TranscriptionWindow';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      {/* Avoid overlapping with nav bar */}
      <div style={{'margin-top': '90px'}}> 
      <Switch>
        <Route path="/">
          <TranscriptionWindow></TranscriptionWindow>
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;
