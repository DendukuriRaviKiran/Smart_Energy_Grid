import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
const SolarUpdate = ({APICode}) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [value, setValue] = useState("");
  
    const history = useHistory();
    const handleSubmit = (event) => {
      event.preventDefault();
    
      fetch(`http://127.0.0.1:5000/${APICode}/solarcreate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id, value }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert("Solar created successfully!");
          setName("");
          setId("");
          setValue("");
          history.push("/mainpage");
        })
        .catch((err) => {
          alert("Error creating Solar!");
          console.error(err);
        });
    };
  
  return (
    <Card>
    <Card.Body>
    <h2 className="text-center mb-4">Create New Solar</h2>
    <Form onSubmit={handleSubmit}>
    <Form.Group id="Name">
        <Form.Label>Name</Form.Label>
        <Form.Control
                type="text"
                id= "name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
    </Form.Group>
        <Form.Group id="ID">
        <Form.Label>ID</Form.Label>
        <Form.Control
                type="text"
                id= "id"
                required
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
        </Form.Group>
        <Form.Group id="Value">
        <Form.Label>Value</Form.Label>
        <Form.Control
                type="text"
                id= "value"
                required
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
        </Form.Group>
        <Button className="w-100" type="submit">
              Create Solar
            </Button>
    </Form>
    </Card.Body>
    </Card>
  )
}

export default SolarUpdate