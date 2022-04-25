/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import usePostItems from "../hooks/usePostItems";
import useToast from "../hooks/useToast";
import "./signup.css";

const Signup = () => {
  const [isPasswordStrong, setPasswordStrength] = useState(true);
  const nameRef = useRef();
  const uidRef = useRef();
  const emailRef = useRef();
  const passowordRef = useRef();
  const confirmPasswordRef = useRef();
  const signUpButtonRef = useRef();
  const authCtx = useContext(AuthContext);
  const showToast = useToast();

  const postUserData = usePostItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/signup`,
    false
  );

  const strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const forceUidSmall = (event) => {
    event.target.value = uidRef.current.value.toLowerCase();
  };

  const initUserData = () => {
    const name = nameRef.current.value;
    const uid = uidRef.current.value.substring(0, 12);
    const email = emailRef.current.value;
    const password = passowordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (
      name === "" ||
      uid === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      showToast("Enter all required information", false);
    } else if (!strongPassword.test(passowordRef.current.value)) {
      setPasswordStrength(false);
    } else if (password !== confirmPassword) {
      showToast("Passwords doesn't match ");
    } else {
      signUpButtonRef.current.innerHTML = "Signing up...";
      signUpButtonRef.current.disabled = "true";
      postUserData.mutate({
        uid: uid,
        name: name,
        email: email,
        password: password,
      });
    }
  };

  useEffect(() => {
    if (postUserData.isSuccess) {
      localStorage.setItem("user-data", JSON.stringify(postUserData.data.data));
      authCtx.setUserData(postUserData.data.data);
      postUserData.reset();
      document.location = "/";
    }
  }, [postUserData.isSuccess]);

  useEffect(() => {
    if (postUserData.isError) {
      showToast(postUserData.error.response.data, false);
      postUserData.reset();
      signUpButtonRef.current.innerHTML = "Signup";
      signUpButtonRef.current.disabled = false;
    }
  }, [postUserData.isError]);

  return (
    <div className="signup">
      <div className="signup-container">
        <span>Signup</span>
        <label>Name</label>
        <input type="text" placeholder="Name" ref={nameRef} />
        <label>User Id</label>
        <input
          type="text"
          placeholder="User id"
          ref={uidRef}
          onChange={forceUidSmall}
          maxLength="12"
        />
        <label>Email</label>
        <input type="email" placeholder="Email" ref={emailRef} />
        <label>Password</label>
        <input type="password" placeholder="Password" ref={passowordRef} />
        {!isPasswordStrong && (
          <label style={{ color: "red", fontSize: "0.76em" }}>
            Password must contain one special character, one lowercase letter,
            one number and must be 8 characters long
          </label>
        )}
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
        <button
          style={{ marginTop: "1.5em" }}
          onClick={initUserData}
          ref={signUpButtonRef}
        >
          Signup
        </button>
        <span>
          Have an account already? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
