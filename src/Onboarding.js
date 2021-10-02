import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './slices/counterSlice'
import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import NavBar from "./NavBar";

/*
 * Component that allows users to either sync their google account or continue as a guest.
 * If they use a google account then check if there is data, if there is not, continue the form as if they were a guest.
 * 	If there is data then go straight to the Jitsi page
 *
 * returns: two buttons
 */
const Onboarding = () => {
	const dispatch = useDispatch()
	return(
		<>
			<NavBar />

			<Button variant="outlined">Log in with Google</Button>
			<Button 
				variant="outlined"
				onClick={() => dispatch(increment())}
			>
			Continue as a Guest</Button>
		</>
	);

}

export default Onboarding
