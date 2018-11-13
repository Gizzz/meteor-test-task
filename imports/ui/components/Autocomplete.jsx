import React from 'react';
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

  render() {
    const searchResults = this.state.searchResults.map((item, index) => {
      return (
        <li key={index}>
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
        <ul>
          {searchResults}
        </ul>
      </div>
    );
  }
}

export default Autocomplete;
