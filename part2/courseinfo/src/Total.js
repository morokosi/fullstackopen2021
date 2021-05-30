import React from "react";

const Total = (props) => (
  <p>
    <b>
      total of {props.parts.reduce((prev, cur) => prev + cur.exercises, 0)}{" "}
      exercises
    </b>
  </p>
);

export default Total;
