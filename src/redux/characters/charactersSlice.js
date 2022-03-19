import { createSlice } from '@reduxjs/toolkit'

export const charactersSlice = createSlice({
  name: 'caracters',
  initialState: {
    characters: [],
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: ''
    }
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = {...state.info, ...action.payload}
    },
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    addCharacters: (state, action) => {
      state.characters.push(...action.payload);
      state.characters.sort((charA, charB) => charA.id > charB.id ? 1 : -1)
    }
  }
})

export const { setCharacters, addCharacters, setInfo } = charactersSlice.actions

export default charactersSlice.reducer
