import React, { Component } from 'react'
import { TextInput } from '../../components/TextInput';
import axios from 'axios'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

class UserSignUpForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            email:"",
            password: ""
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
        // TODO - validations before api call
        axios.post(`${BACKEND_URL}/api/v1/user/signup`, this.state)
        .then(res => {
            // TODO - return token to browser and redirect if success?
            console.log(res.data);
        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {
        return <>
        <h1>Register</h1>
        <form> 
            <div className='form-group'>
                <TextInput label="User Name" type="text" name="username" id="username" 
                value={this.state.username} handleChange={this.handleChange}/>
            </div>
            <div className='form-group'>
                <TextInput label="Email" type="email" name="email" id="email" 
                value={this.state.email} handleChange={this.handleChange}/>
            </div>
            <div className='form-group'>
                <TextInput label="Password" type="password" name="password" id="password" 
                value={this.state.password} handleChange={this.handleChange}/>
            </div>
            
            <input className='btn btn-submit'type="button" value="Log In" onClick={this.handleSubmit}/>                
        </form>
        </>
    }

}

export default UserSignUpForm;