const Notification = ({ message, type }) => {
  if (!message || message.empty) {
    return null
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '16px',
    fontStyle: 'italic',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={type === 'success' ? successStyle : errorStyle}>{message}</div>
  )
}

export default Notification
