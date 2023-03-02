import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login/login.css";
import CircularProgress from "@mui/material/CircularProgress";
import { forgotPassword } from "../../api/apiUser";
import TextField from "@mui/material/TextField";
import { NotifiContext } from "../../context/notifiContext";

export default function ForgotPassword({ setUser }) {
  const { notifi, setNotifi } = useContext(NotifiContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (loading === true) {
      return;
    }
    if (!email || !password || !confirmPassword) {
      setNotifi(["Hãy nhập đủ thông tin"]);
      return;
    }
    if (password.length < 6 || password.length > 12) {
      setNotifi(["Mật khẩu từ 6 - 12 ký tự"]);
      return;
    }
    if (password !== confirmPassword) {
      setNotifi(["Xác nhận lại mật khẩu không đúng"]);
      return;
    }
    setLoading(true);
    let res = await forgotPassword(email, password);
    console.log(res);
    if (res.statusCode === "200") {
      navigate("/login");
      setNotifi(["Xác thực email của bạn để thay đổi mật khẩu", "success"]);
      setLoading(false);
      return;
    }
    setLoading(false);
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
            onSubmit={handleForgotPassword}
            style={{ height: "400px", width: "500px" }}
          >
            <h1 style={{ textAlign: "center" }}>Quên mật khẩu</h1>
            <TextField
              required
              type="text"
              id="outlined-basic"
              label="Email"
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
              label="Mật khẩu"
              variant="outlined"
              minLength="6"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            />
            <TextField
              required
              type="password"
              id="outlined-basic"
              label="Nhập lại mật khẩu"
              variant="outlined"
              minLength="6"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            />
            <button
              className="loginButton"
              type="submit"
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                "Xác nhận"
              )}
            </button>
            <span className="loginForgot">Bạn đã có tài khoản ?</span>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              <p style={{ color: "white", textDecoration: "none" }}>
                Đăng nhập
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
