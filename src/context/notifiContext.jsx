import { useState, createContext } from "react";

const NotifiContext = createContext();

const NotifiProvider = ({ children }) => {
  const [notifi, setNotifi] = useState([null]);

  return (
    <NotifiContext.Provider value={{ notifi, setNotifi }}>
      {children}
    </NotifiContext.Provider>
  );
};
export { NotifiContext, NotifiProvider };
