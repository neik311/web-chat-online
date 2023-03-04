import axios from "axios";
import { apiURL } from "../config/config";
import { loginByToken } from "./apiUser";

const createMessages = async (groupId, messages, sender, type) => {
  try {
    const fetchData = async () => {
      const body = {
        groupId: groupId,
        messages: messages,
        sender: sender,
        type: type,
      };
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      const res = await axios.post(
        `${apiURL}/messages/create-messages`,
        body,
        headers
      );
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

const getMessagesInGroup = async (groupId) => {
  try {
    const res = await axios.get(`${apiURL}/messages/get-messages/${groupId}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteMessagesInGroup = async (sender, messagesId) => {
  try {
    const fetchData = async () => {
      const body = { sender, messagesId };
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      const res = await axios.post(
        `${apiURL}/messages/delete-messages`,
        body,
        headers
      );
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

export { createMessages, getMessagesInGroup, deleteMessagesInGroup };
