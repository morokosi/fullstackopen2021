import React from "react";

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts.reduce((prev, cur) => prev + cur.exercises, 0)}
  </p>
);

export default Total;
