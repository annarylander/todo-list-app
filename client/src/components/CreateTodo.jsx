import React, { useState } from "react";

export default function PostCreate(props) {
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { task, detail };
    const url = "http://localhost:8000/todo";
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
          placeholder="todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="details"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
