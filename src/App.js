import React, { useState, useEffect } from "react";
import StyledApp from "./styles/app";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/all";
import moment from "moment";
import Atmos from "./assets/atmos.jpg";
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Rain from "./assets/rain.jpg";
import Snow from "./assets/snow.jpg";
import Thunder from "./assets/thunderstorm.jpg";

const API_KEY = "fde1407fe24dea0c61cd7c4b060cc81d";
const API_URL = "https://api.openweathermap.org/data/2.5/";
function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState({});
  const [icon, setIcon] = useState("");
  const [bg, setBg] = useState("");
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });
  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thunderstorm);
        setBg(Thunder);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(weatherIcon.Drizzle);
        setBg(Rain);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        setBg(Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(weatherIcon.Snow);
        setBg(Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        setBg(Atmos);
        break;
      case rangeId === 800:
        setIcon(weatherIcon.Clear);
        setBg(Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(weatherIcon.Clouds);
        setBg(Cloudy);
        break;
      default:
        setIcon(weatherIcon.Clouds);
        setBg(Cloudy);
    }
  };

  const getForecastIcons = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        return weatherIcon.Thunderstorm;
      case rangeId >= 300 && rangeId <= 321:
        return weatherIcon.Drizzle;
      case rangeId >= 500 && rangeId <= 531:
        return weatherIcon.Rain;
      case rangeId >= 600 && rangeId <= 622:
        return weatherIcon.Snow;
      case rangeId >= 701 && rangeId <= 781:
        return weatherIcon.Atmosphere;
      case rangeId === 800:
        return weatherIcon.Clear;
      case rangeId >= 801 && rangeId <= 804:
        return weatherIcon.Clouds;
      default:
        return weatherIcon.Clouds;
    }
  };

  const geolocation = () => {
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(fetchData);
    }
  };

  const fetchData = async (position) => {
    const { latitude, longitude } = position?.coords;
    if (latitude && longitude) {
      const { data } = await axios.get(
        `${API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      setData(data);
      const { data: forecast } =
        await axios.get(`${API_URL}forecast?id=524901&lat=${latitude}&lon=${longitude}&appid=${API_KEY}
      `);
      setForecast(forecast);
    } else {
      const { data } = await axios.get(
        `${API_URL}weather?q=London&appid=${API_KEY}`
      );
      setData(data);
      const { data: forecast } =
        await axios.get(`${API_URL}forecast?id=524901&q=London&appid=${API_KEY}
    `);
      setForecast(forecast);
    }
  };

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((state) => ({ ...state, [name]: value }));
  };

  const handleSearch = async () => {
    if (search.country || search.city) {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${API_KEY}`
      );
      setData(data);
      const { data: forecast } =
        await axios.get(`${API_URL}forecast?id=524901&q=${search.city},${search.country}&appid=${API_KEY}
  `);
      setForecast(forecast);
    } else {
      geolocation();
    }
  };

  useEffect(() => {
    geolocation();
    fetchData();
  }, []);

  useEffect(() => {
    getWeatherIcon(weatherIcon, data?.weather?.[0]?.id);
  }, [data]);

  return (
    <StyledApp bg={bg}>
      <div className="search">
        <input
          name="city"
          type="text"
          placeholder="City"
          value={search.city}
          onChange={handleInputChange}
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={search.country}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSearch}>
          <AiOutlineSearch size={20} /> Search
        </button>
      </div>
      <div className="home">
        <h3 className="home__city">
          {data?.name}, {data?.sys?.country}
        </h3>
        <div className="home__inner-deg">
          <i className={`wi ${icon} display-1 home__icon`} />
          <h1 className="home__deg">
            {calCelsius(data?.main?.temp) ?? 0}&#186;C
          </h1>
        </div>
        <p className="home__description">{data?.weather?.[0]?.description}</p>
        <div className="home__temp">
          <h2>Maximum Temp: {calCelsius(data?.main?.temp_min) ?? 0}&#186;C</h2>
          <h2>Minimum Temp: {calCelsius(data?.main?.temp_max) ?? 0}&#186;C</h2>
        </div>
        <div className="home__info">
          <p>Feels like {calCelsius(data?.main?.feels_like) ?? 0}&#186;C</p>
          <p>Pressure {data?.main?.pressure ?? 0}hPa</p>
          <p>Humidity {data?.main?.humidity ?? 0}%</p>
          <p>Visibility {data?.visibility / 1000 ?? 0}km</p>
        </div>
      </div>
      <div className="forecast">
        {forecast?.list?.map((item) => (
          <div className="card">
            <h3>{moment(item?.dt_txt).format("ddd,MMM D")}</h3>
            <h2>
              {calCelsius(item?.main?.temp_max) ?? 0}/
              {calCelsius(data?.main?.temp_min) ?? 0}&#186;C
            </h2>
            <p>{item?.weather?.[0]?.description}</p>
            <i
              className={`wi ${getForecastIcons(
                weatherIcon,
                item?.weather?.[0]?.id
              )} display-1 card__icon`}
            />
          </div>
        ))}
      </div>
    </StyledApp>
  );
}

export default App;
