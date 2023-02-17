import personsService from '../services/persons'

const DeleteBtn = ({
  person,
  persons,
  setPersons,
  setMessage,
  setErrorStatus
}) => {
  const onClickDelete = (e) => {
    e.preventDefault()
    if (window.confirm('Delete?')) {
      personsService
        .deletePerson(person.id)
        .then((res) => {
          console.log('person deleted', person.id)
          setErrorStatus(false)
          setMessage(`${person.name} was deleted`)
          setPersons(persons.filter((p) => p.id !== person.id))
        })
        .catch((err) => {
          setErrorStatus(true)
          setMessage(`${err}`)
        })
    }
  }
  return (
    <>
      <button onClick={onClickDelete}>Delete</button>
    </>
  )
}

export const Persons = ({
  persons,
  filteredPersons,
  setPersons,
  setMessage,
  setErrorStatus
}) => {
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
      <DeleteBtn
        person={person}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorStatus={setErrorStatus}
      />
    </li>
  ))

  return filteredDisplay
}
