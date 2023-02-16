import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { login } from "../../api/apiUser";
import TextField from "@mui/material/TextField";
import { NotifiContext } from "../../context/notifiContext";

export default function Login({ setUser }) {
  const { notifi, setNotifi } = useContext(NotifiContext);
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
      setNotifi(["Đăng nhập thành công", "success"]);
      return;
    }
    setNotifi([res.message]);
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
            style={{ height: "400px", width: "500px" }}
          >
            <h1 style={{ textAlign: "center" }}> Đăng nhập</h1>
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
              sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
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
              sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            />
            <button
              className="loginButton"
              type="submit"
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              Đăng nhập
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
