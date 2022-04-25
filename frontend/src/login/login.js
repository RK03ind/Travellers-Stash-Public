/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useToast from "../hooks/useToast";
import usePostItems from "../hooks/usePostItems";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [showGuestLogin, setShowGuestLogin] = useState(true);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginButton = useRef();
  const guestLoginButton = useRef();
  const authCtx = useContext(AuthContext);
  const showToast = useToast();

  const postUserData = usePostItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/login`,
    false
  );

  const initUserData = () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return showToast("Enter all required information to login", false);
    }
    loginButton.current.innerHTML = "Logging in...";
    loginButton.current.disabled = "true";
    postUserData.mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    passwordRef.current.value = null;
  };

  useEffect(() => {
    if (postUserData.isSuccess) {
      authCtx.setUserData(postUserData.data.data);
      localStorage.setItem("user-data", JSON.stringify(postUserData.data.data));
      postUserData.reset();
      navigate("/", { replace: true });
    }
  }, [postUserData.isSuccess]);

  useEffect(() => {
    if (postUserData.isError && !showGuestLogin) {
      showToast(postUserData.error.response.data.message, false);
      postUserData.reset();
      loginButton.current.innerHTML = "Login";
      loginButton.current.disabled = false;
    } else if (postUserData.isError && showGuestLogin) {
      postUserData.reset();
      guestLoginButton.current.innerHTML = "Login as Guest";
      guestLoginButton.current.disabled = false;
    }
  }, [postUserData.isError]);

  const hideGuestLogin = () => {
    setShowGuestLogin(false);
  };

  const loginAsGuest = () => {
    guestLoginButton.current.innerHTML = "Logging in...";
    guestLoginButton.current.disabled = "true";
    postUserData.mutate({
      email: "admin@gmail.com",
      password: "adminrk03",
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <span>Login</span>
        <label>Email</label>
        <input type="email" placeholder="Email" ref={emailRef} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={hideGuestLogin}
          ref={passwordRef}
        />
        {showGuestLogin && <span>OR</span>}
        {!showGuestLogin && (
          <button
            style={{ marginTop: "1.5em" }}
            onClick={initUserData}
            ref={loginButton}
          >
            Login
          </button>
        )}
        {showGuestLogin && (
          <button onClick={loginAsGuest} ref={guestLoginButton}>
            Login as Guest
          </button>
        )}
        <span>
          Don't have an account yet? <Link to="/signup">Signup</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
