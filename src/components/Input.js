import React from 'react'

const Input = ({ text, newValue, handleChange}) => (
    <div>
        {text}: 
        <input 
        value={newValue}
        onChange={handleChange}
        />
    </div>
)

export default Input