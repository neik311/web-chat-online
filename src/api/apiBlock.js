import axios from "axios";
import { apiURL } from "../config/config";

const getBlockUser = async (blocker, blocked) => {
  try {
    const res = await axios.get(
      `${apiURL}/block-user/get-block-user/${blocker}/${blocked}`
    );
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createBlockUser = async (blocker, blocked) => {
  try {
    const res = await axios.post(`${apiURL}/block-user/create-block-user`, {
      blocker: blocker,
      blocked: blocked,
    });
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteBlockUser = async (blocker, blocked) => {
  try {
    const res = await axios.delete(
      `${apiURL}/block-user/delete-block-user/${blocker}/${blocked}`
    );
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export { getBlockUser, createBlockUser, deleteBlockUser };
