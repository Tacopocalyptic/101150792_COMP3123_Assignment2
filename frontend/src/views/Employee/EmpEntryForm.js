import React, { Component } from 'react'
import { TextInput } from '../../components/textInput';
import { FormOutput } from '../components/formOutput';

class EmployeeEntryFrom extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
            address: "",
            address2: "",
            city: "",
            province: "",
            postalCode: "",
            agree: false,
            submit: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            ...this.state,
            submit: false,
            agree: false,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        this.setState({
            ...this.state,
            submit: true
        })
    }

    render() {
        return <>
        <h1>Data Entry Form</h1>
        <form> 
            <div>
                <TextInput label="Email" type="email" name="email" id="email" 
                value={this.state.email} handleChange={this.handleChange}/>
                <TextInput label="Name" type="text" name="name" id="name" 
                value={this.state.name} handleChange={this.handleChange}/>
            </div>
            <div>
                <TextInput label="Address" type="text" name="address" id="address" 
                value={this.state.address} handleChange={this.handleChange}/>
            </div>
            <div>
                <TextInput label="Address 2" type="text" name="address2" id="address2" 
                value={this.state.address2} handleChange={this.handleChange}/>
            </div>
            <div>
                <TextInput label="City" type="text" name="city" id="city" 
                value={this.state.city} handleChange={this.handleChange}/>
                <select name="province" id="province" onChange={this.handleChange}>
                    <option value="ON">Ontario</option>
                    <option value="QC">Quebec</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="NB">New Brunswick</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="AB">Alberta</option>
                    <option value="NL">Newfoundland</option>
                    <option value="MB">Manitoba</option>
                    <option value="BC">British Columbia</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="YK">Yukon</option>
                    <option value="NU">Nunavut</option>
                </select>
                <TextInput label="Postal Code" type="text" name="postalCode" id="postalCode" 
                value={this.state.postalCode} handleChange={this.handleChange}/>
            </div>
            <div>
                <input type="checkbox" id='agree' name='agree' checked={this.state.agree}
                value="true" onChange={this.handleChange} />
                <label for="agree">Agree to terms and conditions?</label>
            </div>
            <input type="button" value="Submit" onClick={this.handleSubmit}/>
            
        </form>

        {this.state.submit && this.state.agree && <FormOutput email={this.state.email} 
        name={this.state.name} address={this.state.address} address2={this.state.address2} 
        city={this.state.city} province={this.state.province} postalCode={this.state.postalCode}/>}
        </>
    }

}

export default EmployeeEntryFrom;