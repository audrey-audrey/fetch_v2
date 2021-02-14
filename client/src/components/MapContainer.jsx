import { React, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

function MapContainer(props) {
  const [ state, setState ] = useState({
    users: []
  });
  // State
  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }

  // Location data from users 
  let pins = [];

  props.users.map(user => {
    pins.push({
      name: user.name,
      location: {
        lat: user.lat, 
        lng: user.lng
      }
    })
  })

  console.log(pins)

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 43.6532, lng: -79.3832
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}>
        {
            pins.map(item => {
              return (
              <Marker key={item.name} 
                position={item.location}
                onClick={() => onSelect(item)}
              />
              )
            })
         }
        {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;