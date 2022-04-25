import { createContext, useState } from "react";

export const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
  initDarkModeContext: () => {},
});

const ThemeProvider = ({ children }) => {
  const themeFlag = localStorage.getItem("dark");

  if (themeFlag !== null) {
    document.documentElement.setAttribute("dark", themeFlag);
  }
  const [isDarkMode, setDarkMode] = useState(
    themeFlag === null ? false : themeFlag === "true" ? true : false
  );

  // eslint-disable-next-line no-unused-vars
  const toggleTheme = () => {
    localStorage.setItem("dark", isDarkMode === false);
    setDarkMode((prevState) => {
      return prevState === false;
    });
  };
  const contextData = {
    isDarkMode: isDarkMode,
    toggleTheme: toggleTheme,
    initDarkModeContext: setDarkMode,
  };
  return (
    <ThemeContext.Provider value={contextData}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
