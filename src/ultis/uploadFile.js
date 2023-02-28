import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

// upload avatar
export const uploadFile = async (file) => {
  if (!file) return;
  const sotrageRef = ref(storage, `avatar-app-chat/${file.name}`);
  const snapshot = await uploadBytes(sotrageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

// upload send image
export const uploadImage = async (file) => {
  if (!file) return;
  const sotrageRef = ref(storage, `image/${file.name}`);
  const snapshot = await uploadBytes(sotrageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
