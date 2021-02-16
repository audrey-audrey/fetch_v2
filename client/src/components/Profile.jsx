import React, { useEffect } from "react";
import { useState } from "react";
// import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Card, Divider, Icon, Image } from "semantic-ui-react";
import "./Profile.css";
import { Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
  const { user_id } = useParams()

  const { user } = props
  console.log(props.user)

  // const [state, setState] = useState({
  //   primary_image: null,
  //   name: null,
  //   email: null,
  //   password: null,
  //   location: null,
  //   dog_name: null,
  //   images: [],
  //   bio: null,
  //   playfull: null,
  //   affectionate: null,
  //   high_energy: null,
  //   shy: null,
  //   well_trained: null,
  //   large: null,
  // });

  const [isProfileOwner, setIsProfileOwner] = useState(

    true || // TODO: remove

    localStorage.getItem('user_id') === user_id
  )

  const [favourited, setFavourited] = useState(false)

  // useEffect(() => {
  // axios.get(`/api/users/${localStorage.get('user_id')}`).then((res) => {
  //     data = res.data.body[0]
  //     setState(data)
  //   })

  //   setState({
  //     primary_image: null,
  //     name: "Rene",
  //     email: "rene@gmail.com",
  //     password: "hello123",
  //     location: "Toronto, ON",
  //     dog_name: "Tofu",
  //     images: [
  //       "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
  //       "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
  //       "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
  //       "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
  //     ],
  //     bio: "I like dogs.",
  //     playful: true,
  //     affectionate: true,
  //     high_energy: true,
  //     shy: true,
  //     well_trained: false,
  //     large: false,
  //   });
  // }, []);

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

      {
        isProfileOwner ?
          <Link to='/edit-user'><Button>Edit Profile</Button></Link>
          :
          null
      }

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
            <Card.Header>
              {user.name} and {user.dog_name}
            </Card.Header>
            <Card.Meta>
              <span>{user.location}</span>
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
