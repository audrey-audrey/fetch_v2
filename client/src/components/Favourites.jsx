import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

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

  return (
    <div className="favourites-container">
      <Card.Group>
        {state.favourites.map((favourite) => {
          const { favoritee_id, primary_image, name, dog_name } = favourite;
          return (
            <Card key={favoritee_id}>
              <Card.Content>
                <Image floated="right" size="mini" src={primary_image} />
                <Card.Header>
                  {name} and {dog_name}
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button fluid as={Link} to={`/user/${favoritee_id}`}>
                  View Profile
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
}
