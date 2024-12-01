import { useState } from "react";
import { TextInput } from "../../components/TextInput";
import { useNavigate } from "react-router";
import axios from "axios";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function EmployeeEntryFrom() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [dateJoined, setDateJoined] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const navigate = useNavigate();

  // TODO
  const handleSubmit = () => {
    axios
      .post(`${BACKEND_URL}/api/v1/emp/employees/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        salary: salary,
        date_of_joining: dateJoined,
        department: department,
      })
      .then((res) => {
        if (res.data.status) {
          // return user to employee details page
          navigate(`/employees`);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setErrMessage(e.response.data.message);
      });
  };

  return (
    <div className="card">
      <h1 className="">Add New Employee</h1>
      <form className="">
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
        <div>
          <TextInput
            label="First Name"
            type="text"
            name="first_name"
            id="first_name"
            value={firstName}
            handleChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextInput
            label="Last Name"
            type="text"
            name="last_name"
            id="last_name"
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div>
          <TextInput
            label="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <TextInput
            label="Salary"
            type="number"
            name="salary"
            id="salary"
            value={salary}
            handleChange={(e) => {
              setSalary(e.target.value);
            }}
          />
        </div>
        <div>
          <TextInput
            label="Date of Joining"
            type="date"
            name="city"
            id="city"
            value={dateJoined}
            handleChange={(e) => {
              setDateJoined(e.target.value);
            }}
          />
          <TextInput
            label="Position"
            type="text"
            name="position"
            id="position"
            value={position}
            handleChange={(e) => {
              setPosition(e.target.value);
            }}
          />
          <TextInput
            label="Department"
            type="text"
            name="department"
            id="department"
            value={department}
            handleChange={(e) => {
              setDepartment(e.target.value);
            }}
          />
        </div>
        <input
          className="btn btn-primary"
          type="button"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
