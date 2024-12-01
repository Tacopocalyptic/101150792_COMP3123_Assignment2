import React, { useEffect, useContext } from "react";
import { Link } from "react-router";
import { useLoginContext } from "../providers/loginProvider";

export default function NavBar() {
  const { logOut, loggedIn } = useLoginContext();

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="#">
        Employee Management System
      </a>
      <div className="container-fluid">
        {loggedIn ? (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  Employee List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees/new">
                  Add Employee
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}
