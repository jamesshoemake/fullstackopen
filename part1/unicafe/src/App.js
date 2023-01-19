import { useState } from 'react'

const Button = ({ reviewType, setType, feedbackType }) => {
  const onClick = () => {
    setType(feedbackType + 1)
  }
  return <button onClick={onClick}>{reviewType}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all / 3
  const positive = good / all
  if (all !== 0) {
    return (
      <>
        <h2>Stats</h2>
        <table>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </table>
      </>
    )
  } else
    return (
      <>
        <h2>Stats</h2>
        <p>No Feedback Given</p>
      </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button reviewType={'good'} setType={setGood} feedbackType={good} />
      <Button
        reviewType={'neutral'}
        setType={setNeutral}
        feedbackType={neutral}
      />
      <Button reviewType={'bad'} setType={setBad} feedbackType={bad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
