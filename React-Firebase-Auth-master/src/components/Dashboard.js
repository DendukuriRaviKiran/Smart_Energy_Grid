import React, { useState } from "react";
import { Card, Button, Alert, Form, Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard({ setAPICode }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState("Option 1");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleOptionChange(e) {
    setSelectedOption(e);
  }

  function handleSubmit() {

    setAPICode(selectedOption.split(' ').join('') );
    history.push("/mainpage");
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <h2 className="mt-5">Select Battery System</h2>
        <div className="d-flex flex-column align-items-center">
          <Form className="d-flex align-items-center mt-5">
              <Dropdown onSelect={handleOptionChange}>
                <Dropdown.Toggle variant="success">
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Option 1">Option 1</Dropdown.Item>
                  <Dropdown.Item eventKey="Option 2">Option 2</Dropdown.Item>
                  <Dropdown.Item eventKey="Option 3">Option 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="ml-3" />
              <Button variant="primary" type="submit" onClick={handleSubmit} >
                Submit
              </Button>
          </Form>
        </div>
      </div>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {currentUser && <><strong>Email:</strong> {currentUser.email}</>}
            <div className="d-flex justify-content-between w-100 mt-3">
              <Link to="/update-profile" className="btn btn-primary">
                Update Profile
              </Link>
              <Button variant="link" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}