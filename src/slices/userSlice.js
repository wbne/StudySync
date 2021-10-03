import { createSlice } from '@reduxjs/toolkit'

/*
 * Stores the user data
 * Format: [USER_NAME]: [SUBJECTS]
 * 	   String     : String[]
 * Note that if the user is accessed before being added then it will return undefined, null, or something special
 */
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
    id: "",
  },
  reducers: {
    setUser: (state, data) => {
      state.value = data.payload
    },
    setUserId: (state, data) => {
     state.id = data.payload
    },
  },
})

export const { setUser, setUserId } = userSlice.actions

export default userSlice.reducer

