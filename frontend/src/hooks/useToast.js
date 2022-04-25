import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const useToast = () => {
  const toastCtx = useContext(ToastContext);

  const showToast = (message, type) => {
    if (
      document.activeElement &&
      document.activeElement.blur &&
      typeof document.activeElement.blur === "function"
    ) {
      document.activeElement.blur();
    }

    if (toastCtx.isVisible) {
      toastCtx.setVisibility(false);
      setTimeout(() => {
        toastCtx.setVisibility(true);
        toastCtx.setMsg(message);
        toastCtx.setType(type);
      }, 300);
    } else {
      setTimeout(() => {
        toastCtx.setVisibility(true);
        toastCtx.setMsg(message);
        toastCtx.setType(type);
      }, 100);
    }
  };
  return showToast;
};

export default useToast;
