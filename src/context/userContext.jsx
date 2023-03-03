import { useState, createContext } from "react";
import { io } from "socket.io-client";
import { apiURL } from "../config/config";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const socket = io(apiURL);

  return (
    <UserContext.Provider value={{ user, setUser, socket }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
