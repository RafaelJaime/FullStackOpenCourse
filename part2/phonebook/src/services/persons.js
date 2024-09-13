import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = personId => {
  return axios.delete(`${baseUrl}/${personId}`)
}

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
}
export default {
  getAll: getAll,
  create: create,
  delete: deletePerson,
  update: updatePerson,
}
