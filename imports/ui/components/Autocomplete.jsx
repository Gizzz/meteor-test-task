import React from 'react';
import TextField from '@material-ui/core/TextField';

class Autocomplete extends React.Component {
  render() {
    return (
      <div>
        <TextField type="text" label="Enter a vessel name" />
      </div>
    );
  }
}

export default Autocomplete;
