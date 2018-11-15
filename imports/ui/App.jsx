import React from 'react';

import Autocomplete from './components/autocomplete/Autocomplete.jsx';
import Map from './components/Map.jsx';

class App extends React.Component {
  state = {
    coords: {
      lat: 59.95,
      lng: 30.33
    },
  }

  render() {
    return (
      <div>
        <h1>Vessel Locate Challenge</h1>
        <Autocomplete />
        <br />
        <br />
        <Map coords={this.state.coords} />
      </div>
    );
  }
}

export default App;
