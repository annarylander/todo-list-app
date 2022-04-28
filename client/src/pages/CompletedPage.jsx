import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function CompletedPage() {
  const [completedList, setCompletedList] = useState();

  useEffect(() => {
    const url = "http://localhost:8000/todo/completed";
    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCompletedList(data.todos));
  }, []);

  if (!completedList) {
    return <p>Please log in</p>;
  }

  return (
    <div className="">
      {completedList &&
        completedList.map((item, index) => {
          return (
            <div className="card" key={index}>
              <Link to={`/todo/completed/${item._id}`}>
                <p>◦ {item.task}</p>
              </Link>
              <p className="timestamp">
                {moment(item.published).format("MMM Do YY")}
              </p>
            </div>
          );
        })}
    </div>
  );
}
