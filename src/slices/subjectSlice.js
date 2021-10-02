import { createSlice } from '@reduxjs/toolkit'

/*
 * Stores the subjects the user wishes to study for.
 * Format: [SUBJECT_NAME]: [CHECKED]
 * 	   String        : boolean
 * Note that if a subject is accessed before being added then it will return undefined, null, or something special
 */
export const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    value: {},
  },
  reducers: {
    addSubject: (state, subject) => {
      state.value[subject.payload] = true
    },
    removeSubject: (state, subject) => {
      state.value[subject.payload] = false
    },
  },
})

export const { addSubject, removeSubject } = subjectSlice.actions

export default subjectSlice.reducer

