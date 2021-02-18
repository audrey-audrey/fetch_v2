import { React, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

import { Button, Icon, Card, Image, Container } from "semantic-ui-react";

import "./MapContainer.scss";

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

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const params = { user_id };

    axios.get(`/api/users/${user_id}/favorites/`, { params }).then((res) => {
      console.log(res);
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
    console.log("user:", user);
    pins.push({
      id: user.id,
      name: user.name,
      dog_name: user.dog_name,
      bio: user.bio,
      image: user.primary_image,
      icon: {
        url: "http://audrey.lol/img/pinorange.png",
        origin: { x: 0, y: 0 },
        // define pop-up
        anchor: { x: 13.5, y: 0 },
        scaledSize: {
          width: 27,
          height: 36,
        },
      },
      location: {
        lat: user.lat,
        lng: user.lng,
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
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 43.6532,
    lng: -79.3832,
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

    console.log("isfavourited:", isFavourited);

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
      <div className="filter">
        <div className="buttonContainer">
          {/* <Button buttonClass={state.playful ? "button button--confirm" : "button button--danger"} onClick={togglePlayful}>Playful</Button>
          <Button buttonClass={state.affectionate ? "button button--confirm" : "button button--danger"} onClick={toggleAffectionate}>Affectionate</Button>
          <Button buttonClass={state.high_energy ? "button button--confirm" : "button button--danger"} onClick={toggleHighEnergy}>High-energy</Button>
          <Button buttonClass={state.shy ? "button button--confirm" : "button button--danger"} onClick={toggleShy}>Shy</Button>
          <Button buttonClass={state.well_trained ? "button button--confirm" : "button button--danger"} onClick={toggleWellTrained}>Well-trained</Button>
          <Button buttonClass={state.large ? "button button--confirm" : "button button--danger"} onClick={toggleLarge}>Large</Button>
          <Button buttonClass={!state.showToggle ? "button button--confirm" : "button button--danger"} onClick={toggleShow}>Show All!</Button> */}
        </div>
        {/* {JSON.stringify(state)} */}
        <p>{message}</p>
      </div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
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
                {/* <div class="map-info-close">
                  x
                </div> */}

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
                  <Button animated color="teal" fluid>
                    <Button.Content visible>Profile</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Container>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapContainer;
