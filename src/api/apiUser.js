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

const loginByToken = async (token) => {
  try {
    const res = await axios.post(`${apiURL}/user/login-token`, {
      token: token,
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
    const res = await axios.put(`${apiURL}/user/update-user`, newUser, {
      authorization: localStorage.getItem("token"),
    });
    return res.data;
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

const getBlockUser = async (blocker, blocked) => {
  try {
    console.log({
      blocker: blocker,
      blocked: blocked,
    });
    const res = await axios.get(
      `${apiURL}/block-user/get-block-user/${blocker}/${blocked}`
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
  getBlockUser,
};
