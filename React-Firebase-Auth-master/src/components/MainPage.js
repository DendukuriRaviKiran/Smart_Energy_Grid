import React, { useState,useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Alert, Form, Dropdown } from "react-bootstrap";

import { FaHome,FaSun ,FaSolarPanel} from "react-icons/fa";
import { IoMdBatteryCharging } from 'react-icons/io';
import { VscDashboard } from 'react-icons/vsc';
import { VscThreeBars } from 'react-icons/vsc';
import { Box,Typography, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StatBox from "./StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/BatteryChargingFull";
import Header from "./Header";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/SolarPower";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import GridViewIcon from '@mui/icons-material/GridView';
import sjsumap from "./images/sjsu_map.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import PowerIcon from '@mui/icons-material/Power';

import axios from "axios";
import './Mainpage.css';
const data = [
    { name: "Battery 1", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Battery 2", uv: 3000, pv: 1398, amt: 2210 }
  ];


function MainPage({ setBattery, setSol, APICode }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [selectedSolar, setSelectedSolar] = useState(null);
  const [batteries, setBatteries] = useState([]);
  const [solar, setSolar] = useState([]);
  const [list, setList] = useState("");
  const [admin, setAdmin] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [selectedBatteryMap, setSelectedBatteryMap] = useState("");
  const [selectedBatteryID, setSelectedBatteryID] = useState("");
  const [selectedSolarMap, setSelectedSolarMap] = useState("");
  const [selectedSolarID, setSelectedSolarID] = useState("");

  const API_URL = `http://127.0.0.1:5000/batteries/${APICode}`;
  const Solar_URL = `http://127.0.0.1:5000/solar/${APICode}`;
  const Admin_URL = "http://127.0.0.1:5000/admin_credentials";
  const Dashboard_URL = "http://127.0.0.1:5000/dashboard";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      
    }
    else if (a === 2) {
      setSelectedTab("Dashboard");
      const response_1 = await axios.get(Dashboard_URL);
      setDashboard(response_1.data);
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

async function handleMapSelect(c) {
  if (c === 1) {
    setSelectedBatteryMap("LG_RESU_FLEX@2.0.3");
    setSelectedSolarMap("Tesla_SolarCity@1.0.1");
    setSelectedBatteryID("1");
    setSelectedSolarID("1");
  }
}

 const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 const toggleSidebar = () => {
   setIsSidebarOpen(!isSidebarOpen);
 };

 const columns_battery = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "obj",
    headerName: "Object ID",
    flex: 1,
  },
  {
    field: "value",
    headerName: "Location",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
  },  
  {
    field: "analytics",
    headerName: "View Analytics",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[700]}
          borderRadius="4px"
          onClick={() => handleBatteryView(row.id)}
        >
          <AnalyticsIcon  />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            View Analytics
          </Typography>
        </Box>
      );
    },
  },
   currentUser && currentUser.email === list && (
  {
    field: "delete",
    headerName: "Delete Storage",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.redAccent[600]}
          borderRadius="4px"
          onClick={() => handleDelete(0,row.id)}
        >
          <DeleteIcon/>
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Delete Storage
          </Typography>
        </Box>
      );
    },
  }),
];

