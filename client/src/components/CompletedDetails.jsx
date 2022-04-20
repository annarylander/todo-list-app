import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";

export default function CompletedDetails() {
  const [completed, setCompleted] = useState("Reset");
  const { _id } = useParams();
  const [data, setData] = useState("");
  const url = `http://localhost:8000/todo/completed/${_id}`;
  const token = localStorage.getItem("token");
  console.log(_id);

  useEffect(() => {
    fetchDetail();
  }, []);

  function resetTask() {
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
    fetch(`http://localhost:8000/todo/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  return (
    <>
      <div className="card-detail">
        <div className="content">
          <p>{data.task}</p>
          <p className="timestamp">
            {moment(data.published).format("MMM Do YY")}{" "}
          </p>
        </div>
        <div className="todo-button">
          <button onClick={resetTask}>{completed}</button>
        </div>
      </div>
    </>
  );
}
