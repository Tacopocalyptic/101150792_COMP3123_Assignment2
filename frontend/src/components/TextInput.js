import React from "react"

export const TextInput = (props) => {
    const {label, type, name, id, value, handleChange} = props


    return (
        <>
            <label for={name}>{label}</label>
            <input type={type} id={id} name={name} value={value} 
            onChange={handleChange} className="form-control"></input>
        </>
    )
} 
