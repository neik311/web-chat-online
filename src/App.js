import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/profile";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginByToken } from "./api/apiUser";

function App() {
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await loginByToken(token);
      console.log(res);
      if ((res.statusCode = "200")) {
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
            user ? <Messenger user={user} setUser={setUser} /> : <Register />
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
            user ? <Messenger user={user} setUser={setUser} /> : <Register />
          }
        />
      </Routes>
    </>
  );
}

export default App;
