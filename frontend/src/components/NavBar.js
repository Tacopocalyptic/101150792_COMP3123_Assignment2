import React, { useState } from 'react'
import { Link } from 'react-router'

export default function NavBar() {
    const { loggedIn, setLoggedIn } = useState(false)
    
    return  (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <a className='navbar-brand' href='#'>Employee Management System</a>
    <div className="container-fluid">

    {loggedIn ? 
    <>
    <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link" href="#">Employee List</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#">Add Employee</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#">Log Out</a>
        </li>
    </ul>
    <form className="d-flex">
        <input className="form-control me-2" type="text" placeholder="Search Employees..." />
        <button className="btn btn-primary" type="button">Search</button>
    </form>
    </>
    :
    <>
    <ul className="navbar-nav">
    <li className="nav-item">
    <Link className="nav-link" to="login">Login</Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link" to="signup">Sign Up</Link>
    </li>
    </ul>
    </>

    }

    </div>
    </nav>
    )
}
