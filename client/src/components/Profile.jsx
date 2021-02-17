import React, { useEffect } from "react";
import { useState } from "react";
// import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Card, Divider, Icon, Image, Header } from "semantic-ui-react";
import "./Profile.scss";
import { Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import appLogo from "../images/icons/logo.png";

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
  const { user } = props

  const { user_id } = useParams()
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

  const imageURLs = [
    'https://www.pexels.com/photo/two-yellow-labrador-retriever-puppies-1108099/',
    'https://www.pexels.com/photo/brown-and-white-short-coated-puppy-1805164/',
    'https://www.pexels.com/photo/closeup-photography-of-adult-short-coated-tan-and-white-dog-sleeping-on-gray-textile-at-daytime-731022/',
    'https://www.pexels.com/photo/brown-and-white-american-pit-bull-terrier-with-brown-costume-825949/'
  ]

  const [isProfileOwner, setIsProfileOwner] = useState(

    true || // TODO: remove

    localStorage.getItem('user_id') === user_id
  )

  const [favourited, setFavourited] = useState(false)

  return (
    <div className="profile-container">

      {
        !isProfileOwner && !favourited ?
          <Button color="yellow">
            <Icon name="star" /> Favourite
            </Button>
          :
          null
      }

      <div className='profile-section-top'>
      <div className='logo'>
        <img class="ui small right floated image" src={appLogo} />
      </div>
        <img class="ui centered medium rounded image" src={user.primary_image} />
        <Header textAlign='center' size='large'>{user.name} & {user.dog_name}</Header>
        {
          isProfileOwner ?
            <Link to='/edit-user'><Button center>Edit Profile</Button></Link>
            :
            null
        }
      </div>

      <Card id="user_card">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
        // totalSlides={1 + state.images.length}
        >
          <Slider>
            <Slide index={0}>
              <Image
                src={user.primary_image}
                wrapped
                ui={false}
              />
            </Slide>

            {/* {state.images.map((img, ind) => {
                return (
                  <Slide index={1 + ind}>
                    <Image src={img} wrapped ui={false} />
                  </Slide>
                );
              })} */}
          </Slider>

          {/* <div className="slider">
              <CustomDotGroup slides={1 + state.images.length} />
            </div> */}
        </CarouselProvider>

        <Card.Content>
          <Card.Meta>
            <span>Toronto</span>
          </Card.Meta>
          <Card.Description>{user.bio}</Card.Description>
        </Card.Content>
        <Card.Content>
          {user.playful ? (
            <Label as="a" tag>
              Playful
            </Label>
          ) : null}
          {user.affectionate ? (
            <Label as="a" tag>
              Affectionate
            </Label>
          ) : null}
          {user.shy ? (
            <Label as="a" tag>
              Shy
            </Label>
          ) : null}
          {user.high_energy ? (
            <Label as="a" tag>
              High-energy
            </Label>
          ) : null}
          {user.well_trained ? (
            <Label as="a" tag>
              Well-trained
            </Label>
          ) : null}
          {user.large ? (
            <Label as="a" tag>
              Large
            </Label>
          ) : null}
        </Card.Content>
      </Card>

    </div>
  );
}
