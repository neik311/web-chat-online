import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/profile";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { loginByToken } from "./api/apiUser";
import OpenNotifi from "./hooks/openNotifi";
import { NotifiContext } from "./context/notifiContext";

function App() {
  // const { user } = useContext(AuthContext);
  const { notifi, setNotifi } = useContext(NotifiContext);
  const [user, setUser] = useState();
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
        <Route
          path=""
          element={
            user ? (
              <Messenger user={user} setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
      </Routes>
      <Routes>
        <Route
          path="/messenger"
          element={
            user ? <Messenger user={user} setUser={setUser} /> : <Login />
          }
        />
      </Routes>
      {notifi[0] && <OpenNotifi notifi={notifi} setNotifi={setNotifi} />}
    </>
  );
}

export default App;
