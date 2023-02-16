import axios from "axios";
import { apiURL } from "../config/config";

const login = async (email, password) => {
  try {
    const res = await axios.post(`${apiURL}/user/login`, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const loginByToken = async (refreshToken) => {
  try {
    const res = await axios.post(`${apiURL}/user/login-token`, {
      refreshToken: refreshToken,
    });
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const registerUser = async (user) => {
  try {
    const res = await axios.post(`${apiURL}/user/create-user`, user);
    return res.data;
  } catch (err) {}
};

const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`${apiURL}/user/get-user?id=${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const updateUser = async (newUser) => {
  try {
    const fetchData = async () => {
      const res = await axios.put(`${apiURL}/user/update-user`, newUser, {
        headers: { access_token: localStorage.getItem("accessToken") },
      });
      return res.data;
    };
    let data = await fetchData();
    if (data.statusCode === "410") {
      const user = await loginByToken(localStorage.getItem("refreshToken"));
      localStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getUser = async (textSearch) => {
  try {
    const res = await axios.get(
      `${apiURL}/user/get-user?id=${textSearch}&email=${textSearch}`
    );
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};
export {
  login,
  registerUser,
  loginByToken,
  getUserByUsername,
  updateUser,
  getUser,
};
