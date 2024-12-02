import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { useLoginContext } from "../../providers/loginProvider";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const { checkAuth } = useLoginContext();

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(true, "/login");
    getEmp();
  }, [id]);

  const getEmp = async () => {
    axios
      .get(`${BACKEND_URL}/api/v1/emp/employees/${id}`)
      .then((res) => {
        console.log(res.data);
        const empData = res.data.employee;
        setEmp(empData);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setErrMessage(e.response.data.message);
      });
  };

  const deleteEmp = async () => {
    axios
      .delete(`${BACKEND_URL}/api/v1/emp/employees?eid=${id}`)
      .then((res) => {
        // console.log(res.data);
        navigate("/employees");
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setErrMessage(e.response.data.message);
      });
  };

  return isLoading ? (
    <div className="alert alert-secondary">Loading....</div>
  ) : (
    <div className="card">
      <h1>Employee Details</h1>
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
      <dl>
        <dt>Name</dt>
        <dd>
          {emp.first_name} {emp.last_name}
        </dd>
        <dt>Email</dt>
        <dd>{emp.email}</dd>
        <dt>Department & Position</dt>
        <dd>
          {emp.department} - {emp.position}
        </dd>
        <dt>Salary</dt>
        <dd>${emp.salary}</dd>
        <dt>Date Joined</dt>
        <dd>{emp.date_of_joining}</dd>
      </dl>
      <Link className="btn btn-primary" to={`/employees/edit/${emp._id}`}>
        Edit Details
      </Link>
      <button className="btn btn-danger" onClick={deleteEmp}>
        Delete Employee
      </button>
    </div>
  );
}
