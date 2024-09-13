import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = import.meta.env.openweathermapAPIKEY

export const getWeather = (lat, lon) => {
  return axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
}

export default {
  getWeather: getWeather,
}
