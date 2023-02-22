import React, { useState,useEffect } from 'react';
import axios from 'axios';

const ManageSolar = ({ Sol,APICode }) => {
  const [solarData, setSolarData] = useState({});
  const Solar_URL = `http://127.0.0.1:5000/solar/${APICode}`;

  useEffect(() => {
  async function fetchData(Sol) {
    
      const response1 = await axios.get(Solar_URL);
      const solarData = response1.data.find(solar => solar.id === Sol);
      setSolarData(solarData);
      console.log(solarData);
    }
    fetchData(Sol);
}, [Sol]);
  
  return (
    <div>
      <h2>Manage Solar: {Sol}</h2>
      {solarData && solarData.name ? (
        <>
        <p>View Solar Details {solarData.name}</p>
        <p>View Solar Value {solarData.value}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ManageSolar;