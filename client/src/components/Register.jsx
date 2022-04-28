import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    const url = "http://localhost:8000/users";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(navigate("/login"));
  }

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <h2> Create account </h2>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
