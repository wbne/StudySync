import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import subjectReducer from './slices/subjectSlice'

/*
 * The redux storage of the project.
 */
export default configureStore({
	reducer: {
		counter: counterReducer,
		subject: subjectReducer,
	},
})

