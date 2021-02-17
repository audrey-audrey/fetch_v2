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
import axios from "axios";

export default function Profile(props) {
  const { user_id } = useParams() 
  const [state, setState] = useState({
    user: {}
  });

  // console.log(user_id)

  const setUser = (user) => setState((prev) => ({ ...prev, user }))

  // fetch current user data
  const requestedUser = window.location.pathname.substring(6)
  useEffect(() => {

    axios.get(`/api/users/${requestedUser}`)
      .then((res) => {
        setUser(res.data[0])
      })
  }, [])

  const imageURLs = [
    'https://www.pexels.com/photo/two-yellow-labrador-retriever-puppies-1108099/',
    'https://www.pexels.com/photo/brown-and-white-short-coated-puppy-1805164/',
    'https://www.pexels.com/photo/closeup-photography-of-adult-short-coated-tan-and-white-dog-sleeping-on-gray-textile-at-daytime-731022/',
    'https://www.pexels.com/photo/brown-and-white-american-pit-bull-terrier-with-brown-costume-825949/'
  ]

  const [isProfileOwner, setIsProfileOwner] = useState(

    true || // TODO: remove

    localStorage.getItem('user_id') === requestedUser
  )

  // console.log(isProfileOwner)
  // console.log(localStorage.getItem('user_id') === requestedUser)

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
        <Image src={appLogo} floated='right' />
        <img className="ui centered medium rounded image" src={state.user.primary_image} />
        <Header textAlign='center' size='large'>{state.user.name} & {state.user.dog_name}</Header>
        {
          isProfileOwner ?
            <Link to='/edit-user'><Button>Edit Profile</Button></Link>
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
                src={state.user.primary_image}
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
          <Card.Description>{state.user.bio}</Card.Description>
        </Card.Content>
        <Card.Content>
          {state.user.playful ? (
            <Label as="a" tag>
              Playful
            </Label>
          ) : null}
          {state.user.affectionate ? (
            <Label as="a" tag>
              Affectionate
            </Label>
          ) : null}
          {state.user.shy ? (
            <Label as="a" tag>
              Shy
            </Label>
          ) : null}
          {state.user.high_energy ? (
            <Label as="a" tag>
              High-energy
            </Label>
          ) : null}
          {state.user.well_trained ? (
            <Label as="a" tag>
              Well-trained
            </Label>
          ) : null}
          {state.user.large ? (
            <Label as="a" tag>
              Large
            </Label>
          ) : null}
        </Card.Content>
      </Card>

    </div>
  );
}
