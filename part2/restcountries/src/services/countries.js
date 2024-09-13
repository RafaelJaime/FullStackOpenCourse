import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

export const getAll = () => {
  return axios.get(baseUrl + 'all')
}

export const getByName = name => {
  return axios.get(baseUrl + `name/${name}`)
}
export default {
  getAll: getAll,
  getByName: getByName,
}
