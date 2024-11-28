import './App.css';
import NavBar from './components/NavBar';
import EmployeeEntryFrom from './views/Employee/EmpEntryForm';
import EmployeeList from './views/Employee/EmpList';

import { /* Components of React Router */
  BrowserRouter as Router, // BrowserRouter: Uses the HTML5 history API to keep your UI in sync with the URL.
  Routes, // Routes: A container for all your route definitions.
  Route,  // Route: Defines a single route with a path and the component to render.
  Link, // Link: Creates navigational links in your application.
  useNavigate, //useNavigate(): Handling User Interactions: Redirect users after certain actions, such as form submissions or login.
  Outlet, // outLet : a placeholder within a parent route's component that tells React Router where to render the child routes.
} from "react-router-dom"


function App() {
  return (
    <div className='App'>
        <NavBar />
        <EmployeeList />
    </div>
  );
}

export default App;
