import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import AddContact from './components/AddContact'
import List from './components/List'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNameNumber = (event) => {
    event.preventDefault()
    const nameCheck = persons.filter(person => Object.values(person).indexOf(newName) > -1)
    const numberCheck = persons.filter(person => Object.values(person).indexOf(newNumber) > -1)

    if (numberCheck.length > 0) {
      window.alert(`${newNumber} has already been added to the phonebook.`)
    } else if (nameCheck.length > 0) {
      const duplicateNameReplaceNumber = `${newName} has already been added to the phonebook, replace the old number with this new one?`
      const updateNumber = window.confirm(duplicateNameReplaceNumber);
      
      if (updateNumber) {
        const name = persons.find(n => n.name === newName)
        const updatedPerson = {...name, number: newNumber}
          
        personService
          .update(name.id, updatedPerson)
            .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNotificationType('notification')
            setNotificationMessage(
              `'${newName}' has been updated with the new number '${newNumber}'`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationType('error')
            setNotificationMessage(
              `'${newName}' has been removed from the server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            const newList = persons.filter(p => p.name !== newName)
            console.log(newList)
            setPersons(newList)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationType('notification')
          setNotificationMessage(
            `'${newName}' was added to the phone book`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        }) 
    }   
  }

  const deleteContact = (index) => {
    const person = persons[index]
    const message = `Delete ${person.name}?`
    const deleteConfirm = window.confirm(message);
    if (deleteConfirm) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const newList = persons.filter(p => persons.indexOf(p) !== index)
          setPersons(newList)
          setNotificationType('error')
          setNotificationMessage(
            `'${person.name}' was deleted from the phone book`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType}/>
      <Search 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <AddContact 
        addNameNumber={addNameNumber} 
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
        handleNameChange={handleNameChange}
      />
      <List 
        persons={persons} 
        filter={newFilter} 
        deleteContact={deleteContact} 
      />   
    </div>
  )
}

export default App