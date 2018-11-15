import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAQ4i_puN-HgB8wydbmoC6b9jPp0bo7mUw' }}
          defaultCenter={this.props.coords}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  coords: PropTypes.object.isRequired,
}

export default Map;
