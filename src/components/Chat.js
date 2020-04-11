import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { Link } from "react-router-dom";
import io from "socket.io-client";
import Messages from "./Messages";

let socket;

function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);

  const ENDPOINT = "https://react-chatrooms.herokuapp.com/";

  useEffect(() => {
    const { username, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    //Join chatRoom
    socket.emit("joinRoom", { username, room });

    //Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      setRoom(room);
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Emit message to server
    socket.emit("chatMessage", msg);
    setMsg("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> Chat Room
        </h1>
        <a href="/" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">{room}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            {users.map((user) => {
              return <li>{user.username}</li>;
            })}
          </ul>
        </div>
        <Messages messages={messages} />
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            value={msg}
            placeholder="Enter Message"
            required
            autoComplete="off"
            onChange={(event) => setMsg(event.target.value)}
          />
          <button onClick={handleSubmit} className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
