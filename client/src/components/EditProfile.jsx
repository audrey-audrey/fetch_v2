import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "./EditProfile.css";
import { Form, Checkbox, TextArea } from "semantic-ui-react";

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

  const [state, setState] = useState({ 
    user: {
      name: "", 
      location: "", 
      dog_name: "", 
      email: "", 
      bio: "", 
      playful: false, 
      affectionate: false, 
      shy: false, 
      high_energy: false, 
      well_trained: false, 
      large: false
    }
  });

  const setUser = (user) => setState((prev) => ({ ...prev, user }))

  // update with user info
  useEffect(() => {
    const currentUserId = localStorage.getItem('user_id');
    axios.get(`/api/users/${currentUserId}`)
    .then((res) =>{ 
      setUser(res.data[0]) })
  }, [])

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setUser({...state.user,[name]: value});
  }

  const handleSubmit = () => {
    // const { name, email } = this.state
    // this.setState({ submittedName: name, submittedEmail: email })
  };

  return (
    <Router>
      <div className="edit-profile-container">
      {JSON.stringify(state)}
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                value={state.user.name}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Location</label>
              <input
                placeholder="Location"
                name="location"
                value={state.user.location}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Dog's Name</label>
              <input
                placeholder="Dog's Name"
                name="dog_name"
                value={state.user.dog_name}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>E-mail</label>
              <input
                placeholder="Email"
                name="email"
                value={state.user.email}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Bio</label>
              <TextArea 
                placeholder='Tell us more about you and your dog!' 
                name="bio"
                value={state.user.bio}
                onChange={handleChange}
                />
            </Form.Field>

            <label style={{ "fontWeight": "bold" }}>Check all that apply to your dog</label>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  label='Playful'
                  name="playful"
                  checked={state.user.playful}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Affectionate'
                  name="affectionate"
                  checked={state.user.affectionate}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Shy'
                  name="shy"
                  checked={state.user.shy}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='High-energy'
                  name="high-energy"
                  checked={state.user.high_energy}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Well-trained'
                  name="well-trained"
                  checked={state.user.well_trained}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='large'
                  name="large"
                  checked={state.user.large}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Button content="Submit" />
          </Form>
        </div>
      </div>
    </Router>
  );
}
