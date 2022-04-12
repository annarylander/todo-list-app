import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <Login />

      <Link to="/signup">
        <button className="register"> Skapa konto</button>
      </Link>
    </div>
  );
}
