import { createContext, useState } from "react";

export const AuthContext = createContext({
  userData: {},
  setUserData: () => {},
});

const AuthProvider = ({ children }) => {
  let storedAuthData;
  try {
    storedAuthData = JSON.parse(localStorage.getItem("user-data"));
  } catch {
    storedAuthData = null;
  }
  const [userData, setUserData] = useState(storedAuthData);

  const contextData = {
    userData: userData,
    setUserData: setUserData,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
