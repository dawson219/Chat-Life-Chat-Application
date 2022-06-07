import React from 'react'
import './message.css'
import { LinkPreview } from '@dhaiwat10/react-link-preview';

export default function Message({message:{user , text} , name}) {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }

  return (
    isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText" dangerouslySetInnerHTML={{ __html: text }}></p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backGroundLight">
            {user === 'admin' 
            ? <p className="messageText colorDark" style={{marginTop:'5%'}} dangerouslySetInnerHTML={{ __html:text }}></p> 
            : <p className="messageText colorDark" dangerouslySetInnerHTML={{ __html:text }}></p>}
            </div>
            <p className="sentText pl-10" >{user}</p>
        </div>
    ) 
  )
}
