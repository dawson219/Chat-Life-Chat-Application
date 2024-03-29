import React from 'react'
import './chat.css'
import { useState , useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import QuillEditor from '../QuillEditor/QuillEditor'

let socket;

export default function Chat() {
  const location = useLocation();
  const [name , setName] = useState("");
  const [room , setRoom] = useState("");
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  // const ENDPOINT = 'localhost:5000';
  const ENDPOINT = 'https://chatlife.onrender.com';

  useEffect(()=>{
    const {name , room} = queryString.parse(location.search)
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit('join' , {name , room} , ()=>{
    });
    return ()=>{
      socket.emit('remove');

      socket.off();
    }
  } , [ENDPOINT , location.search])

  useEffect(()=>{
    socket.on('message' , (message)=>{
      setMessages([...messages , message]);
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  } , [messages])

  const sendMessage = (event)=>{
    if(message){
      socket.emit('sendMessage' , message , ()=>setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room = {room}/>
        <Messages messages = {messages} name = {name}/>
        <QuillEditor users={users} message = {message} setMessage = {setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}
