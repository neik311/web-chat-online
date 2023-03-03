import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/profile";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import UserMagager from "./pages/admin/user";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { loginByToken } from "./api/apiUser";
import OpenNotifi from "./hooks/openNotifi";
import { NotifiContext } from "./context/notifiContext";
import { UserContext } from "./context/userContext";

function App() {
  const { notifi, setNotifi } = useContext(NotifiContext);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await loginByToken(refreshToken);
      console.log(res);
      if (res?.statusCode === "200") {
        localStorage.setItem("accessToken", res.data?.accessToken);
        setUser(res.data);
      }
    };
    fetchData();
  }, []);
  console.log({ user });
  return (
    <>
      <Routes>
        <Route path="" element={user ? <Messenger /> : <Login />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route path="/messenger" element={user ? <Messenger /> : <Login />} />
      </Routes>
      <Routes>
        <Route path="/admin/user-manager" element={<UserMagager />} />
      </Routes>
      {notifi[0] && <OpenNotifi notifi={notifi} setNotifi={setNotifi} />}
    </>
  );
}

export default App;
