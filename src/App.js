import React, { useState, useEffect } from "react";
import StyledApp from "./styles/app";
import axios from "axios";

function App() {
  const [data, setData] = useState({});

  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: "London,uk",
      lat: "0",
      lon: "0",
      callback: "test",
      id: "2172797",
      lang: "null",
      units: "imperial",
      mode: "xml",
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "fdc8785d44msh81ed23ae71e0e69p146541jsn9cb4e0d39297",
    },
  };

  const fetchData = async () => {
    const { data } = await axios.request(options);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledApp>
      <h1>hi</h1>
    </StyledApp>
  );
}

export default App;
