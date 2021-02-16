import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Favourites(props) {
  const [state, setState] = useState({
    favourites: [],
  });

  console.log("here");

  useEffect(() => {
    // axios.get(`/api/users/${localStorage.get('user_id')}`).then((res) => {
    //     data = res.data.body[0]
    //     setState(data)
    //   })

    setState({
      favourites: [
        {
          name: "Rene",
          user_id: "2",
          dog_name: "Tofu",
          primary_image:
            "https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png",
        },
        {
          name: "Rene",
          user_id: "2",
          dog_name: "Tofu",
          primary_image:
            "https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png",
        },
      ],
    });
  }, []);

  return (
    <div className="favourites-container">
      <Card.Group>
        {state.favourites.map((user) => (
          <Card>
            <Card.Content>
              <Image floated="right" size="mini" src={user.primary_image} />
              <Card.Header>
                {user.name} and {user.dog_name}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
                
                  <Button fluid as={Link} to={`/user/${user.user_id}`}>View Profile</Button>
                  
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}