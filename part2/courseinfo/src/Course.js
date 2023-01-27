const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = ({ parts }) => {
  const partsEls = parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ))
  return <>{partsEls}</>
}

const Total = ({ parts }) => {
  const count = parts.reduce((sum, p) => (sum += p.exercises), 0)
  return (
    <p>
      <strong>Total of {count} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
  // definitely a better way do this, but I wanted to see if it would work.
  const courseElements = course.map((c) => (
    <div key={c.id}>
      <Header name={c.name} />
      <Content parts={c.parts} />
      <Total parts={c.parts} />
    </div>
  ))
  return <>{courseElements}</>
}

export default Course
