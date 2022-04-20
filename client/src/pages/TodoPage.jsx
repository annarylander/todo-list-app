import React, { useState, useEffect, useContext } from "react";
import TodoList from "../components/TodoList";
import CreateTodo from "../components/CreateTodo";
import UserContext from "../context/UserContext";

export default function TodoPage() {
  const { user, setUser } = useContext(UserContext);
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    const url = "http://localhost:8000/todo";
    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
  }

  if (!todoList) {
    return <p>No todos added</p>;
  }

  return (
    <div className="container">
      {user}
      <CreateTodo onSuccess={fetchTodos} />
      <TodoList todoList={todoList} />
    </div>
  );
}
