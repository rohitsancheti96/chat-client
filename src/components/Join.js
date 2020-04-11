import React, { useState } from "react";
import { Link } from "react-router-dom";

function Join() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> Chat Rooms
        </h1>
      </header>
      <main className="join-main">
        <form>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <input
              type="text"
              name="room"
              id="room"
              placeholder="Enter room..."
              onChange={(event) => setRoom(event.target.value)}
              required
            />
          </div>
          <Link
            onClick={(event) =>
              !username || !room ? event.preventDefault() : null
            }
            to={`/chat?username=${username}&room=${room}`}
          >
            <button type="submit" className="btn">
              Join Chat
            </button>
          </Link>
        </form>
      </main>
    </div>
  );
}

export default Join;
