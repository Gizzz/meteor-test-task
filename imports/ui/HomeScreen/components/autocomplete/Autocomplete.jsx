import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import Vessels from '../../../../api/vessels/Vessels.js';

class Autocomplete extends React.Component {
  initialState = {
    searchTerm: '',
    suggestions: [],
  }

  state = this.initialState

  handleChange = (e) => {
    const term = e.target.value;

    if (term.trim() === '') {
      this.setState(this.initialState);
      return;
    }

    const suggestions = Vessels.find({ Name: { $regex: `^${term}`, $options: 'i' } }).fetch();
    this.setState({
      searchTerm: term,
      suggestions,
    });
  }

  create_searchResultClick_handler = (mmsi) => {
    return () => {
      Meteor.call('vessels.getLocationData', mmsi, (err, res) => {
        if (err) {
          console.error('Method call finished with error:', err);
          return;
        }

        if (!res || !res.data || !res.data.lat || !res.data.lng || !res.data.name) {
          console.error('Incorrect data shape.');
          return;
        }

        const newCoords = {
          lat: Number(res.data.lat),
          lng: Number(res.data.lng),
        };

        this.setState({
          searchTerm: res.data.name,
          suggestions: [],
        });

        this.props.onSearchSuccess(newCoords)
      });
    };
  }

  render() {
    const suggestions = this.state.suggestions.map((item, index) => {
      return (
        <MenuItem key={index} selected={false} component="div" onClick={this.create_searchResultClick_handler(item.MMSI)}>
          <div>
            <span>
              {item.Name}
            </span>
          </div>
        </MenuItem>
      );
    });

    return (
      <div>
        <TextField type="text" label="Enter a vessel name" fullWidth value={this.state.searchTerm} onChange={this.handleChange} />
        <Paper square>
          {suggestions}
        </Paper>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  onSearchSuccess: PropTypes.func.isRequired,
};

export default Autocomplete;
