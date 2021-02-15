import { React, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

import Button from './Button'

import "./MapContainer.scss";

function MapContainer(props) {
  const [state, setState] = useState({
    users: []
  });
  // State
  const [selected, setSelected] = useState({});

  const onSelect = item => {
    setSelected(item);
  }

  // Location data from users 
  let pins = [];

  props.users.map(user => {
    pins.push({
      name: user.name,
      dog_name: user.dog_name,
      bio: user.bio,
      icon: {
        url: user.primary_image,
        origin: { x: 0, y: 0 },
        // define pop-up
        anchor: { x: 25, y: 0 },
        scaledSize: {
          width: 50,
          height: 50
        }
      },
      location: {
        lat: user.lat,
        lng: user.lng
      }
    })
  })

  const shape = {
    coords: [25, 25, 25],
    type: 'circle'
  }

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
                icon={item.icon}
                shape={shape}
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
              <div className="map-info-window">
                {/* <div class="map-info-close">
                  x
                </div> */}
                <img src={selected.icon.url} />
                <br />
                <p>{selected.name} & {selected.dog_name}</p>
                <br />
                <p>{selected.bio}</p>
                <br />
                <Button confirm>Profile</Button>
              </div>
            </InfoWindow>
          )
        }
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;