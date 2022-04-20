import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";

export default function TodoDetail() {
  const [completed, setCompleted] = useState("Finish");
  const { _id } = useParams();
  const [data, setData] = useState("");
  const url = `http://localhost:8000/todo/${_id}`;
  const token = localStorage.getItem("token");
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState("");

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

  function updateTodo(e) {
    const formData = new FormData();
    formData.append("task", task);
    formData.append("detail", detail);
    formData.append("file", file);
    e.preventDefault();
    console.log(formData.get("file"));

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => fetchDetail());
  }

  function removeFile() {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log("file removed"));
  }

  return (
    <>
      <div className="card-detail">
        <div className="content">
          <h3>Task</h3>
          <p>{data.task}</p>
          <h3> Details: </h3>
          <p>{data.detail}</p>
          <h3>Files </h3>
          {data.file &&
            data.file.map((item, index) => {
              return (
                <div className="uploads" key={index}>
                  <li>{item.split("/")[4]}</li>
                  <button onClick={removeFile}>Remove</button>
                </div>
              );
            })}
          <p className="timestamp">
            {moment(data.published).format("MMM Do YY")}{" "}
          </p>
        </div>
        <div className="todo-button">
          <button onClick={finishTask}>{completed}</button>
        </div>
      </div>
      <form onSubmit={updateTodo} encType="multipart/form-data">
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
        <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
