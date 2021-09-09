import React from 'react'
import Heading from './Heading'
import Input from './Input'

const Search = ({ newFilter, handleFilterChange}) => {
    return (
      <div>
        <Heading text={'Phonebook'}/>
        <Input text={'Filter by name'} newValue={newFilter} handleChange={handleFilterChange} />
      </div>
    )
}

export default Search