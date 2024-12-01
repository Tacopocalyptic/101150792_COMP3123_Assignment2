import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router";
import { useLoginContext } from "../../providers/loginProvider";
import EmployeeList from "./EmpList";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export default function EmployeeSearch() {
  const [emps, setEmps] = useState([]);
  const [searchParams] = useSearchParams();

  const [searchBy, setSearchBy] = useState(searchParams.get("searchBy"));
  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchValue")
  );
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const { checkAuth } = useLoginContext();

  // runs when this page loads, if not logged in, redirects
  console.log("Viewing emp list....");
  checkAuth(true, "/login");

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
    searchEmps();
  }, []);

  return (
    <>
      <h3>Search Employees</h3>
      <form className="d-flex">
        {error && (
          <p className="alert alert-danger">
            {Array.isArray(errMessage)
              ? errMessage.map((msg) => (
                  <>
                    {msg.msg}
                    <br />
                  </>
                ))
              : errMessage}
          </p>
        )}
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
