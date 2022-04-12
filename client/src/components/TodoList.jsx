import React, { useState, useEffect } from "react";
import moment from "moment";

export default function TodoList() {
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    const url = "http://localhost:8000/todos";
    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
  }, []);

  return (
    <div className="container">
      {todoList &&
        todoList.map((item, index) => {
          return (
            <div className="card" key={index}>
              <p>{item.task}</p>
              <p className="timestamp"> {moment(item.published).fromNow()}</p>
            </div>
          );
        })}
    </div>
  );
}
