import Axios from "axios";

const baseURL = "https://community-open-weather-map.p.rapidapi.com/weather";

const axios = Axios.create({ baseURL, withCredentials: true, timeout: 20000 });

axios.interceptors.request.use((configs) => {
  return configs;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use((configs) => {
  return configs;
});

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
