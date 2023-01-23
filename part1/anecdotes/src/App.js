import { useState } from 'react'

const Buttons = ({ setSelected, anecdotes, setPoints, points, selected }) => {
  const addPointClicked = () => {
    const pointsCopy = [...points]
    if (pointsCopy[selected] > 0) {
      pointsCopy[selected] += 1
    } else {
      pointsCopy[selected] = 1
    }

    setPoints([...pointsCopy])
  }
  const NextAnecdoteClicked = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  return (
    <p>
      <button onClick={addPointClicked}>vote</button>
      &nbsp;
      <button onClick={NextAnecdoteClicked}>next anecdote</button>
    </p>
  )
}

const LikedAnecdote = ({ points, anecdotes }) => {
  const largest = points.indexOf(Math.max(...points))
  return (
    <>
      {anecdotes[largest]} has {points[largest]} votes
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length))
  console.log(points)
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points.</p>
      <Buttons
        setSelected={setSelected}
        anecdotes={anecdotes}
        setPoints={setPoints}
        points={points}
        selected={selected}
      />
      <LikedAnecdote points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App
