import axios from "axios";
import { apiURL } from "../config/config";

const login = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
    };
    const res = await axios.post(`${apiURL}/user/login`, body);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const loginByToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const body = {
      refreshToken: refreshToken,
    };
    const res = await axios.post(`${apiURL}/user/login-token`, body);
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

const forgotPassword = async (email, password) => {
  try {
    const body = {
      email,
      password,
    };
    const res = await axios.post(`${apiURL}/user/forgot-password`, body);
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
      const user = await loginByToken();
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

const getAllUser = async (textSearch) => {
  try {
    const res = await axios.get(`${apiURL}/user/get-all-user`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const lockUser = async (sender, email, lock) => {
  try {
    const fetchData = async () => {
      const body = { sender, email, lock };
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      const res = await axios.post(`${apiURL}/user/lock-user`, body, headers);
      return res.data;
    };
    let data = await fetchData();
    if (data.statusCode === "410") {
      const user = await loginByToken();
      localStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
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
  forgotPassword,
  getAllUser,
  lockUser,
};
