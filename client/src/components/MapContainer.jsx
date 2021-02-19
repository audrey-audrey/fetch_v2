import { React, useState, useEffect } from "react";
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
import rupert from "../images/rupert.png"
import no_photo from "../images/placeholder-headshot.png"

function MapContainer(props) {
  // State
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

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
        url: Number(user.id)===Number(user_id) ? "http://audrey.lol/img/pinyellow.png" : "http://audrey.lol/img/pinorange.png" ,
        origin: { x: 0, y: 0 },
        // define pop-up
        anchor: { x: 13.5, y: 0 },
        scaledSize: {
          width: 27,
          height: 36,
        },
      },
      location: {
        lat: Number(user.lat),
        lng: Number(user.lng)
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
        if (pin.playful === true) {
          return true;
        }
      });

  filteredPins = !state.affectionate
    ? filteredPins
    : filteredPins.filter((pin) => {
        if (pin.affectionate === true) {
          return true;
        }
      });

  filteredPins = !state.high_energy
    ? filteredPins
    : filteredPins.filter((pin) => {
        if (pin.high_energy === true) {
          return true;
        }
      });

  filteredPins = !state.shy
    ? filteredPins
    : filteredPins.filter((pin) => {
        if (pin.shy === true) {
          return true;
        }
      });

  filteredPins = !state.well_trained
    ? filteredPins
    : filteredPins.filter((pin) => {
        if (pin.well_trained === true) {
          return true;
        }
      });

  filteredPins = !state.large
    ? filteredPins
    : filteredPins.filter((pin) => {
        if (pin.large === true) {
          return true;
        }
      });

  const mapStyles = {
    height: "60vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: Number(props.user.lat),
    lng: Number(props.user.lng),
  };

  const message =
    filteredPins.length > 0
      ? `There are ${filteredPins.length} dogs matching your criteria`
      : "There are no dogs matching all your criteria!";

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
      <div className='filter'>
        <div className='buttonContainer'>
          <Button toggle active={state.playful} onClick={togglePlayful}>Playful</Button>
          <Button toggle active={state.affectionate} onClick={toggleAffectionate}>Affectionate</Button>
          <Button toggle active={state.high_energy} onClick={toggleHighEnergy}>High-energy</Button>
          <Button toggle active={state.shy} onClick={toggleShy}>Shy</Button>
          <Button toggle active={state.well_trained} onClick={toggleWellTrained}>Well-trained</Button>
          <Button toggle active={state.large} onClick={toggleLarge}>Large</Button>
          <Button toggle active={!state.showToggle} onClick={toggleShow}>Show All!</Button>
        </div>
        {/* {JSON.stringify(state)} */}
        <p>{message}</p>
      </div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
          options={{ styles: styles }}
        >
          {filteredPins.length &&
            filteredPins.map((item) => {
              return (
                <Marker
                  key={item.name}
                  position={item.location}
                  icon={item.icon}
                  onClick={() => onSelect(item)}
                />
              );
            })}
          {selected.location && (
            <InfoWindow 
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div className="map-info-window">
                <DistanceMatrixService
                  options={{
                    destinations: [{ lat: Number(selected.location.lat), lng: Number(selected.location.lng) }],
                    origins: [{ lng: Number(props.user.lng), lat: Number(props.user.lat) }],
                    travelMode: "WALKING",
                  }}
                  callback={(response) => { console.log(response.rows[0].elements[0].distance, response.rows[0].elements[0].duration) }}
                />
                <Button
                  animated="vertical"
                  size="small"
                  floated="left"
                  color="yellow"
                  basic={!isFavourited}
                  onClick={handleSubmit}
                >
                  <Button.Content hidden>Fave</Button.Content>
                  <Button.Content visible>
                    <Icon name="favorite" size="big" />
                  </Button.Content>
                </Button>

                <Container textAlign="center">
                  <img src={selected.image} />
                  <br />
                  <p>
                    {selected.name} & {selected.dog_name}
                  </p>
                  <br />
                  <p>{selected.bio}</p>
                  <br />
                    <Link id="profile" className="menu-item" to={`/user/${selected.id}`}>
                    <Button fluid animated color='teal'>
                      <Button.Content visible>Profile</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right' />
                      </Button.Content>
                    </Button>
                    </Link>
                  </Container>
                </div>

              </InfoWindow>
            )
          }
        </GoogleMap>
      </LoadScript>

      {filteredPins.length && 
      <>
      <Header as='h1'>Nearby</Header>
      <div className='carousel'>
        <Carousel 
          slidesToShow={3} 
          initialSlideHeight={0.4}
        >
          {filteredPins.map((item) => {
            return (
              <Card 
                key={item.id}
                >
                <Image 
                  className='card-image'
                  src={item.image} 
                  />
                <Card.Content>
                  <Card.Header>{item.name} & {item.dog_name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Distance</span>
                  </Card.Meta>
                  <Link id="profile" className="menu-item" to={`/user/${item.id}`}>
                    <Button animated color='teal'>
                      <Button.Content visible>Profile</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right' />
                      </Button.Content>
                    </Button>
                    </Link>
                </Card.Content>
              </Card>
            );
          })}
        </Carousel>
      </div>
      </>
      }
    </>
  );
}

export default MapContainer;
