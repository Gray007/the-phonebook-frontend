import React from 'react'
import Heading from './Heading'
import Entry from './Entry'

const List = ({ persons, filter, deleteContact }) => {
let filterRegex = new RegExp(filter, "gi")
    return (
        <div>
            <Heading text={'Numbers'}/>
            <ul>
                {persons
                .filter(person => person.name
                .match(filterRegex))
                .map(person => 
                <Entry key={person.id} person={person} deleteContact={() => deleteContact(persons.indexOf(person))} />
                )}
            </ul>
        </div>
    )
}

export default List

