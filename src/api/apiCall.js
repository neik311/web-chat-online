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

const createGroup = async (sender, receive) => {
  try {
    const res = await axios.post(`${apiURL}/group/create-group`, {
      sender: sender,
      receive: receive,
    });
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getGroupByUser = async (username) => {
  try {
    const res = await axios.get(`${apiURL}/group/get-group/${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`${apiURL}/user/get-user?id=${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createMessages = async (groupId, messages, sender) => {
  try {
    const res = await axios.post(`${apiURL}/messages/create-messages`, {
      groupId: groupId,
      messages: messages,
      sender: sender,
    });
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getMessagesInGroup = async (groupId) => {
  try {
    const res = await axios.get(`${apiURL}/messages/get-messages/${groupId}`);
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

export {
  login,
  registerUser,
  loginByToken,
  createGroup,
  getGroupByUser,
  getUserByUsername,
  createMessages,
  getMessagesInGroup,
  updateUser,
  getUser,
};
