import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';

import customTheme from './customTheme.js';
import HomeScreen from './HomeScreen/HomeScreen.jsx';
import AboutScreen from './AboutScreen/AboutScreen.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MuiThemeProvider theme={customTheme}>
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
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
