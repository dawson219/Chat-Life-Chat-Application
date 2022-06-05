import React from 'react'
import './infoBar.css'

export default function InfoBar({room}) {
  return (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img src='../icons/onlineIcon.png' alt="onlineImg" className="onlineIcon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"> <img src='../icons/closeIcon.png' alt="closeImageIcon" /> </a>
        </div>
    </div>
  )
}
