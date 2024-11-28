import React, { Component } from 'react'
import axios from "axios"
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

class EmployeeList extends Component {
    constructor(props){
        super(props)
        this.state = {
            emps: []
        }
    }

    getEmps = async() => {
        axios.get(`${BACKEND_URL}/api/v1/emp/employees`)
        .then(res => {
            console.log(res.data);
            const empData = res.data.employees;
            this.setState({emps: empData})
        })
        .catch(e => {
            console.log(e)
        })
    }

    componentDidMount() {
        this.getEmps()
    }

    
    render() {
        return (<>
            <h3>Employee List</h3>
            <table className='table'>
            <thead className='thead-dark'>
                <tr>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Department/Position</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {   // TODO - button navigation
                this.state.emps.map(emp => (<>
                    <tr className="">
                        <td>{emp.first_name} {emp.last_name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.department}, {emp.position}</td>
                        <td>
                            <button className='btn btn-secondary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                </>))
            }
            </tbody>
            </table>
        </>)
    }
}

export default EmployeeList;