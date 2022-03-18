import { configureStore } from '@reduxjs/toolkit'
import caractersSlice from './caracters/caractersSlice.js'

export default configureStore({
  reducer: {
    caracters: caractersSlice
  }
})
