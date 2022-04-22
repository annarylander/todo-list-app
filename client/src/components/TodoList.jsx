import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function TodoList(props) {
  const todoList = props.todoList;
  // const id = todoList.map((item, index) => {
  //   return item._id;
  // });

  // console.log(id);
  // const url = `http://localhost:8000/todo/${id}`;
  // const token = localStorage.getItem("token");

  // function finishTask() {
  //   fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => console.log("completed"));
  // }

  return (
    <div className="">
      {todoList &&
        todoList.map((item, index) => {
          return (
            <div className="card" key={index}>
              <Link to={`/todo/${item._id}`}>
                <p>◦ {item.task}</p>
              </Link>
              <p className="timestamp">
                {" "}
                {moment(item.published).format("MMM Do YY")}
              </p>
              {/* <button onClick={finishTask(item)}>Remove</button> */}
            </div>
          );
        })}
    </div>
  );
}
