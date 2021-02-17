import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "./EditProfile.css";
import { Form, Checkbox } from "semantic-ui-react";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import CustomDotGroup from "./CustomDotGroup";

export default function Profile(props) {

  const { user } = props;
  // console.log('user', user)

  const [state, setState] = useState({
    primary_image: "",
    name: "",
    email: "",
    password: "",
    location: "",
    dog_name: "",
    images: [],
    bio: "",
    playfull: true,
    affectionate: true,
    high_energy: true,
    shy: true,
    well_trained: true,
    large: true,
  });

  useEffect(() => {
    // axios.get(`/api/users/${props.userId}`).then((res) => {
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
      playful: false,
      affectionate: true,
      high_energy: true,
      shy: true,
      well_trained: false,
      large: false,
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = () => {
    // const { name, email } = this.state
    // this.setState({ submittedName: name, submittedEmail: email })
  };

  return (
    <Router>
      <div className="edit-profile-container">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Location</label>
              <input
                placeholder="Location"
                name="location"
                value={state.location}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Dog's Name</label>
              <input
                placeholder="Dog's Name"
                name="dog_name"
                value={state.dog_name}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>E-mail</label>
              <input
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.TextArea label="Bio" placeholder="Describe yourself and your dog..." name="bio" value={state.bio} />

            <label style={{ "fontWeight" : "bold" }}>Check all that apply to your dog</label>
            <Form.Group>              
              <Form.Field
                control={Checkbox}
                label="Playful"
                name="playful"
                checked={state.playful}
                onChange={handleChange} 
              />
              <Form.Field
                control={Checkbox}
                label="Affectionate"
                name="affectionate"
                checked={state.affectionate}
                onChange={handleChange} 
              />
              <Form.Field
                control={Checkbox}
                label="Shy"
                name="shy"
                checked={state.shy}
                onChange={handleChange} 
              />
              <Form.Field
                control={Checkbox}
                label="High-energy"
                name="high_energy"
                checked={state.high_energy}
                onChange={handleChange} 
              />
              <Form.Field
                control={Checkbox}
                label="Well-trained"
                name="well_trained"
                checked={state.well_trained}
                onChange={handleChange} 
              />
              <Form.Field
                control={Checkbox}
                label="Large"
                name="large"
                checked={state.large}
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Button content="Submit" />
          </Form>
        </div>
      </div>
    </Router>
  );
}
