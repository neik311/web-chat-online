import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { login } from "../../api/apiCall";

export default function Login({ setUser }) {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const isFetching = false;

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await login(email.current.value, password.current.value);
    console.log("new user ", res);
    if ((res.statusCode = "200")) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/messenger");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">messenger</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Messenger.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              type="text"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                <p style={{ color: "white", textDecoration: "none" }}>
                  Create a New Account
                </p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
