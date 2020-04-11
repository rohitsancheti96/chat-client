import React, { useEffect, useRef } from "react";

function Messages({ messages }) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <div className="chat-messages">
      {messages.map((message, i) => (
        <div className="message" key={i}>
          <p className="meta">
            {message.username} <span>{message.time}</span>
          </p>
          <p className="text">{message.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
