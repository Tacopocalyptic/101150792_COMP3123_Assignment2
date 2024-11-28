import React, { Component } from 'react'
import { TextInput } from '../../components/TextInput';

class EmpEditForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            salary: 0,
            date_of_joining: new Date(),
            position: "",
            department: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        // Axios call to API here, pass state in
    }

    render() {
        return <>
        <h1 className=''>Edit Employee Info</h1>
        <form className=''> 
            <div>
                <TextInput label="First Name" type="text" name="first_name" id="first_name" 
                value={this.state.first_name} handleChange={this.handleChange}/>
                <TextInput label="Last Name" type="text" name="last_name" id="last_name" 
                value={this.state.last_name} handleChange={this.handleChange}/>
            </div>
            <div>
                <TextInput label="Email" type="email" name="email" id="email" 
                value={this.state.email} handleChange={this.handleChange}/>
            </div>
            <div>
                <TextInput label="Salary" type="number" name="salary" id="salary" 
                value={this.state.salary} handleChange={this.handleChange}/>
            </div>
            <div>
                <TextInput label="Date of Joining" type="date" name="city" id="city" 
                value={this.state.date_of_joining} handleChange={this.handleChange}/>
                <TextInput label="Position" type="text" name="position" id="position" 
                value={this.state.position} handleChange={this.handleChange}/>
                <TextInput label="Department" type="text" name="department" id="department" 
                value={this.state.department} handleChange={this.handleChange}/>
            </div>
            <input className='btn btn-submit' type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
        </>
    }

}

export default EmpEditForm;