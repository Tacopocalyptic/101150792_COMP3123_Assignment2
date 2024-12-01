import "./App.css";
import NavBar from "./components/NavBar";
import UserLoginForm from "./views/Users/UserLoginForm";
import UserSignUpForm from "./views/Users/UserSignUpForm";
import EmployeeEntryForm from "./views/Employee/EmpEntryForm";
import EmployeeEditForm from "./views/Employee/EmpEditForm";
import EmployeeDetails from "./views/Employee/EmpDetails";
import EmployeesView from "./views/Employee/EmpIndex";
import EmployeeSearch from "./views/Employee/EmpSearch";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="login" element={<UserLoginForm />} />
        <Route path="signup" element={<UserSignUpForm />} />
        <Route path="employees" element={<EmployeesView />} />
        <Route path="employees/search" element={<EmployeeSearch />} />
        <Route path="employees/new" element={<EmployeeEntryForm />} />
        <Route path="employees/edit/:id" element={<EmployeeEditForm />} />
        <Route path="employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default App;
