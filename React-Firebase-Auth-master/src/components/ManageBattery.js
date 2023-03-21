import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import "./ManageBattery.css";
import { tokens } from "../theme";
import { render } from 'react-dom'
import Thermometer from 'react-thermometer-component'
import Speedometer from 'react-d3-speedometer'
import { Grid } from '@mui/material'

const ManageBattery = ({ Battery, APICode }) => {
  const [batteryData, setBatteryData] = useState({});
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [batteryTemperature, setBatteryTemperature] = useState(0);
  const [batteryPPS, setBatteryPPS] = useState(0);
  const [chargeRate, setChargeRate] = useState(0);
  const [dischargeRate, setDischargeRate] = useState(0);
  const Battery_URL = `http://127.0.0.1:5000/batteries/${APICode}`;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    async function fetchData(Battery) {
      const response1 = await axios.get(Battery_URL);
      const response_data = response1.data.find(
        (batteries) => batteries.id === Battery
      );
      setBatteryData(response_data);
    }
    fetchData(Battery);
  }, [Battery]);

  useEffect(() => {
    setBatteryLevel(batteryData.current_stored_capacity);
    setBatteryTemperature(batteryData.temperature);
    setBatteryPPS(batteryData.pps);
    setChargeRate(batteryData.charge_rate);
    setDischargeRate(batteryData.discharge_rate);
  }, [batteryData]);

  function getLiquidColorClass(level) {
    if (level >= 0 && level < 40) {
      return "gradient-color-red";
    } else if (level >= 40 && level < 70) {
      return "gradient-color-orange";
    } else {
      return "gradient-color-green";
    }
  }

  return (
    <div>
      {batteryData && batteryData.name ? (
        
        <Box m="-300px">
          <Header
            title={`Manage Battery - ${batteryData.name}`}
            subtitle={`Detailed Analytics for Object ID: ${batteryData.obj}`}
          />
          <Box display="grid" gridAutoRows="285px"
         gap="185px" gridTemplateColumns="repeat(4, 2fr) repeat(8, 1fr)" gap={1}>
            <Box gridColumn="span 4" m="0 -400px 0 50px">
              <section className="battery">
                <div className="battery__card">
                  <div className="battery__data">
                    <p className="battery__text">{"Present State of Charge(%)"}</p>
                    <h1 className="battery__percentage">{`${batteryLevel}%`}</h1>
                  </div>
                  <div className="battery__pill">
                    <div className="battery__level">
                      <div
                        className={`battery__liquid ${getLiquidColorClass(
                          batteryLevel
                        )}`}
                        style={{ height: `${batteryLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </section>
            </Box>
            <Box gridColumn="span 8" m="-200 -100 -100 100px">
              <section className="battery">
                <div className="battery_card_new">
                <div className="battery__data">
                    <p className="battery__text">{"Present temperature(°C)"}</p>
                    <h1 className="battery__percentage">{`${batteryTemperature} °C`}</h1>
                  </div>
                      <Thermometer
                        theme="dark"
                        value={batteryTemperature}
                        max="100"
                        steps="3"
                        format="°C"
                        
                        height="200"
                      />
                </div>
              </section>    
            </Box>
          </Box>
        <Box
          gridColumn="span 20"
          gridRow="span 20"
          justifyContent="center"
          m="100 -100 -100 -100px"
        >
          <section className="battery">
          <div className="battery_card_speed" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
            <div style={{margin: '10px', textAlign: 'center'}}>
              <Speedometer
                value={batteryPPS}
                minValue={0}
                maxValue={500}
                segments={5}
                segmentColors={['#CCFFCC','#99FF99', '#66FF66','#00FF00', '#33FF33']}
                height={150}
                width={150}
                label="Present Power Setpoint (KW)"
                labelFontSize={10}
                labelStyle={{ color: 'white', fontFamily: 'sans-serif' }}
              />
              <p className="battery__text_speed">Present Power Setpoint (KW)</p>
            </div>
            <div style={{margin: '10px', textAlign: 'center'}}>
              <Speedometer
                value={chargeRate}
                minValue={-20}
                maxValue={20}
                segments={5}
                segmentColors={['#A6E1FF','#63C7FF','#00A2FF','#006FCC','#004D99']}
                height={150}
                width={150}
                label="Charge Rate"
                labelFontSize={10}
                labelStyle={{ color: 'white', fontFamily: 'sans-serif' }}
              />
              <p className="battery__text_speed">Charge rate (KW)</p>
            </div>
            <div style={{margin: '10px', textAlign: 'center'}}>
              <Speedometer
                value={dischargeRate}
                minValue={-20}
                maxValue={20}
                segments={5}
                segmentColors={['#FFA6A6','#FF6363','#FF0000','#CC0000','#990000']}
                height={150}
                width={150}
                label="Discharge Rate"
                labelFontSize={10}
                labelStyle={{ color: 'white', fontFamily: 'sans-serif' }}
              />
              <p className="battery__text_speed">Discharge Rate (KW)</p>
              
            </div>
          </div>
          </section>  
        </Box>
      </Box>
        
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ManageBattery;
