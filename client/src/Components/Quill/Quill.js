import React , {useState} from 'react'
import './quill.css'

import "quill-mention";

import * as Emoji from "react-quill-emoji";
import "quill-emoji/dist/quill-emoji.css";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Quill({message , setMessage , sendMessage , users}) {
  let arr = [];
  for(let i = 0;  i < users.length ; i++){
    arr.push({text:`${users[i].name}` , value:`${users[i].name }`})
  }
  const handleClick = (e)=>{
    console.log(message)
    sendMessage(message);
    setMessage(message)
  }
  const modules = {
    toolbar: [
        ["bold", "italic", "strike"],
        ["blockquote", "code-block" , "code"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image", "video"],
        ["clean"],
    ],
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
    mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        source: function(searchTerm, renderList, mentionChar) {
          let values = arr;
          if (searchTerm.length === 0) {
            renderList(values, searchTerm);
          } else {
            const matches = [];
            for (let i = 0; i < values.length; i++)
              if (
                ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
              )
                matches.push(values[i]);
            renderList(matches, searchTerm);
          }
        }
      }
}
  return (
    <>
    <div className="form">
        <div className="tempWrapper">
          <div className="editorWrapper">
              <ReactQuill modules={modules} theme="snow" onChange={setMessage} placeholder="Content goes here..." />
          </div>
        </div>
        <div className="buttonWrapper">
          <button  className="sendButton" onClick={(e) => handleClick(e)}>Send</button>
        </div>
    </div>
    </>
  )
}
