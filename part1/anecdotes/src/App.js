import React, { useState } from "react";

const Anecdote = (props) => (
  <>
    <p>{props.content}</p>
    <p>has {props.votes} votes</p>
  </>
);
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const mostVotes = points.reduce(
    ([prevIndex, prevValue], curValue, curIndex) =>
      curValue > prevValue ? [curIndex, curValue] : [prevIndex, prevValue],
    [-1, -1]
  )[0];
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote content={anecdotes[selected]} votes={points[selected]} />
      <input
        type="button"
        value="vote"
        onClick={() => {
          const newPoints = [...points];
          newPoints[selected] += 1;
          setPoints(newPoints);
        }}
      />
      <input
        type="button"
        value="next anecdote"
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      />
      <h2>Anecdote with most votes</h2>
      <Anecdote content={anecdotes[mostVotes]} votes={points[mostVotes]} />
    </div>
  );
};

export default App;
