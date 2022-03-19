import axios from 'axios'

export const getLocation = async (id) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)

  return response.data
}
