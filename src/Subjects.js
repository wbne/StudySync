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
const SUBJECTS = ["Algebra", "Biology", "History", "English", "Chemistry", "Computer Science", "Geometry", "Physics", "Statistics"]
const BACKEND_URL = "http://hackdfwbackend-env.eba-5mcqjniz.us-east-2.elasticbeanstalk.com/user/"

/*
 * Generates a random 40 character string
 * Returns a string which is the random ID
 */
function makeID() {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   for ( var i = 0; i < 40; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 52));
   }
   return result;
}

/*
 * Checks if the user has selected at least one subject
 * If the requirement has been met then the page will load the next page
 */
function checkLength(dispatch, subj, id) {
	var temp = Object.keys(subj)
	var count = 0
	var data = {}
	var subjArray = []
	var subjString = "" 

	for(var i = 0; i < temp.length; i++) {
		if(subj[temp[i]]){
			count++
			subjArray.push(temp[i])
			subjString += temp[i] + ","
		}
	}
	if(subjString.length > 0) {
		subjString = subjString.substring(0, subjString.length - 1)
	}
	if(count > 0) {
		dispatch(increment())
		dispatch(setUser({[id]: subjArray}))

		const back = new XMLHttpRequest();
                back.open( "GET", BACKEND_URL + id + "/" + subjString, true); // false for synchronous request
                back.onload = function() {
                        const response = this.response
                        if(back.request < 200 || back.request >= 400) {
                                console.log("ohno")
                                return
                        }
			//code goes here
			console.log(response)
                }
                back.send();
		return
	}
	alert("Please select at least one subject!")
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

	const column = { 
                display: 'flex',
                flexDirection: 'column',
                flexBasis: '100%',
                flex: '1',
        }
        const card = { 
                width: '50%',
                marginLeft: '25%',
                minHeight: '30vh',
                marginTop: '5%',
                outline: '1px solid #5B94FF',
                padding: '20px',
                overflow: 'hidden',
        }
        const pain = {
                width: '50%',
                float: 'left',
                maxHeight: '50vh',
        }

 
  if(id.length == 0) {
	id = makeID()
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
	<div style={card}>
      	  <NavBar />
	    <div style={pain}>
  	    <p>Please select the study subjects</p>
		<div style={{maxHeight:'35vh',overflow:'scroll',}}>
  	    <FormGroup column="true">
  		      {subjBoxes()}
  	    </FormGroup>
	    </div>
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
	    </div>
	</div>
    </>
  );
}

