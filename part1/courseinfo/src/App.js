const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = ({ part }) => {
  console.log('part', part)
  const { name, exercises } = part
  console.log(name, exercises)
  return (
    <>
      <h2>{name}</h2>
      <p>
        There are{' '}
        <u>
          <b>{exercises}</b>
        </u>{' '}
        exercises in this part of the course.
      </p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
}

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
