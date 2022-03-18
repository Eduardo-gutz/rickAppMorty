import axios from 'axios'
import { protagonists } from '../enviroments/characters'

export const getPrincipalCharacters = async () => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${protagonists}`)

  return response.data
}

export const getCharacters = async (ids) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${ids}`)

  return response.data
}
export const getCharactersSearch = async (filters) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${filters}`)

  return response.data
}
