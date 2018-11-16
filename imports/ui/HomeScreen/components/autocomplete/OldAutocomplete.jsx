import { Meteor } from 'meteor/meteor';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Vessels from '../../../api/vessels/Vessels.js';

class Autocomplete extends React.Component {
  state = {
    searchTerm: '',
    suggestions: [],
    searchResult: null,
  }

  handleChange = (e) => {
    const term = e.target.value;

    if (term.trim() === '') {
      this.setState({ suggestions: [] });
      return;
    }

    const suggestions = Vessels.find({ Name: { $regex: `${term}`, $options: 'i' } }).fetch();
    this.setState({ suggestions });
  }

  create_searchResultClick_handler = (mmsi) => {
    return () => {
      Meteor.call('vessels.getLocationData', mmsi, (err, res) => {
        // res: contains vessel position data
        this.setState({ searchResult: res })
      });
    };
  }

  render() {
    const suggestions = this.state.suggestions.map((item, index) => {
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
        <h3>Suggestions:</h3>
        <ul className="suggestions">
          {suggestions}
        </ul>
        <h3>Search result:</h3>
        <pre>
          {JSON.stringify(this.state.searchResult, null, 2)}
        </pre>
      </div>
    );
  }
}

export default Autocomplete;
