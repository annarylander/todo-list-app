import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

export default function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);
  const [detail, setDetail] = useState("");

  useEffect(() => {
    const url = `http://localhost:8000/todo/${_id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetail(data));
  }, []);

  return (
    <div className="card">
      <p>{detail.task}</p>
      <p>{detail.detail}</p>
      <p className="timestamp">
        {" "}
        {moment(detail.published).format("MMM Do YY")}
      </p>
    </div>
  );
}
