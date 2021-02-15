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
  // State
  const [selected, setSelected] = useState({});

  const onSelect = item => {
    setSelected(item);
  }

  // state for showing markers 
  const [state, setState] = useState({
    showToggle: false,

    // categories 
    playful: false,
    affectionate: false,
    high_energy: false,
    shy: false,
    well_trained: false,
    large: false
  })

  const toggle = () => setState(prev => ({...prev, playful: !prev.playful }))
  console.log('playful', state.playful)

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
      },
      playful: user.playful,
      affectionate: user.affectionate,
      high_energy: user.high_energy,
      shy: user.shy,
      well_trained: user.well_trained,
      large: user.large,
      show: true
    })
  })

  const filteredPins = pins.filter(pin => {
    // console.log(pin.playful)
    if (pin.playful === false && pin.shy === false) {
      return true
    }
  })

  // state: playful => true, affectionate => true....
  // each playful category button would toggle the playful state 

  // const shape = {
  //   coords: [25, 25, 25],
  //   type: 'circle'
  // }

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 43.6532, lng: -79.3832
  };

  return (
    <>
    <div className='filter'>
      <Button confirm onClick={toggle}>Playful</Button>
      <Button confirm>Affectionate</Button>
      <Button confirm>High-energy</Button>
      <Button confirm>Shy</Button>
      <Button confirm>Well-trained</Button>
      <Button confirm>Large</Button>
    </div>
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}>
        {
          filteredPins.map(item => {
            return (
              // add item && => for conditional rendering
              <Marker key={item.name}
                position={item.location}
                icon={item.icon}
                // shape={shape}
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
    </>
  );
}

export default MapContainer;