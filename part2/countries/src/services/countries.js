import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/'

const getAll = () => {
  return axios.get(`${baseUrl}all`)
}

const getListByName = (name) => {
  console.log('getListByName', `${baseUrl}name/${name}`)
  return axios.get(`${baseUrl}name/${name}`)
}

// commented may not be used in countries example
// const create = (newObject) => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

// const deletePerson = (id) => {
//   return axios.delete(`${baseUrl}/${id}`)
// }

export default {
  getAll,
  getListByName  
}
