import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditTodo(props) {
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const { _id } = useParams();

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { task, detail };
    const url = `http://localhost:8000/todo/${_id}`;
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
      .then((data) => console.log(data));
  }

  return (
    <div>
      <form>
        <label>Edit</label>
        <input
          type="text"
          placeholder="task"
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
