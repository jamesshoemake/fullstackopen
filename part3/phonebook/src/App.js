import { useState, useEffect } from 'react'

import personsService from './services/persons'

import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/PersonDisplay'
import { Notification } from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [errorStatus, setErrorStatus] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        type={'update'}
        setMessage={setMessage}
        errorStatus={errorStatus}
      />
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
          setMessage={setMessage}
          errorStatus={errorStatus}
          setErrorStatus={setErrorStatus}
        />
      </form>
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        errorStatus={errorStatus}
        setErrorStatus={setErrorStatus}
      />
    </div>
  )
}

export default App
