import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      authenticated: false,
    },
    reducers: {
      signIn: (state) => {
        state.authenticated = true
      },
      signOut: (state) => {
        state.authenticated = false
      },
      
    },
  })

  export const {signIn,signOut} = authSlice.actions

  export default authSlice.reducer