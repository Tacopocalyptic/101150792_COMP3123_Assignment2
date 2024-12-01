import "./App.css";
import { useState, useEffect, useContext } from "react";
import NavBar from "./components/NavBar";
import UserLoginForm from "./views/Users/UserLoginForm";
import UserSignUpForm from "./views/Users/UserSignUpForm";
import EmployeeEntryForm from "./views/Employee/EmpEntryForm";
import EmployeeList from "./views/Employee/EmpList";
import EmployeeEditForm from "./views/Employee/EmpEditForm";
import EmployeeDetails from "./views/Employee/EmpDetails";
import LoginProvider, { LoginContext } from "./providers/loginProvider";

import {
  /* Components of React Router */
  Routes, // Routes: A container for all your route definitions.
  Route, // Route: Defines a single route with a path and the component to render.
  useNavigate, //useNavigate(): Handling User Interactions: Redirect users after certain actions, such as form submissions or login.
} from "react-router-dom";

function App() {
  // const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     setLoggedIn(true);
  //   }
  // }, [loggedIn]);

  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route index element={<UserLoginForm />} /> */}
        <Route path="login" element={<UserLoginForm />} />
        <Route path="signup" element={<UserSignUpForm />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/new" element={<EmployeeEntryForm />} />
        <Route path="employees/edit/:id" element={<EmployeeEditForm />} />
        <Route path="employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default App;
