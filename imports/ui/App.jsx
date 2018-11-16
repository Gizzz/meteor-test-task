import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import HomeScreen from './HomeScreen/HomeScreen.jsx';
import AboutScreen from './AboutScreen/AboutScreen.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <>
            <header>
              <Link to="/">Home</Link>
              {' | '}
              <Link to="/about">About</Link>
              <h1>Meteor Test Task</h1>
            </header>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/about" component={AboutScreen} />
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
