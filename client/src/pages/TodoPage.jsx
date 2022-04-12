import React from "react";
import TodoList from "../components/TodoList";
import CreateTodo from "../components/CreateTodo";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import Logout from "../components/Logout";

export default function TodoPage() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      {user}
      <CreateTodo />
      <TodoList />
      <Logout />
    </div>
  );
}
