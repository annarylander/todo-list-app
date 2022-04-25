import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <Login />

      <Link to="/signup">
        <div className="register">
          <p> Don't have an account?</p>
          <button> Sign up </button>
        </div>
      </Link>
    </div>
  );
}
