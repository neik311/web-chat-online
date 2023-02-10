import axios from "axios";
import { apiURL } from "../config/config";
import { loginByToken } from "./apiUser";

const createMessages = async (groupId, messages, sender) => {
  try {
    const fetchData = async () => {
      const res = await axios.post(
        `${apiURL}/messages/create-messages`,
        {
          groupId: groupId,
          messages: messages,
          sender: sender,
        },
        {
          headers: { access_token: localStorage.getItem("accessToken") },
        }
      );
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

const getMessagesInGroup = async (groupId) => {
  try {
    const res = await axios.get(`${apiURL}/messages/get-messages/${groupId}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export { createMessages, getMessagesInGroup };
