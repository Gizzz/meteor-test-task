import { Meteor } from 'meteor/meteor';
import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Vessels from '../../api/vessels/Vessels.js';

class Autocomplete extends React.Component {
  state = {
    searchTerm: '',
    searchResults: [],
  }

  handleChange = (e) => {
    const term = e.target.value;

    if (term.trim() === '') {
      this.setState({ searchResults: [] });
      return;
    }

    const searchResults = Vessels.find({ Name: { $regex: `${term}`, $options: 'i' } }).fetch();
    this.setState({ searchResults });
  }

  create_searchResultClick_handler = (mmsi) => {
    return () => {
      // # target server do not support CORS, so need to use methods, maybe
      //
      // const url = `https://api.aprs.fi/api/get?name=${mmsi}&what=loc&apikey=109676.BrVSr9i6TpbMbBe&format=json`;
      // axios.get(url).then(res => console.log(res.data));

      const res = Meteor.call('vessels.getLocationData', mmsi);
      console.log(res);

      return null;
    };
  }

  render() {
    const searchResults = this.state.searchResults.map((item, index) => {
      return (
        <li key={index} onClick={this.create_searchResultClick_handler(item.MMSI)}>
          {item.Name}
        </li>
      );
    });

    return (
      <div>
        <TextField type="text" label="Enter a vessel name" onChange={this.handleChange} />
        {' '}
        <Button variant="outlined">Search</Button>
        <h3>Search results:</h3>
        <ul className="suggestions">
          {searchResults}
        </ul>
      </div>
    );
  }
}

export default Autocomplete;
