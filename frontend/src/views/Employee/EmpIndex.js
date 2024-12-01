import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useLoginContext } from "../../providers/loginProvider";
import EmployeeList from "./EmpList";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export default function EmployeesView() {
  const [emps, setEmps] = useState([]);

  const [searchBy, setSearchBy] = useState();
  const [searchValue, setSearchValue] = useState();
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const { checkAuth } = useLoginContext();

  console.log("Viewing emp list....");
  // runs when this page loads, if not logged in, redirects
  checkAuth(true, "/login");

  const getEmps = async () => {
    axios
      .get(`${BACKEND_URL}/api/v1/emp/employees`)
      .then((res) => {
        console.log(res.data);
        const empData = res.data.employees;
        setEmps(empData);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setErrMessage(e.response.data.errMessage);
      });
  };

  useEffect(() => {
    getEmps();
  }, []);

  return (
    <>
      <h3>Employee List</h3>
      <form className="d-flex">
        <label for="searchBy" className="form-control me-2">
          Search by:
        </label>
        <select
          className="form-control me-2"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          name="searchBy"
          id="searchBy"
        >
          <option value="department">Department</option>
          <option value="position">Position</option>
        </select>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search Employees..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Link
          className="btn btn-primary"
          to={`/employees/search?searchBy=${searchBy}&searchValue=${searchValue}`}
        >
          Search
        </Link>
      </form>
      <EmployeeList emps={emps} error={error} errMessage={errMessage} />
    </>
  );
}