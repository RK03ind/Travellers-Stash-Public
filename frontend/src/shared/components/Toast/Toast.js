/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import "./Toast.css";
import { ReactComponent as Success } from "../../../assets/success.svg";
import { ReactComponent as Warning } from "../../../assets/warning.svg";
import { useContext, useEffect, useRef } from "react";
import { ToastContext } from "../../../context/ToastContext";

const Toast = () => {
  let currentSec = 4800;
  const toastCtx = useContext(ToastContext);
  const progressBar = useRef();
  let intvToast;

  const startProgress = () => {
    if (progressBar.current) {
      progressBar.current.style.width = `${Math.floor(
        (currentSec / 4800) * 100
      )}%`;
      if (currentSec > 0) {
        currentSec -= 10;
      } else {
        currentSec = 4800;
        toastCtx.setVisibility(false);
      }
    }
  };

  useEffect(() => {
    if (toastCtx.isVisible) {
      currentSec = 4800;
      console.log(currentSec);
      clearInterval(intvToast);
      setInterval(startProgress, 10);
    }
  }, [toastCtx.isVisible]);

  const closeToast = () => {
    clearInterval(intvToast);
    currentSec = 4800;
    toastCtx.setVisibility(false);
  };

  if (toastCtx.isVisible) {
    return ReactDOM.createPortal(
      <div className="toast" onClick={closeToast}>
        <div className="toast-content">
          {toastCtx.type ? <Success /> : <Warning />}
          <span>{toastCtx.message}</span>
        </div>
        <div
          className="progress-bar"
          ref={progressBar}
          style={{ background: toastCtx.type ? "#6bbe66" : "red" }}
        ></div>
      </div>,
      document.getElementById("toast-root")
    );
  } else {
    return <div></div>;
  }
};

export default Toast;
