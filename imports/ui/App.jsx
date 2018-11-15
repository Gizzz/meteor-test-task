import React from 'react';

import Autocomplete from './components/autocomplete/Autocomplete.jsx';
import Map from './components/Map.jsx';

class App extends React.Component {
  state = {
    coords: null,
  }

  handleCoordsChange = (coords) => {
    this.setState({ coords });
  }

  render() {
    return (
      <div>
        <h1>Vessel Locate Challenge</h1>
        <Autocomplete onSearchSuccess={this.handleCoordsChange} />
        <br />
        <br />
        <Map coords={this.state.coords} />
      </div>
    );
  }
}

export default App;
