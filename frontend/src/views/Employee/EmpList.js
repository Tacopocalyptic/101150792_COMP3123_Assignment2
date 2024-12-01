import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useLoginContext } from "../../providers/loginProvider";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export default function EmployeeList() {
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

  const searchEmps = async () => {
    if (!searchValue || !searchBy) {
      setError(true);
      setErrMessage("Invalid search");
      return;
    }
    axios
      .get(
        `${BACKEND_URL}/api/v1/emp/employees?searchBy=${searchBy}&searchValue=${searchValue}`
      )
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
        <label for="searchBy" className="row-form-label">
          Search by:
        </label>
        <select
          className="form-control"
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
        <button className="btn btn-primary" onClick={searchEmps}>
          Search
        </button>
      </form>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Department/Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <>
              <tr className="">
                <td>
                  {emp.first_name} {emp.last_name}
                </td>
                <td>{emp.email}</td>
                <td>
                  {emp.department}, {emp.position}
                </td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/employees/${emp._id}`}
                  >
                    Details
                  </Link>
                  <Link
                    className="btn btn-secondary"
                    to={`/employees/edit/${emp._id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
