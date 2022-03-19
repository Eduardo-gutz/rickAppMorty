import { configureStore } from '@reduxjs/toolkit'
import charactersSlice from './characters/charactersSlice.js'
import episodesSlice from './episodes/episodesSlice'

export default configureStore({
  reducer: {
    characters: charactersSlice,
    episodes: episodesSlice
  }
})
