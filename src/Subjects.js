import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSubjects, addSubject } from './slices/subjectSlice'
import { increment, decrement } from './slices/counterSlice'
import { setUser } from './slices/userSlice'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NavBar from "./NavBar";

//Hardcoded subjects which will make presentation and demonstration easier and cleaner
const SUBJECTS = ["math", "sci", "hist", "eng", "lunch"]

/*
 * Checks if the user has selected at least one subject
 * If the requirement has been met then the page will load the next page
 */
function checkLength(dispatch, subj, id) {
	var temp = Object.keys(subj)
	var count = 0
	var data = {}
	var subjArray = []
	for(var i = 0; i < temp.length; i++) {
		if(subj[temp[i]]){
			count++
			subjArray.push(temp[i])
		}
	}
	if(count > 0) {
		dispatch(increment())
		dispatch(setUser({[id]: subjArray}))
		return
	}
	return
}

/*
 * Presents a list of subjects and asks the user to select the topics they would like to study for.
 * The selected data is stored as an object in the redux storage in the following format:
 * 	[SUBJECT_NAME]: [CHECKED]
 * 	String        :  boolean
 *
 * Returns a list of checkboxes and some text
 */
export default function Subjects() {
  const checked = useSelector((state) => state.subject.value)
  var id = useSelector((state) => state.user.id)
  const dispatch = useDispatch()
 
  if(id.length == 0) {
	id = "TEMP"
  }

  const handleChange = (event) => {
    dispatch(addSubject(event.target.value))
  };

  /*
   * Returns JSX Checkbox objects from a string array
   */
  const subjBoxes = () => {
	var list = []
	SUBJECTS.forEach((value) => list.push(<FormControlLabel 
		key={value+value}
		control={
			<Checkbox
				checked={checked.value}
				value={value}
				onChange={handleChange}
				name={value}
				key={value}
			/>
		} 
		label={value}/>));
	return list
  };

  return (
    <>
        <NavBar />
      <p>Please select the study subjects</p>
      <FormGroup column="true">
  	      {subjBoxes()}
      </FormGroup>
      <Button 
	      variant="outlined"
	      onClick={() => dispatch(decrement())}
      >
	      Back
      </Button>
      <Button 
	      variant="outlined"
	      onClick={() => checkLength(dispatch, checked, id)}
      >
	      Next
      </Button>
      
    </>
  );
}

