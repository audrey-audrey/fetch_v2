import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Favourites(props) {
  const [state, setState] = useState({
    favourites: [],
  });

  console.log("here");

  useEffect(() => {
    axios.get(`/api/users/${localStorage.getItem("user_id")}`)
    .then((res) => {
      const user = res.data[0]
      console.log("return user data", user);
      // state.favourites.push(res.data[0])
      // setState(...state, state.favourites)
    });

    setState({
      favourites: [
        {
          id: 1,
          name: "Rene",
          user_id: "2",
          dog_name: "Tofu",
          primary_image:
            "https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png",
        },
        {
          id: 2,
          name: "Alison",
          user_id: "3",
          dog_name: "Rupert",
          primary_image:
            "https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png",
        },
      ],
    });
  }, []);

  return (
    <div className="favourites-container">
      <Card.Group>
        {state.favourites.map((favourite) => {
          const {user_id, primary_image, name, dog_name} = favourite
          return (
          <Card key={user_id}>
            <Card.Content>
              <Image floated="right" size="mini" src={primary_image} />
              <Card.Header>
                {name} and {dog_name}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Button fluid as={Link} to={`/user/${user_id}`}>
                View Profile
              </Button>
            </Card.Content>
          </Card>
          )
        })}
      </Card.Group>
    </div>
  );
}
