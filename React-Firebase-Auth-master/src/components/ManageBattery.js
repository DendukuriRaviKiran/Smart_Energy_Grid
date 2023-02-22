import React, { useState,useEffect } from 'react';
import axios from 'axios';


const ManageBattery = ({Battery,APICode}) => {
    const [batteryData, setBatteryData] = useState({});
    const Battery_URL = `http://127.0.0.1:5000/batteries/${APICode}`;
    useEffect(() => {
        async function fetchData(Battery) {
          
            const response1 = await axios.get(Battery_URL);
            const response_data = response1.data.find(batteries => batteries.id === Battery);
            setBatteryData(response_data);
            console.log(batteryData);
          }
          fetchData(Battery);
      }, [Battery]);
  return (
    <div>
      <h2>Manage Battery: {Battery}</h2>
      {batteryData && batteryData.name ? (
        <>
        <p>View Battery Details {batteryData.name}</p>
        <p>View Battery Value {batteryData.value}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ManageBattery
