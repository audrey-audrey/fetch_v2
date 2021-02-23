import { React, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DistanceMatrixService
} from "@react-google-maps/api";
import axios from "axios";

import { Link } from "react-router-dom";

import {
  Button,
  Icon,
  Card,
  Image,
  Container,
  Header
} from 'semantic-ui-react'

import Carousel from 'nuka-carousel';

import "./MapContainer.scss";
import appLogo from "../images/icons/logo.png"
import no_photo from "../images/placeholder-headshot.png"

function MapContainer(props) {
  // State
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  const [distance, setDistance] = useState(0)

  const changeDistance = (item) => {
    setDistance(item)
  }

  // state for showing markers
  const [state, setState] = useState({
    showToggle: false,
    favourites: [],

    // categories
    playful: false,
    affectionate: false,
    high_energy: false,
    shy: false,
    well_trained: false,
    large: false,
  });

  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    const params = { user_id };

    axios.get(`/api/users/${user_id}/favorites/`, { params }).then((res) => {
      setState({ favourites: res.data });
    });
  }, []);

  // map position
  const [position, setPosition] = useState({
    lat: null, 
    lng: null
  });

  const mapRef = useRef(null);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  useEffect(() => {
    setPosition(
      {
        lat: parseFloat(props.user.lat),
        lng: parseFloat(props.user.lng),
      })
  }, [props]);

  // button toggles
  const togglePlayful = () =>
    setState((prev) => ({ ...prev, playful: !prev.playful, showToggle: true }));
  const toggleAffectionate = () =>
    setState((prev) => ({
      ...prev,
      affectionate: !prev.affectionate,
      showToggle: true,
    }));
  const toggleHighEnergy = () =>
    setState((prev) => ({
      ...prev,
      high_energy: !prev.high_energy,
      showToggle: true,
    }));
  const toggleShy = () =>
    setState((prev) => ({ ...prev, shy: !prev.shy, showToggle: true }));
  const toggleWellTrained = () =>
    setState((prev) => ({
      ...prev,
      well_trained: !prev.well_trained,
      showToggle: true,
    }));
  const toggleLarge = () =>
    setState((prev) => ({ ...prev, large: !prev.large, showToggle: true }));

  // showAll
  const toggleShow = () =>
    setState((prev) => ({
      ...prev,
      playful: false,
      affectionate: false,
      high_energy: false,
      shy: false,
      well_trained: false,
      large: false,
      showToggle: false,
    }));

  // Location data from users
  let pins = [];

  props.users.map((user) => {
    pins.push({
      id: user.id,
      name: user.name,
      dog_name: user.dog_name,
      bio: user.bio,
      image: user.primary_image || no_photo,
      icon: {
        url: parseFloat(user.id) === parseFloat(user_id) ? "http://audrey.lol/img/pinyellow.png" : "http://audrey.lol/img/pinorange.png",
        origin: { x: 0, y: 0 },
        // define pop-up
        anchor: { x: 13.5, y: 0 },
        scaledSize: {
          width: 27,
          height: 36,
        },
      },
      location: {
        lat: parseFloat(user.lat),
        lng: parseFloat(user.lng)
      },
      playful: user.playful,
      affectionate: user.affectionate,
      high_energy: user.high_energy,
      shy: user.shy,
      well_trained: user.well_trained,
      large: user.large,
      show: true,
    });
  });

  let filteredPins = pins;
  if (!state.showToggle) filteredPins = pins;
  filteredPins = !state.playful
    ? filteredPins
    : filteredPins.filter((pin) => {
      if (pin.playful === true || (parseFloat(pin.id) === parseFloat(user_id))) {
        return true;
      }
    });

  filteredPins = !state.affectionate
    ? filteredPins
    : filteredPins.filter((pin) => {
      if (pin.affectionate === true || (parseFloat(pin.id) === parseFloat(user_id))) {
        return true;
      }
    });

  filteredPins = !state.high_energy
    ? filteredPins
    : filteredPins.filter((pin) => {
      if (pin.high_energy === true || (parseFloat(pin.id) === parseFloat(user_id))) {
        return true;
      }
    });

  filteredPins = !state.shy
    ? filteredPins
    : filteredPins.filter((pin) => {
      if (pin.shy === true || (parseFloat(pin.id) === parseFloat(user_id))) {
        return true;
      }
    });

  filteredPins = !state.well_trained
    ? filteredPins
    : filteredPins.filter((pin) => {
      if (pin.well_trained === true || (parseFloat(pin.id) === parseFloat(user_id))) {
        return true;
      }
    });

  filteredPins = !state.large
    ? filteredPins
    : filteredPins.filter((pin) => {
      if (pin.large === true || (parseFloat(pin.id) === parseFloat(user_id))) {
        return true;
      }
    });

  const mapStyles = {
    height: "60vh",
    width: "100%",
  };

  const styles = require("../styles/map/GoogleMapStyles.json");

  const isFavourited = state.favourites.find((fave) => fave.id === selected.id);

  const handleSubmit = function (event) {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const params = { user_id, favoritee: selected };

    if (isFavourited) {
      return axios
        .delete(`/api/users/${user_id}/favorites/${isFavourited.id}`, params)
        .then((res) => {
          axios
            .get(`/api/users/${user_id}/favorites/`)
            .then((res) =>
              setState((prev) => ({ ...prev, favourites: res.data }))
            );
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return axios
        .post(`/api/users/${user_id}/favorites/`, params)
        .then((res) => {
          axios
            .get(`/api/users/${user_id}/favorites/`)
            .then((res) =>
              setState((prev) => ({ ...prev, favourites: res.data }))
            );
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <>
      <div className='map-container'>
        <div className='buttonContainer'>
          <Button toggle active={!state.showToggle} onClick={toggleShow}>Show All!</Button>
          <Button toggle active={state.playful} onClick={togglePlayful}>Playful</Button>
          <Button toggle active={state.affectionate} onClick={toggleAffectionate}>Affectionate</Button>
          <Button toggle active={state.high_energy} onClick={toggleHighEnergy}>High-energy</Button>
          <Button toggle active={state.shy} onClick={toggleShy}>Shy</Button>
          <Button toggle active={state.well_trained} onClick={toggleWellTrained}>Well-trained</Button>
          <Button toggle active={state.large} onClick={toggleLarge}>Large</Button>
        </div>
        {/* <p>{message}</p> */}
        <div className='map'>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={position}
            options={{ styles: styles }}
          >
            {filteredPins.length &&
              filteredPins.map((item) => {
                return (
                  <Marker
                    key={item.name}
                    position={item.location}
                    icon={item.icon}
                    onClick={
                      () => onSelect(item)
                      }
                  />
                );
              })}
            {selected.location && (
              <InfoWindow
                position={selected.location}
                options={{disableAutoPan: false}}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                <div className="map-info-window">
                  <DistanceMatrixService
                    options={{
                      destinations: [{ lat: parseFloat(selected.location.lat), lng: parseFloat(selected.location.lng) }],
                      origins: [{ lng: parseFloat(props.user.lng), lat: parseFloat(props.user.lat) }],
                      travelMode: "WALKING",
                    }}
                    callback={(response) => {
                      const distance = response.rows[0].elements[0].distance.text;
                      changeDistance(distance)
                    }}
                  />
                  <img src={selected.image} />
                  <Button
                    className='fave-button'
                    circular
                    icon='favorite'
                    size='big'
                    color={isFavourited ? 'yellow' : 'grey'}
                    onClick={handleSubmit}
                  />
                  <p className='info-name'>
                    {selected.name} & {selected.dog_name}
                  </p>
                  <p className='info-distance'>{distance} away from you!</p>
                  <Button
                    animated color="orange"
                    fluid
                    as={Link} to={`/user/${selected.id}`}
                  >
                    <Button.Content visible>Profile</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        </div>

        {filteredPins.length &&
          <div className='map-section-bottom'>
            <Header as='h1'>Nearby</Header>
            <div className='carousel'>
              <Carousel
              wrapAround
              renderCenterLeftControls={({ previousSlide }) => (
                <Button onClick={previousSlide} color="orange">
                  <Icon name="arrow alternate circle left"/>Prev</Button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <Button onClick={nextSlide} color="orange">Next
                <Icon name="arrow alternate circle right"/></Button>
              )}
                slidesToShow={3}
                initialSlideHeight={120}
                renderBottomCenterControls={false}
              >
                {filteredPins.map((item) => {
                  if (Number(item.id) !== Number(user_id)) {
                    return (
                      <Card
                        key={item.id}
                      >
                        <Image
                          className='card-image'
                          src={item.image}
                        />
                        <Card.Content>
                          <div className='card-section-bottom'>
                            <Header>{item.name} & {item.dog_name}</Header>
                            <Link id="profile" className="menu-item" to={`/user/${item.id}`}>
                              <Icon name='arrow alternate circle right' color='orange' size='large' />
                            </Link>
                          </div>
                        </Card.Content>
                      </Card>
                    );
                  }
                })}
              </Carousel>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default MapContainer;
