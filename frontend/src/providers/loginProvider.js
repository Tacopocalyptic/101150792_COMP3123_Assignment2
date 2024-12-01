import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const LoginContext = createContext(false);

// simplifies imports.
export const useLoginContext = () => {
  return useContext(LoginContext);
};

export default function LoginProvider(props) {
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem("jwt");

  const login = (loginDetails) => {
    if (!loginDetails.password) {
      setError(true);
      setErrMessage("Please enter a password");
      return;
    }
    if (!loginDetails.username) {
      setError(true);
      setErrMessage("Please enter a username or email");
      return;
    }
    axios
      .post(`${BACKEND_URL}/api/v1/user/login`, loginDetails)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        if (!res.data.status) {
          setError(true);
          setErrMessage(res.data.message);
        }
        localStorage.setItem("jwt", res.data.jwt);
        // setLoggedIn(true);
        // reroute
        navigate("/employees");
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setErrMessage(e.response.data.message);
      });
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
    // setLoggedIn(false);
  };

  const checkAuth = (expectLoggedIn, navPath) => {
    console.log(`Logged in state: ${loggedIn.toString()}`);
    if (loggedIn !== expectLoggedIn) {
      navigate(navPath);
    }
  };

  // exposes content
  return (
    <LoginContext.Provider
      value={{ loggedIn, login, logOut, checkAuth, error, errMessage }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
