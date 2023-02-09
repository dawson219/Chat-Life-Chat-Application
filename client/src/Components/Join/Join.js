import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './join.css'

export default function Join() {
  const [name , setName] = useState("");
  const [room , setRoom] = useState("general");


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chat-Life</h1>
        <div><input type="text" placeholder='Enter Username...' className='joinInput' onChange={(event)=>setName(event.target.value)} /></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Join</button>
        </Link>
      </div>
    </div>
  )
}
