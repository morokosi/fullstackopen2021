import React from "react";

const Persons = (props) => (
  <ul>
    {props.persons
      .filter(
        (person) =>
          props.filter === "" ||
          person.name.toLowerCase().includes(props.filter.toLowerCase())
      )
      .map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <input
            type="button"
            value="delete"
            onClick={() => props.onPersonDelete(person.id)}
          />
        </li>
      ))}
  </ul>
);

export default Persons;
