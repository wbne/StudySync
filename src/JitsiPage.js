import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Jutsu } from 'react-jutsu'
import NavBar from './NavBar'

const NICKNAMES = ["Dog", "Cat", "Lizard", "Snake", "Bird", "Fish", "Chicken", "Horse", "Monkey", "Unicorn", "Dragon"]
const BACKEND_URL = "http://hackdfwbackend-env.eba-5mcqjniz.us-east-2.elasticbeanstalk.com/"

/*
 * Jitsi page which connects users to a room based on their preferences.
 * Uses data entered in the previous page to match and connect.
 */
export default function JitsiPage() {
  const dispatch = useDispatch()
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const pageNum = useSelector((state) => state.counter.value)
  const userData = useSelector((state) => state.user.value)
  const id = useSelector((state) => state.user.id)
  const funZone = userData[Object.keys(userData)[0]][Math.floor(Math.random() * userData[Object.keys(userData)[0]].length)]
  if(!call) {
	setRoom("hackdfw2021" + funZone)
	setName(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)])
	setCall(true)
  }
  	var roomID
	const back = () => { new XMLHttpRequest();
        back.open( "GET", BACKEND_URL + "subject/" + funZone, true);
        back.onload = function() {
                const response = JSON.parse(this.response)
                if(back.request < 200 || back.request >= 400) {
                        console.log("ohno")
                        return
                }
	if(response != 0 && !call) {
			roomID = response
			const anger = new XMLHttpRequest();
			anger.open("GET", BACKEND_URL + "room/" + roomID, true);
			anger.onload = function() {
			const peko = JSON.parse(this.response)
			setRoom(peko["name"])
			setName(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)])
			setCall(true)
		}
		anger.send()
		}
               }
		back.send()
	}
	

  return(call ? (
	   <div>
	     <NavBar />
   	     <Jutsu
               containerStyles={{ width: '100%', minHeight: '95vh', overflow:'hidden', }}
   	       roomName={room}
   	       displayName={name}
   	       password={password}
   	       onMeetingEnd={() => console.log('Meeting has ended')}
   	       loadingComponent={<p>loading ...</p>}
   	       errorComponent={<p>Oops, something went wrong</p>} />
	   </div>
   	   ) : (
		   <>loading...</>
   	 )
	);
}
