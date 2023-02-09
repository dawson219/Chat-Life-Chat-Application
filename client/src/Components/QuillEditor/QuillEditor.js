import React, { useState } from "react";
import "./quill.css";

import "quill-mention";

import * as Emoji from "react-quill-emoji";
import "quill-emoji/dist/quill-emoji.css";

import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

export default function QuillEditor({
  message,
  setMessage,
  sendMessage,
  users,
}) {
  let arr = [];
  for (let i = 0; i < users.length; i++) {
    arr.push({ text: `${users[i].name}`, value: `${users[i].name}` });
  }
  const handleClick = (e) => {
    e.preventDefault()
    sendMessage();
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "strike"],
      ["blockquote", "code-block", "code"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function (searchTerm, renderList, mentionChar) {
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
      },
    },
  };


  return (
    <>
      <form className="form" onSubmit={(e)=>{handleClick(e)}}>
        <div className="tempWrapper">
          <div className="editorWrapper">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={message}
              onChange={(e) => {
                setMessage(e)
              }}
              placeholder="Content goes here..."
              preserveWhitespace
            />
          </div>
        </div>
        <div className="buttonWrapper">
          <button type="submit" className="sendButton">
            Send
          </button>
        </div>
      </form>
    </>
  );
}
