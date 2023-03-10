import personsService from '../services/persons'

export const PersonForm = ({
  setNewName,
  setNewNumber,
  newName,
  persons,
  newNumber,
  setPersons,
  setMessage,
  setErrorStatus
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
          setMessage(`New Person added ${res.data.name}`)
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
          .catch((err) => {
            setErrorStatus(true)
            setMessage(`${newName} no longer exists on the server`)
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
