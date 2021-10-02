import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Jutsu } from 'react-jutsu'

export default function JitsiPage() {
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

  return(call ? (
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
}
