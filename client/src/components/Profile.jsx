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
import Carousel from 'nuka-carousel';
import rupert from "../images/rupert.png"
import appLogo from "../images/icons/logo.png"

// import CustomDotGroup from "../components/CustomDotGroup";

export default function Profile(props) {
  const profile_id = useLocation().pathname.split("/")[2];

  const { user_id } = useParams() 
  const [state, setState] = useState({
    user: {}
  });

  const [isProfileOwner, setIsProfileOwner] = useState(false)

  const setUser = (user) => setState((prev) => ({ ...prev, user }))

  // fetch current user data
  const requestedUser = window.location.pathname.substring(6)
  useEffect(() => {

    if (localStorage.getItem("user_id") === profile_id) {
      setIsProfileOwner(true);
    }

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

  const [favourited, setFavourited] = useState(false)

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
  return (
    <div className="profile-container">

      <div className='profile-section-top'>
        <Image src={appLogo} />
        <img className="profile-image" src={state.user.primary_image} />
        <Header textAlign='center' size='large'>
          {state.user.name} & {state.user.dog_name}
          <Header.Subheader>
            Toronto, ON
          </Header.Subheader>
        </Header>

        {
          isProfileOwner ?
            <Link to='/edit-user'><Button>Edit Profile</Button></Link>
            :
            null
        }

        {!isProfileOwner && !favourited ? (
          <Button color="yellow">
            <Icon name="star" /> Favourite
          </Button>
        ) : null}

        {!isProfileOwner ? (
          <Link>
            <Button onClick={handleChat}>Start a Chat!</Button>
          </Link>
        ) : null}

      </div>

      <Card fluid>
        <Card.Content>
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

      <div className='carousel'>
        <Carousel initialSlideHeight={0.4}>
          <img src={rupert} />
          <img src={rupert} />
          <img src={rupert} />
        </Carousel>
      </div>


    </div>
  );
}
