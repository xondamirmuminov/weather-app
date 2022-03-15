import React, { useState, useEffect } from "react";
import StyledApp from "./styles/app";
import axios from "axios";

const API_KEY = "fde1407fe24dea0c61cd7c4b060cc81d";

function App() {
  const [data, setData] = useState({});

  const geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchData);
    }
  };

  const fetchData = async (position) => {
    const { latitude, longitude } = position.coords;
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

    setData(data);
  };

  useEffect(() => {
    geolocation();
  }, []);

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  return (
    <StyledApp>
      <div className="home">
        <h3>
          {data?.name}, {data?.sys?.country}
        </h3>
        <h1>{calCelsius(data?.main?.temp)} &#186;</h1>
        <div>
          <h2>{calCelsius(data?.main?.temp_min)} &#186;</h2>
          <h2>{calCelsius(data?.main?.temp_max)} &#186;</h2>
        </div>
        <i className="wi wi-day-sunny display-1" />
      </div>
    </StyledApp>
  );
}

export default App;
