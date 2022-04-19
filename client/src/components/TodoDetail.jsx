import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";

export default function TodoDetail() {
  const [completed, setCompleted] = useState("Finish");
  const { _id } = useParams();
  const [detail, setDetail] = useState("");
  const url = `http://localhost:8000/todo/${_id}`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetail(data));
  }, []);

  function finishTask(id) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log("completed"));
    setCompleted(<DoneIcon />);
  }

  return (
    <div className="card-detail">
      <div className="content">
        <p>{detail.task}</p>
        <p>{detail.detail}</p>
        <p className="timestamp">
          {" "}
          {moment(detail.published).format("MMM Do YY")}
        </p>
      </div>
      <div className="todo-button">
        <button onClick={finishTask}>{completed}</button>
        <button>Edit</button>
        <span></span>
      </div>
    </div>
  );
}
