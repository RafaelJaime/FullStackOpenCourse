import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Notification from './alert/alert'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [isError, setError] = useState(true)

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons
  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])
  const addPerson = event => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : response.data
              )
            )
            setErrorMessage(`Updated ${existingPerson.name}`)
            setError(false)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            setErrorMessage('Error while updating the person')
            setError(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    personsService
      .create(personObject)
      .then(() => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Created ${personObject.name}`)
        setError(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage('Error while adding the person')
        setError(true)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const deletePerson = person => {
    if (confirm(`Are you sure you want to remove ${person.name}`)) {
      personsService
        .delete(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setErrorMessage(`removed ${person.name}`)
          setError(false)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage('Error while deleting the person')
          setError(true)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage}
        type={isError ? 'error' : 'success'}
      />
      <div>
        filter show with
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default App
