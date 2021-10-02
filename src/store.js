import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import subjectReducer from './slices/subjectSlice'
import userReducer from './slices/userSlice'

/*
 * The redux storage of the project.
 */
export default configureStore({
	reducer: {
		counter: counterReducer,
		subject: subjectReducer,
		user: userReducer,
	},
})

