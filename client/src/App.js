import { useState, useMemo } from "react";
import { UserProvider } from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import CompletedPage from "./pages/CompletedPage";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/todo/completed" element={<CompletedPage />} />
          <Route path="/todo/:userId" element={<TodoPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
