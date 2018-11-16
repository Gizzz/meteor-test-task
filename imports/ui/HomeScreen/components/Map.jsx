import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

class Map extends React.Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAQ4i_puN-HgB8wydbmoC6b9jPp0bo7mUw' }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          center={this.props.coords}
          defaultZoom={11}
        >
          {
            this.props.coords &&
            <AnyReactComponent
              lat={this.props.coords.lat}
              lng={this.props.coords.lng}
              text={'X'}
            />
          }
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  coords: PropTypes.object,
}

export default Map;
