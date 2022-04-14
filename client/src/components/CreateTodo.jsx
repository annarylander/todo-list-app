import React, { useState } from "react";

export default function PostCreate(props) {
  const [task, setTask] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { task };
    const url = "http://localhost:8000/todos";
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => props.onSuccess());
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Add a todo</label>

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
