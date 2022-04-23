import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { query };
    const url = "http://localhost:8000/todo/search";
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => setResult(data.results));
  }

  return (
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>

      {result &&
        result.map((item, index) => {
          return (
            <div className="card" key={index}>
              <p>◦ {item.task}</p>
            </div>
          );
        })}
    </>
  );
}
