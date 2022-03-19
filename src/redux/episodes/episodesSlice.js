import { createSlice } from '@reduxjs/toolkit'

export const episodesSlice = createSlice({
  name: 'caracters',
  initialState: {
    episodes: [],
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: ''
    }
  },
  reducers: {
    setEpisodesInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload }
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload
    },
    addEpisodes: (state, action) => {
      state.episodes.push(...action.payload)
    }
  }
})

export const { setEpisodesInfo, addEpisodes, setEpisodes } = episodesSlice.actions

export default episodesSlice.reducer
