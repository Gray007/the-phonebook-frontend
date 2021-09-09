import React from 'react'
import Heading from './Heading'
import Input from './Input'

const AddContact = ({ addNameNumber, newName, newNumber, handleNumberChange, handleNameChange }) => {
    return (
        <div>
            <Heading text={'Add Contact'}/>
            <form onSubmit={addNameNumber}>
                <Input text={'Name'} newValue={newName} handleChange={handleNameChange} />
                <Input text={'Number'} newValue={newNumber} handleChange={handleNumberChange} />
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddContact