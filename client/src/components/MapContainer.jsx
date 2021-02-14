import { React, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

function MapContainer() {
  // State
  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }

  // Dummy location data
  const locations = [
    {
      name: "City Hall",
      location: {
        lat: 43.6539,
        lng: -79.3842
      },
    },
    {
      name: "Sick Kids Hospital",
      location: {
        lat: 43.6573,
        lng: -79.3873
      },
    },
    {
      name: "Toronto General Hospital",
      location: {
        lat: 43.6590,
        lng: -79.3884
      },
    },
    {
      name: "Bloor-Yonge Station",
      location: {
        lat: 43.6706,
        lng: -79.3865
      },
    },
    {
      name: "St. George Station",
      location: {
        lat: 43.6683,
        lng: 79.3999
      },
    }
  ];

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
        center={defaultCenter}>
        {
            locations.map(item => {
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