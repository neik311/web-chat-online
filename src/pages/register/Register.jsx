import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../config/config";
import { registerUser } from "../../api/apiCall";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
      return;
    }
    const newUser = {
      id: username.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    const res = await registerUser(newUser);
    if ((res.statusCode = "200")) {
      navigate("/login");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Messenger</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Messenger.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="First name"
              required
              ref={firstName}
              className="loginInput"
            />
            <input
              placeholder="Last name"
              required
              ref={lastName}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="date"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              <p style={{ color: "white", textDecoration: "none" }}>
                Log into Account
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
