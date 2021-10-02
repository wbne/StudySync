import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Jutsu } from 'react-jutsu'
import Onboarding from './Onboarding'
import Subjects from './Subjects'

/*
 * Primary component that retrieves the page number from storage and sets the rendered page accordingly.
 * Also is the container of all the smaller components.
 *
 * returns: JSX component that is rendered as a complete HTML page
 */
export default function App() {
  //TODO: Clean these states up. Probably will put into an object
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const pageNum = useSelector((state) => state.counter.value)

  /*
   * Sets the call state for when the join room button is pressed
   */
  const handleJitsiClick = event => {
    event.preventDefault()
    if (room && name) setCall(true)
  }
  
  //TODO: Maybe clean each page up?
  /*
   * page represents the page data
   * pageNum is the page number the user is on and is stored as a global state
   * switch statement allows us to mimic changing pages
   */
  var page
  switch(pageNum){
	case 0: page = <Onboarding />; break;
	case 1: page = <Subjects />; break;
	case 2: page = (call ? (
   	   <Jutsu
   	     roomName={room}
   	     displayName={name}
   	     password={password}
   	     onMeetingEnd={() => console.log('Meeting has ended')}
   	     loadingComponent={<p>loading ...</p>}
   	     errorComponent={<p>Oops, something went wrong</p>} />
   	   ) : (
   	   <form>
   	     <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
   	     <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
   	     <button onClick={handleJitsiClick} type='submit'>
   	       Start / Join
   	     </button>
   	   </form>
   	 )
	);
	break;
	default: page = <>The page could not be found.</>; break;
  }
  return (page)

}

