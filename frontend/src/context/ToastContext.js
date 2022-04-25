import { createContext, useState } from "react";

export const ToastContext = createContext({
  isVisible: false,
  message: "",
  type: false,
  setVisibility: () => {},
  setMsg: () => {},
  setType: () => {},
});

const ToastProvider = ({ children }) => {
  const [isVisible, setVisibility] = useState(false);
  const [message, setMsg] = useState("");
  const [type, setType] = useState(false);

  const contextData = {
    isVisible: isVisible,
    message: message,
    type: type,
    setVisibility: setVisibility,
    setMsg: setMsg,
    setType: setType,
  };

  return (
    <ToastContext.Provider value={contextData}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
