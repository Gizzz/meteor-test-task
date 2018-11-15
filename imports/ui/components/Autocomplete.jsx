import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import Vessels from '../../api/vessels/Vessels.js';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.Name, query);
  const parts = parse(suggestion.Name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 10 && suggestion.Name.toLowerCase().startsWith(inputValue);

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.Name;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class Autocomplete extends React.Component {
  state = {
    searchTerm: '',
    suggestions: [],
    searchResult: null,
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState((prevState) => ({
      suggestions: getSuggestions(value, prevState.suggestions),
    }));
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    const term = newValue.trim();
    this.setState({
      searchTerm: term,
    });

    if (term === '') {
      this.setState({ suggestions: [] });
      return;
    }

    const suggestions = Vessels.find({ Name: { $regex: `^${term}`, $options: 'i' } }).fetch();
    this.setState({ suggestions });
  };

  handleKeydown = (e) => {
    if (e.key !== 'Enter') return;
    if (this.state.searchTerm === '') return;

    const item = Vessels.find({ Name: this.state.searchTerm }).fetch()[0];

    if (item) {
      Meteor.call('vessels.getLocationData', item.MMSI, (err, res) => {
        this.setState({ searchResult: res.data })

      });
    }
  }

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search a country (start with a)',
            value: this.state.searchTerm,
            onChange: this.handleChange,
            onKeyDown: this.handleKeydown,
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />

      </div>
    );
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

const AutocompleteWithStyles = withStyles(styles)(Autocomplete);
export default AutocompleteWithStyles;
