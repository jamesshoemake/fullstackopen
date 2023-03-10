export const Filter = ({ persons, setFilteredPersons }) => {
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
