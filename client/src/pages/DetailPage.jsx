import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";
import EditTodo from "../components/EditTodo";

export default function TodoDetail() {
  const [completed, setCompleted] = useState("Finish");
  const { _id } = useParams();
  const [data, setData] = useState("");
  const url = `http://localhost:8000/todo/${_id}`;
  const token = localStorage.getItem("token");
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    fetchDetail();
  }, []);

  function finishTask() {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log("completed"));
    setCompleted(<DoneIcon />);
  }

  function fetchDetail() {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { task, detail };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => fetchDetail());
  }

  return (
    <>
      <div className="card-detail">
        <div className="content">
          <p>{data.task}</p>
          <p>{data.detail}</p>
          <p className="timestamp">
            {" "}
            {moment(data.published).format("MMM Do YY")}
          </p>
        </div>
        <div className="todo-button">
          <button onClick={finishTask}>{completed}</button>
          <button>Edit</button>
        </div>
      </div>
      <form onSubmit={handleOnSubmit}>
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
    </>
  );
}
