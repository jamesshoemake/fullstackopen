import { useState } from 'react'

const Filter = ({ persons, setFilteredPersons }) => {
  const onChangeFilter = (e) => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }
  return (
    <div>
      filter shown with <input onChange={(e) => onChangeFilter(e)} />
    </div>
  )
}

const PersonForm = ({
  setNewName,
  setNewNumber,
  newName,
  persons,
  newNumber,
  setPersons
}) => {
  const onChangeName = (e) => {
    setNewName(e.target.value)
  }

  const onNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const isSamePerson = (persons) => {
    return persons.find((person) => person.name === newName)
  }

  const onClickAddName = (e) => {
    e.preventDefault()

    if (!isSamePerson(persons)) {
      setPersons([...persons, { name: newName, number: newNumber }])
    } else {
      alert(`${newName} already exists in the phonebook`)
    }
  }

  return (
    <>
      <div>
        name: <input onChange={(e) => onChangeName(e)} />
      </div>
      <div>
        number: <input onChange={(e) => onNumberChange(e)} />
      </div>
      <div>
        <button type='submit' onClick={onClickAddName}>
          add
        </button>
      </div>
    </>
  )
}

const Persons = ({ filteredPersons }) => {
  console.log(filteredPersons)

  const filteredDisplay = filteredPersons.map((person) => (
    <li key={person.name}>
      {person.name}
      &nbsp;
      {person.number}
    </li>
  ))

  return filteredDisplay
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([...persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
        <h2>Add New</h2>
        <PersonForm
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          newName={newName}
          persons={persons}
          newNumber={newNumber}
          setPersons={setPersons}
        />
      </form>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} persons={persons} />
    </div>
  )
}

export default App