const columns_solar = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "obj",
    headerName: "Object ID",
    flex: 1,
  },  
  {
    field: "value",
    headerName: "Location",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
  },
  {
    field: "analytics",
    headerName: "View Analytics",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[700]}
          borderRadius="4px"
          onClick={() => handleSolarView(row.id)}
        >
          <AnalyticsIcon  />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            View Analytics
          </Typography>
        </Box>
      );
    },
  },
  currentUser && currentUser.email === list && (
  {
    field: "delete",
    headerName: "Delete Solar",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.redAccent[600]}
          borderRadius="4px"
          onClick={()=>handleDelete(1,row.id)}
        >
          <DeleteIcon/>
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Delete Solar
          </Typography>
        </Box>
      );
    },
  }),
];
  return (
    <>
     <div>
        <div>
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <VscThreeBars style={{ color: "#17a2b8", marginRight: "10px" }} />
            {isSidebarOpen ? "Menu" : "Menu"}
          </button>
        </div>
        <div className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
          <button className={`sidebar-btn dashboard-btn ${
            selectedTab === "Dashboard" ? "selected" : ""
          }`} onClick={() => fetchData(2)}>
            <GridViewIcon style={{ color: "#17a2b8", marginRight: "10px" }} /> Dashboard
          </button>
          <button className={`sidebar-btn battery-btn ${
            selectedTab === "Manage Battery" ? "selected" : ""
          }`} onClick={() => fetchData(0)}>
          <BatteryChargingFullIcon style={{ color: "#17a2b8" ,marginRight: "5px", fontSize: "18px" }} />{" "} Manage Battery
          </button>
          <button className={`sidebar-btn solar-btn ${
            selectedTab === "Manage Solar" ? "selected" : ""
          }`} onClick={() => fetchData(1)}>
            <FaSolarPanel style={{ color: "#17a2b8", marginRight: "5px" }} /> {" "} Manage Solar
          </button>
          
        { currentUser && currentUser.email === list && 
          <button class="btn btn-success" style={{ marginTop:"10px" }} onClick={()=>handleUpdate(0)}>Add new Battery</button>
        }
        {currentUser && currentUser.email === list &&
        <button class="btn btn-warning"  style={{ marginTop:"30px" }} onClick={()=>handleUpdate(1)}>Add new Solar</button>
        }
        </div>
      {(selectedTab === "") ? (  
        <div className="map_sjsu">
          <img src={sjsumap} alt="image-description" />
          <LocationOnIcon className="map_icon_1" onClick={()=>handleMapSelect(1)}/>
          <LocationOnIcon className="map_icon_2"/>
          <LocationOnIcon className="map_icon_3"/>
          <LocationOnIcon className="map_icon_4"/>
          <LocationOnIcon className="map_icon_5"/>
          <LocationOnIcon className="map_icon_6"/>
          <LocationOnIcon className="map_icon_7"/>
          <LocationOnIcon className="map_icon_8"/>
          <LocationOnIcon className="map_icon_9"/>
          <div style={{ 
            position: "absolute",
            right:"-550px"
            }}>
            <Card style={{ backgroundColor: "white" , height:"450px",width:"370px"}}>
            <Card.Header style={{ backgroundColor: "black", color: "white",height: "60px"  }}>
              <Header subtitle="Grid Elements in the Selected Location" />
            </Card.Header>
            <Card.Body>
            {(selectedBatteryMap === "") ? (
                  <Typography
                  marginTop="140px"
                  marginLeft="80px"
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[700]}
                >
                Select a location in the Map
                </Typography>
            ):null }
            {(selectedBatteryMap != "") ? (
              <Card style={{ backgroundColor: "#034694", marginTop:"25px",marginBottom: "60px" }}>
                <Typography
                  marginTop="10px"
                  marginLeft="10px"
                  variant="h5"
                  fontWeight="600"
                  color="white"
                >
                 Battery:
                </Typography>
                
                <Card.Body style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <PowerIcon style={{ marginRight: "10px",marginLeft:"5px",color:"white" }} />
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    marginRight="10px"
                    color={colors.greenAccent[400]}
                  >
                    {selectedBatteryMap}
                  </Typography>
                  <Button
                    variant="link"
                    style={{
                      background: "#ffc107",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      transition: "opacity 0.5s ease-in-out",
                      textDecoration: "none",
                      color: "black",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                    onClick={() => handleBatteryView(selectedBatteryID)}
                  >
                    View More
                  </Button>
                </Card.Body>
              </Card>
              ) : null }
              {(selectedSolarMap != "") ? (
              <Card style={{ backgroundColor: "#034694"}}>
              <Typography
                marginTop="10px"
                marginLeft="10px"
                variant="h5"
                fontWeight="600"
                color="white"
              >
                Solar:
              </Typography>
              <Card.Body style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SolarPowerIcon style={{ marginRight: "10px",marginLeft:"5px",color:"white" }} />
                <Typography
                  variant="h5"
                  fontWeight="600"
                  marginRight="10px"
                  color={colors.greenAccent[400]}
                >
                  {selectedSolarMap}
                </Typography>
                <Button
                  variant="link"
                  style={{
                    background: "#ffc107",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    transition: "opacity 0.5s ease-in-out",
                    textDecoration: "none",
                    color: "black",
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                  onClick={() => handleSolarView(selectedSolarID)}
                >
                  View More
                </Button>
              </Card.Body>
            </Card>
            ) : null }
            </Card.Body>
            </Card>
          </div>
        </div>
      ) : null}
      {(selectedTab === "Dashboard") && dashboard && dashboard.new_clients  ? (
       <Box m="-300px">
       {/* HEADER */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
         <Header title="DASHBOARD" subtitle="Welcome to your Grid dashboard" />
       </Box>
 
       {/* GRID & CHARTS */}
       <Box
         display="grid"
         gridTemplateColumns="repeat(12, 1fr)"
         gridAutoRows="140px"
         gap="20px"
       >
         {/* ROW 1 */}
         <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
         >
           <StatBox
             title={dashboard.total_storage_consumption.total}
             subtitle="Total Storage Consumption"
             progress={dashboard.total_storage_consumption.progress}
             increase={dashboard.total_storage_consumption.increase}
             icon={
               <EmailIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
               />
             }
           />
         </Box>
        
         <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
         >
           <StatBox
             title={dashboard.new_clients.total}
             subtitle="New Clients"
             progress={dashboard.new_clients.progress}
             increase={dashboard.new_clients.increase}
             icon={
               <PersonAddIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
               />
             }
           />
         </Box>
         <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
         >
           <StatBox
             title={dashboard.total_energy_generation.total}
             subtitle="Total Energy Generation"
             progress={dashboard.total_energy_generation.progress}
             increase={dashboard.total_energy_generation.increase}
             icon={
               <TrafficIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
               />
             }
           />
         </Box>
 
         {/* ROW 2 */}
         <Box
           gridColumn="span 8"
           gridRow="span 2"
           backgroundColor={colors.primary[400]}
         >
           <Box
             mt="20px"
             p="0 30px"
             display="flex "
             justifyContent="space-between"
             alignItems="center"
           >
             <Box>
               <Typography
                 variant="h5"
                 fontWeight="600"
                 color={colors.grey[100]}
               >
                 Storage Consumption
               </Typography>
               
             </Box>
           </Box>
           <Box height="250px" m="-20px 0 0 0">
             <LineChart isDashboard={true} />
           </Box>
         </Box>
         
         <Box
           gridColumn="span 4"
           gridRow="span 2"
           backgroundColor={colors.primary[400]}
         >
           <Typography
             variant="h5"
             fontWeight="600"
             sx={{ padding: "30px 30px 0 30px" }}
             color={colors.grey[300]}
           >
             Energy Generation
           </Typography>
           <Box height="250px" mt="-40px">
             <BarChart isDashboard={true} />
           </Box>
         </Box>
         
       </Box>
     </Box>
      ) : null}
      {selectedTab === "Manage Solar" ? (
          <Box m="-300px">
            <Header
              title="Power Source"
              subtitle="List of Power Sources and their details" 
            />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid checkboxSelection={false} rows={solar} columns={columns_solar} />
          </Box>
        </Box>
      ) : null}
      {selectedTab === "Manage Battery" ? (
        
       <Box m="-300px">
    
      <Header title="Storage" subtitle="Managing Storage Devices" />
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection={false} rows={batteries} columns={columns_battery} />
      </Box>
    </Box>
        
      ) : null}
    </div>
      <div style={{ 
      position: "absolute", 
      top: "10px", 
      right: "25px",
      color: "#fff", // Set text color to white
      background: "transparent" // Set card background to transparent
    }}>
      <Card style={{ background: "transparent" }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser && (
            <>
              <strong>Email:</strong> {currentUser.email}
            </>
          )}
          <div className="d-flex justify-content-between w-100 mt-3">
            <Link to="/update-profile" className="btn btn-primary">
              Update Profile
            </Link>
            <Button variant="link" style={{ background: "#fff" }} onClick={handleLogout}>
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