import { createSlice } from '@reduxjs/toolkit'

const capitalizeName = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
}

// Slice
const slice = createSlice({
  name: 'adminReducer',
  initialState: {
    authenticated: false,
    name: '',
  },
  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.authenticated = action.payload.authenticated

      if (action.payload.firstName !== undefined) {
        state.name = `${capitalizeName(
          action.payload.firstName
        )} ${capitalizeName(action.payload.lastName)}`
      }
    },
  },
})
export default slice.reducer

// Actions
export const { setAuthenticatedUser } = slice.actions
