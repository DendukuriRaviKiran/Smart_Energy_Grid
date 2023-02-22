import React,{useState} from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import MainPage from "./MainPage"
import ManageBattery from "./ManageBattery"
import ManageSolar from "./ManageSolar"
import BatteryUpdate from "./BatteryUpdate"
import SolarUpdate from "./SolarUpdate"
function App() {
  const [Battery, setBattery] = useState('');
  const [Sol, setSol] = useState('');
  const [APICode, setAPICode] = useState('');
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" render={(props) => <Dashboard {...props} setAPICode={setAPICode} />} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route
              path="/mainpage"
              render={(props) => <MainPage {...props} setBattery={setBattery} setSol={setSol} APICode={APICode}/>}
              />
              <Route path="/battery" render={(props) => <ManageBattery {...props} Battery={Battery} APICode={APICode} />} />
              <Route path="/solar" render={(props) => <ManageSolar {...props} Sol={Sol} APICode={APICode} />} />
              <Route path="/batteryupdate" render={(props) => <BatteryUpdate {...props} APICode={APICode} />} />
              <Route path="/solarupdate" render={(props) => <SolarUpdate {...props} APICode={APICode} />} />
            
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
