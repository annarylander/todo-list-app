import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    const url = "http://localhost:8000/users/login";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/todo");
      });
  }

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="Password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
