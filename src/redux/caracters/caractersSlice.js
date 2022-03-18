import { createSlice } from '@reduxjs/toolkit'

export const caractersSlice = createSlice({
  name: 'caracters',
  initialState: {
    caracters: []
  },
  reducers: {
    setCaracters: (state, action) => {
      state.caracters.push(...action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCaracters } = caractersSlice.actions

export default caractersSlice.reducer
