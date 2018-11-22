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
    selectedSuggestionIndex: null,
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

  handleKeydown = (e) => {
    if (this.state.suggestions.length === 0) { return; }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();

      const firstSuggestionIndex = 0;
      const lastSuggestionIndex = this.state.suggestions.length - 1;
      const selectedSuggestionIndex =
        e.key === 'ArrowDown'
          ? this.state.selectedSuggestionIndex === null
            ? firstSuggestionIndex
            : this.state.selectedSuggestionIndex < lastSuggestionIndex
              ? this.state.selectedSuggestionIndex + 1
              : lastSuggestionIndex
          : this.state.selectedSuggestionIndex === null
            ? lastSuggestionIndex
            : this.state.selectedSuggestionIndex > firstSuggestionIndex
              ? this.state.selectedSuggestionIndex - 1
              : firstSuggestionIndex

      this.setState({ selectedSuggestionIndex });
      return;
    }

    if (e.key === 'Enter') {
      const selectedSuggestion = this.state.suggestions[this.state.selectedSuggestionIndex];
      this.setState({
        searchTerm: selectedSuggestion.Name,
        suggestions: [],
      });
      this.performLocationSearch(selectedSuggestion.MMSI);
      return;
    }

    if (e.key === 'Escape') {
      this.setState({
        suggestions: [],
        selectedSuggestionIndex: null,
      });
      return;
    }
  }

  create_searchResultClick_handler = (mmsi) => {
    return () => {
      this.performLocationSearch(mmsi);
    };
  }

  performLocationSearch = (mmsi) => {
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
  }

  render() {
    const suggestions = this.state.suggestions.map((item, index) => {
      return (
        <MenuItem
          key={index}
          selected={index === this.state.selectedSuggestionIndex}
          component="div"
          onClick={this.create_searchResultClick_handler(item.MMSI)}
        >
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
        <TextField
          type="text"
          label="Enter a vessel name"
          fullWidth
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
        />
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
