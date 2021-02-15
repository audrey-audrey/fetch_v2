import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { Card, Divider, Icon, Image } from "semantic-ui-react";
import "./Profile.css";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import CustomDotGroup from "../components/CustomDotGroup";

export default function Profile(props) {
  console.log("here");

  const [state, setState] = useState({
    primary_image: null,
    name: null,
    email: null,
    password: null,
    location: null,
    dog_name: null,
    images: [],
    bio: null,
    playfull: null,
    affectionate: null,
    high_energy: null,
    shy: null,
    well_trained: null,
    large: null,
  });

  useEffect(() => {
    // axios.get(`/api/users/${localStorage.get('user_id')}`).then((res) => {
    //     data = res.data.body[0]
    //     setState(data)
    //   })

    setState({
      primary_image: null,
      name: "Rene",
      email: "rene@gmail.com",
      password: "hello123",
      location: "Toronto, ON",
      dog_name: "Tofu",
      images: [
        "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
        "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
        "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
        "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
      ],
      bio: "I like dogs.",
      playful: true,
      affectionate: true,
      high_energy: true,
      shy: true,
      well_trained: false,
      large: false,
    });
  }, []);

  return (
    <Router>
      <div className="profile-container">
        <Card id="user_card">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={1 + state.images.length}
          >
            <Slider>
              <Slide index={0}>
                <Image
                  src={
                    state.primary_image ||
                    "https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png"
                  }
                  wrapped
                  ui={false}
                />
              </Slide>

              {state.images.map((img, ind) => {
                return (
                  <Slide index={1 + ind}>
                    <Image src={img} wrapped ui={false} />
                  </Slide>
                );
              })}
            </Slider>

            <div className="slider">
              <CustomDotGroup slides={1 + state.images.length} />
            </div>
          </CarouselProvider>

          <Card.Content>
            <Card.Header>
              {state.name} and {state.dog_name}
            </Card.Header>
            <Card.Meta>
              <span>{state.location}</span>
            </Card.Meta>
            <Card.Description>{state.bio}</Card.Description>
          </Card.Content>
          <Card.Content>
            {state.playful ? (
              <p>
                <Icon name="check"></Icon> Playful
              </p>
            ) : null}
            {state.affectionate ? (
              <p>
                <Icon name="check"></Icon> Affectionate
              </p>
            ) : null}
            {state.shy ? (
              <p>
                <Icon name="check"></Icon> Shy
              </p>
            ) : null}
            {state.high_energy ? (
              <p>
                <Icon name="check"></Icon> High-energy
              </p>
            ) : null}
            {state.well_trained ? (
              <p>
                <Icon name="check"></Icon> Well-trained
              </p>
            ) : null}
            {state.large ? (
              <p>
                <Icon name="check"></Icon> Large
              </p>
            ) : null}
          </Card.Content>
        </Card>
      </div>
    </Router>
  );
}
