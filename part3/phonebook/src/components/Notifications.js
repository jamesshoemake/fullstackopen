export const Notification = ({ message, setMessage, errorStatus }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const changeStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  let msgStyle
  if (errorStatus) {
    msgStyle = errorStyle
  } else {
    msgStyle = changeStyle
  }

  if (message === null || message === '') {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return <div style={msgStyle}>{message}</div>
}
