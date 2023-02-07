import axios from "axios";
import { apiURL } from "../config/config";

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

export { createMessages, getMessagesInGroup };
