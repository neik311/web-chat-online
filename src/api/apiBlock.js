import axios from "axios";
import { apiURL } from "../config/config";
import { loginByToken } from "./apiUser";

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
    const fetchData = async () => {
      const body = {
        blocker: blocker,
        blocked: blocked,
      };
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      const res = await axios.post(
        `${apiURL}/block-user/create-block-user`,
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

const deleteBlockUser = async (blocker, blocked) => {
  try {
    const fetchData = async () => {
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      const res = await axios.delete(
        `${apiURL}/block-user/delete-block-user/${blocker}/${blocked}`,
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

export { getBlockUser, createBlockUser, deleteBlockUser };
