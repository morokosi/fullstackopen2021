import React from "react";
import Part from "./Part";

const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part name={part.name} exercises={part.exercises} key={part.id} />
    ))}
  </>
);

export default Content;
