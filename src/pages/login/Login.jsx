import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { login } from "../../api/apiUser";
import TextField from "@mui/material/TextField";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isFetching = false;

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await login(email, password);
    console.log("new user ", res);
    if (res.statusCode === "200") {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setUser(res.data);
      navigate("/messenger");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Nhắn tin online</h3>
          <span className="loginDesc">
            Đăng nhập vào ứng để kết nối đến mọi người.
          </span>
        </div>
        <div className="loginRight">
          <form
            className="loginBox"
            onSubmit={handleLogin}
            style={{ height: "400px" }}
          >
            <TextField
              required
              type="text"
              id="outlined-basic"
              label="Username/Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              required
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              minLength="6"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Đăng nhập"
              )}
            </button>
            <span className="loginForgot">Quên mật khẩu?</span>
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
                  Đăng ký
                </p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
