import React from 'react'
import './infoBar.css'

export default function InfoBar({room}) {
  return (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img src='../icons/onlineIcon.png' alt="onlineImg" className="onlineIcon" style={{height:'10px', width:"10px"}} />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"> <img className='closeIcon' src='../icons/closeIcon.png' alt="closeImageIcon" style={{height:'10px', width:"10px"}} /> </a>
        </div>
    </div>
  )
}
