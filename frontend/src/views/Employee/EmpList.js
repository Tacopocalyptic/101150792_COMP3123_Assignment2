import { Link } from "react-router";

export default function EmployeeList(props) {
  const emps = props.emps;
  const error = props.error;
  const errMessage = props.errMessage;

  return (
    <>
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
