import React from 'react'

const Entry = ({ person, deleteContact }) => {
    return (
        <li>
            {person.name} : {person.number}
            <button onClick={deleteContact}>Delete</button> 
        </li>
    )
}

export default Entry