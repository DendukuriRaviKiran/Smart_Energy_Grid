import React, { useState,useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Alert, Form, Dropdown } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
const data = [
    { name: "Battery 1", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Battery 2", uv: 3000, pv: 1398, amt: 2210 }
  ];


function MainPage({ setBattery, setSol, APICode }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [selectedSolar, setSelectedSolar] = useState(null);
  const [batteries, setBatteries] = useState([]);
  const [solar, setSolar] = useState([]);
  const [list, setList] = useState("");
  const [admin, setAdmin] = useState(false);

  const API_URL = `http://127.0.0.1:5000/batteries/${APICode}`;
  const Solar_URL = `http://127.0.0.1:5000/solar/${APICode}`;
  const Admin_URL = "http://127.0.0.1:5000/admin_credentials";

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  
  async function fetchData(a) {
    if (a === 0) {
      setSelectedTab("Manage Battery");
      const response = await axios.get(API_URL);
      setBatteries(response.data);
    } else if (a === 1) {
      setSelectedTab("Manage Solar");
      const response1 = await axios.get(Solar_URL);
      setSolar(response1.data);
      console.log(solar);
    }
  }

  async function handleSolarView(name) {
    setSelectedSolar(name)
    setSol(name);
    history.push("/solar");
  }

  async function handleBatteryView(name) {
    setSelectedBattery(name)
    setBattery(name);
    history.push("/battery");
  }

  async function handleDelete(selection,id_value) {
    if(selection === 1){
        axios.delete(`http://127.0.0.1:5000/solar/${APICode}/${id_value}`)
    .then(response => {
      if (response.status === 200) {
        alert("Solar entry deleted successfully")
        console.log(`Solar entry with ID ${id_value} was successfully deleted`);
      } else {
        console.error('Error deleting solar entry with ID :', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting solar entry with ID :', error);
    });
  }
  else if(selection === 0){
    axios.delete(`http://127.0.0.1:5000/battery/${APICode}/${id_value}`)
    .then(response => {
      if (response.status === 200) {
        alert("Battery entry deleted successfully")
        console.log(`Solar entry with ID ${id_value} was successfully deleted`);
      } else {
        console.error('Error deleting solar entry with ID :', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting solar entry with ID :', error);
    });
  }
}
     
async function handleUpdate(b) {
  if (b === 0) {
    history.push("/batteryupdate");
  } else if (b === 1) {
    history.push("/solarupdate");
  }
}

  async function fetchList() {
    const response = await axios.get(Admin_URL);
    setList(response.data);
}
 fetchList();
 
  return (
    <>
     <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => setSelectedTab("Dashboard")}
        >
          Dashboard
        </button>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => fetchData(0)}
        >
          Manage Battery
        </button>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => fetchData(1)}
        >
          Manage Solar
        </button>
      </div>
      {selectedTab === "Dashboard" ? (
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      ) : null}
      {selectedTab === "Manage Solar" ? (
        <div>
        <div>
        <table style={{ margin: "20px", border: "1px solid black" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Solar Name</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Action</th>
               { currentUser.email === list && 
              <th style={{ border: "1px solid black", padding: "10px" }}>Delete</th>
              }
            
            </tr>
          </thead>
          <tbody>
            {solar.map((sol) => (
            
              <tr key={sol.name}>
                <td style={{ border: "1px solid black", padding: "10px" }}>{sol.name}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <button className="btn btn-primary" onClick={() => handleSolarView(sol.id)}>View</button>
                </td>
                <td>
               {currentUser.email === list &&
              <button class="btn btn-danger delete-item" onClick={()=>handleDelete(1,sol.id)}>Delete</button>
              }
              </td>
              </tr>
            
            ))}
          </tbody>
        </table>
       </div>
       <div>
        {currentUser.email === list &&
        <button class="btn btn-success" onClick={()=>handleUpdate(1)}>Add new Solar</button>
        }
        </div> 
        </div>
      ) : null}
      {selectedTab === "Manage Battery" ? (
        <div>
        <div>
        <table style={{ margin: "20px", border: "1px solid black" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Battery Name</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Action</th>
               { currentUser.email === list &&
              <th style={{ border: "1px solid black", padding: "10px" }}>Delete</th>
              }
            </tr>
          </thead>
          <tbody>
            {batteries.map((battery) => (
              <tr key={battery.name}>
                <td style={{ border: "1px solid black", padding: "10px" }}>{battery.name}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <button className="btn btn-primary" onClick={() => handleBatteryView(battery.id)}>View</button>
                </td>
                <td>
                { currentUser.email === list &&
              <button class="btn btn-danger delete-item" onClick={()=>handleDelete(0,battery.id)}>Delete</button>
              }
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div>
        { currentUser.email === list &&
        <button class="btn btn-success" onClick={()=>handleUpdate(0)}>Add new Battery</button>
        }
        </div> 
        </div>
      ) : null}
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
  )
}

export default MainPage;