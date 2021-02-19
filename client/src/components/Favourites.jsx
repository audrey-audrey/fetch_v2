import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Card, Image, Icon, CardContent, CardDescription, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Favourites.scss"

export default function Favourites(props) {
  const [state, setState] = useState({
    favourites: [],
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const params = { user_id };

    axios.get(`/api/users/${user_id}/favorites/`, { params }).then((res) => {
      console.log(res);
      setState({ favourites: res.data });
    });
  }, []);

  // const handleDelete = function (event) {
  //   event.preventDefault();
  //   const user_id = localStorage.getItem("user_id");
  //   // const params = { user_id, favoritee: favoritee_id };
  //   console.log("favourites", state.favourites.favoritee_id)

  //   // return axios
  //   // .delete(`/api/users/${user_id}/favorites/${favoritee_id}`, params)
  //   // .then((res) => {
  //   //   axios
  //   //     .get(`/api/users/${user_id}/favorites/`)
  //   //     .then((res) =>
  //   //       setState((prev) => ({ ...prev, favourites: res.data}))
  //   //     );
  //   // })
  //   // .catch((err) => {
  //   //   throw err;
  //   // });

  // }

  return (
    
    <div className="favourites-container">
      <Header size="huge" textAlign="center" >Good Dogs</Header>
      <Card.Group >
        {state.favourites.map((favourite) => {
          const { favoritee_id, primary_image, name, dog_name, bio } = favourite;
          return (
            <Card key={favoritee_id}>
              <Image fluid src={primary_image} />
              <Card.Content>
                <Card.Header textAlign="center">
                  {name} and {dog_name}
                </Card.Header>
              </Card.Content>
              <CardDescription textAlign="center">
                {bio}
              </CardDescription>
              <Card.Content extra>
                <Button 
                animated
                color="teal"
                as={Link} to={`/user/${favoritee_id}`}>
                 <Button.Content visible>Profile</Button.Content>
                    <Button.Content hidden></Button.Content>
                </Button>
                <Button 
                icon 
                size="mini"
                basic
                color="red"
                floated="right"
                // onClick={handleDelete}
                >
                  <Icon name="delete"/>
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
}
