import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  useParams,
  useLocation,
} from "react-router-dom";
import { Card, Divider, Icon, Image, Header } from "semantic-ui-react";
import { Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "../history";

import "./Profile.scss";
import Carousel from "nuka-carousel";
import rupert from "../images/rupert.png";

export default function Profile(props) {
  const profile_id = useLocation().pathname.split("/")[2];

  const { user_id } = useParams();
  const [state, setState] = useState({
    user: {},
    favourites: [],
  });

  const [isProfileOwner, setIsProfileOwner] = useState(false);

  const setUser = (user) => setState((prev) => ({ ...prev, user }));

  const [favourited, setFavourited] = useState(false);

  // fetch current user data
  const requestedUser = window.location.pathname.substring(6);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const params = { user_id };

    if (user_id === profile_id) {
      setIsProfileOwner(true);
    }
    Promise.all([
      axios.get(`/api/users/${requestedUser}`),
      axios.get(`/api/users/${user_id}/favorites/`, { params }),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        user: all[0].data[0],
        favourites: all[1].data,
      }));
    });
  }, []);

  const handleChat = function () {
    const params = {
      initiator_id: localStorage.getItem("user_id"),
      recipient_id: profile_id,
    };
    axios.post(`/api/conversations`, params).then((res) => {
      console.log(res);
      let conversation_id = null;
      if (res.data.id) {
        conversation_id = res.data.id;
      }
      history.push(`/messages/${conversation_id}`);
    });
  };

  const isFavourited = state.favourites.find(
    (fave) => fave.id === state.user.id
  );

  const handleFavourite = function (event) {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const params = { user_id, favoritee: state.user };

    if (isFavourited) {
      return axios
        .delete(`/api/users/${user_id}/favorites/${requestedUser}`, params)
        .then((res) => {
          axios
            .get(`/api/users/${user_id}/favorites/`)
            .then((res) =>
              setState((prev) => ({
                ...prev,
                favourites: res.data,
                favorited: false,
              }))
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
              setState((prev) => ({
                ...prev,
                favourites: res.data,
                favorited: true,
              }))
            );
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <div className="profile-container">
      <div className="carousel">
        <Carousel
          initialSlideHeight={0.4}
          initialSlideWidth={0.4}
          wrapAround
          renderTopCenterControls={({ currentSlide }) => (
            <div></div>
          )}
          renderCenterLeftControls={({ previousSlide }) => (
            <Button onClick={previousSlide} color="orange">
              <Icon name="arrow alternate circle left"/>Prev</Button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <Button onClick={nextSlide} color="orange">
              Next
              <Icon name="arrow alternate circle right" />
              </Button>
          )}
        >
          <img className="profile-image" src={state.user.primary_image} />
          <img src={state.user.image_2} />
          <img src={state.user.image_3} />
          <img src={state.user.image_4} />
          <img src={state.user.image_5} />
        </Carousel>
      </div>

      <div className="header-button">
        <Header textAlign="center" size="large">
          {state.user.name} & {state.user.dog_name}
          <Header.Subheader>Toronto, ON</Header.Subheader>
        </Header>

        {isProfileOwner ? (
          <Link to="/edit-user">
            <Button basic color="orange" icon>
              <Icon name="edit"/>
              &nbsp;Edit Profile</Button>
          </Link>
        ) : null}

        <div className="buttons-non-user">
          {!isProfileOwner && !favourited ? (
            <Button
              color="yellow"
              basic={!isFavourited}
              onClick={handleFavourite}
              icon
            >
              <Icon name="star" /> Favourite
            </Button>
          ) : null}

          {!isProfileOwner ? (
            <Link>
              <Button onClick={handleChat} icon>
                Start a Chat!&nbsp;<Icon name="chat"/>
                </Button>
            </Link>
          ) : null}
        </div>
      </div>

      <Card fluid>
        <Card.Content>
          <Card.Description as="h5">{state.user.bio}</Card.Description>
        </Card.Content>
        <Card.Content>
          {state.user.playful ? (
            <Label as="a" tag color="orange">
              Playful
            </Label>
          ) : null}
          {state.user.affectionate ? (
            <Label as="a" tag color="orange">
              Affectionate
            </Label>
          ) : null}
          {state.user.shy ? (
            <Label as="a" tag color="orange">
              Shy
            </Label>
          ) : null}
          {state.user.high_energy ? (
            <Label as="a" tag color="orange">
              High-energy
            </Label>
          ) : null}
          {state.user.well_trained ? (
            <Label as="a" tag color="orange">
              Well-trained
            </Label>
          ) : null}
          {state.user.large ? (
            <Label as="a" tag color="orange">
              Large
            </Label>
          ) : null}
        </Card.Content>
      </Card>
    </div>
  );
}
