import React, { useState } from "react";
import axios from "axios";
import { TextInput } from "../../components/TextInput";
import { useLoginContext } from "../../providers/loginProvider";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function UserSignUpForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const { login, checkAuth } = useLoginContext();

  checkAuth(false, "/employees");

  const handleSubmit = () => {
    if (!password || password !== confirmPassword) {
      setError(true);
      setErrMessage("Passwords must match");
      return;
    }
    // TODO - validations before api call
    axios
      .post(`${BACKEND_URL}/api/v1/user/signup`, {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        // TODO - return token to browser and redirect if success?
        console.log(res.data);
        login({ username: res.data.username, password: password });
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setErrMessage(e.response.data.message);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form>
        <div className="form-group">
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
          <TextInput
            label="User Name"
            type="text"
            name="username"
            id="username"
            value={username}
            handleChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <TextInput
            label="Password"
            type="password"
            name="password"
            id="password"
            value={password}
            handleChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            handleChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <input
          className="btn btn-submit"
          type="button"
          value="Register"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}
