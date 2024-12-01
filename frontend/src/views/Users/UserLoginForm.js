import React, { useState, useEffect } from "react";
import { TextInput } from "../../components/TextInput";
import { useLoginContext } from "../../providers/loginProvider";

export default function UserLoginForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { login, errMessage, error, checkAuth } = useLoginContext();

  // unsure why this does not call here when manually
  // typing the url that would render this page  ??
  // checkAuth(false, "/employees");

  useEffect(() => {
    checkAuth(false, "/employees");
  }, []);

  // TODO - figure out submit on enter press
  return (
    <div>
      <h1>Login</h1>
      <form>
        {error ? <p className="alert alert-danger">{errMessage}</p> : <></>}
        <div className="form-group">
          <TextInput
            label="User Name or Email"
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
        <input
          className="btn btn-primary"
          type="button"
          value="Log In"
          onClick={() => {
            login({ username: username, password: password });
          }}
        />
      </form>
    </div>
  );
}
