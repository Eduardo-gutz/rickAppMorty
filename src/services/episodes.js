import axios from 'axios'

export const getEpisodes = async () => {
  const response = await axios.get('https://rickandmortyapi.com/api/episode/')

  return response.data
}

export const getEpisodesSearch = async (filter) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/episode/${filter}`)

  return response.data
}

export const getEpisodesById = async (ids) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/episode/${ids}`)

  return response.data
}
