import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          {" "}
          <h1>Todo-list</h1>
        </Link>
        <div className="links">
          <Link to="/todo"> All todos</Link>
          <Link to="/todo/completed"> Completed</Link>
          <Link to="/todo/search"> Search</Link>

          <Logout />
        </div>
      </nav>
    </div>
  );
}
