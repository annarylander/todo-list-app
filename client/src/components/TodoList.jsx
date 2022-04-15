import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";

export default function TodoList(props) {
  const todoList = props.todoList;
  const [completed, setCompleted] = useState(null);

  function finishTask() {
    setCompleted(<DoneIcon />);
  }

  return (
    <div className="">
      {todoList &&
        todoList.map((item, index) => {
          return (
            <div className="card" key={index}>
              <Link to={`/todo/${item._id}`}>
                <p>{item.task}</p>
              </Link>

              <p className="timestamp">
                {" "}
                {moment(item.published).format("MMM Do YY")}
              </p>
              <button onClick={finishTask}>Finish</button>
              <span>{completed}</span>
            </div>
          );
        })}
    </div>
  );
}
