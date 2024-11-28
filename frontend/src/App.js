import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import EmployeeEntryFrom from "./views/Employee/EmpEntryForm";
import EmployeeList from "./views/Employee/EmpList";
import UserLoginForm from "./views/Users/UserLoginForm";

import {
  /* Components of React Router */
  Routes, // Routes: A container for all your route definitions.
  Route, // Route: Defines a single route with a path and the component to render.
  useNavigate, //useNavigate(): Handling User Interactions: Redirect users after certain actions, such as form submissions or login.
} from "react-router-dom";

function App() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<EmployeeList />} />
        <Route path="login" element={<UserLoginForm />} />
        <Route path="signup" element={<UserLoginForm />} />
      </Routes>
    </>
  );
}

export default App;
