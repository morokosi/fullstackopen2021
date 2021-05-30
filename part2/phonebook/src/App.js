import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/persons";
import Notification from "./Notification";
const App = () => {
  const [persons, setPersons] = useState([
    /*
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
    */
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ message: null, isError: false });
  const showNotification = (message, isError = false) => {
    setMessage({ message, isError });
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res.data));
  }, []);
  const onSubmit = (e) => {
    const existing = persons.find((person) => person.name === newName);
    if (existing) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        personService
          .update(existing.id, {
            ...existing,
            number: newNumber,
          })
          .then(() => personService.getAll())
          .then((res) => {
            setPersons(res.data);
            showNotification(`Changed ${existing.name}`);
          });

        setNewNumber("");
        setNewNumber("");
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(() => personService.getAll())
        .then((res) => {
          setPersons(res.data);
          showNotification(`Added ${newName}`);
        });
      setNewName("");
      setNewNumber("");
    }
    e.preventDefault();
  };
  const onPersonDelete = (id) => {
    const toDelete = persons.find((person) => person.id === id);
    if (toDelete !== undefined && window.confirm(`Delete ${toDelete.name} ?`)) {
      personService
        .delete(id)
        .then(() => personService.getAll())
        .then((res) => setPersons(res.data))
        .catch((e) => {
          if (e.response.status === 404) {
            showNotification(
              `Information of ${toDelete.name} has already been removed from server`,
              true
            );
          } else {
            throw e;
          }
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...message} />
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={onSubmit}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        onPersonDelete={onPersonDelete}
      />
    </div>
  );
};

export default App;
