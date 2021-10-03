import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './slices/counterSlice'
import Button from '@material-ui/core/Button';
import Auth from './Auth'
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
	const column = {
		display: 'flex',
  		flexDirection: 'column',
  		flexBasis: '100%',
  		flex: '1',
	}
	const card = {
		width: '50%',
		marginLeft: '25%',
		minHeight: '50vh',
		marginTop: '10%',
		outline: '1px solid #5B94FF',
		padding: '20px',
	}
	const but = {
		padding: '10px',
		width: '25vw',
		margin: '20px',
	}	
	const pain = {
		width: '50%',
	}
	return(
		<>
		<NavBar />
		<div style={card}>
		<div style={pain}>
		<div style={column}>
			<Auth />
			<Button
				variant="outlined"
				onClick={() => dispatch(increment())}
			>
			Continue as a Guest</Button>
		</div>
		</div>
		</div>
		</>
	);

}

export default Onboarding
