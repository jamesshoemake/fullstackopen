import { useState, useEffect } from 'react'
import personsService from './services/persons'

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
      personsService
        .create({ name: newName, number: newNumber })
        .then((res) => {
          console.log('person added', res)
          setPersons([...persons, { ...res.data }])
        })
    } else {
      if (
        window.confirm(
          `${newName} already exists in the phonebook, replace old number?`
        )
      ) {
        personsService
          .update(isSamePerson(persons).id, {
            name: newName,
            number: newNumber
          })
          .then((res) => {
            console.log('person number updated', res.data)
            const personsFilteredCopy = persons.filter(
              (person) => person.id !== res.data.id
            )
            setPersons([...personsFilteredCopy, { ...res.data }])
          })
      }
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

const DeleteBtn = ({ person, persons, setPersons }) => {
  const onClickDelete = (e) => {
    e.preventDefault()
    if (window.confirm('Delete?')) {
      personsService.deletePerson(person.id).then((res) => {
        console.log('person deleted', person.id)
        setPersons(persons.filter((p) => p.id !== person.id))
      })
    }
  }
  return (
    <>
      <button onClick={onClickDelete}>Delete</button>
    </>
  )
}

const Persons = ({ persons, filteredPersons, setPersons }) => {
  let localPersons = filteredPersons
  if (filteredPersons.length === 0) {
    localPersons = persons
  }

  const filteredDisplay = localPersons.map((person) => (
    <li key={person.name}>
      {person.name}
      &nbsp;
      {person.number}
      &nbsp;
      <DeleteBtn person={person} persons={persons} setPersons={setPersons} />
    </li>
  ))

  return filteredDisplay
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

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
      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
