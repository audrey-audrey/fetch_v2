import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapContainer() {

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 43.6532, lng: -79.3832
  };

  console.log(process.env.REACT_APP_API_KEY)

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter} />
    </LoadScript>
  );
}

export default MapContainer;