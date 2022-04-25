/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePatchItems from "../../hooks/usePatchItems";
import useToast from "../../hooks/useToast";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const authCtx = useContext(AuthContext);
  const showToast = useToast();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const updatePasswordButtonRef = useRef();

  const updatePassword = usePatchItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/password`,
    true
  );

  useEffect(() => {
    if (updatePassword.isSuccess) {
      updatePassword.reset();
      updatePasswordButtonRef.current.innerHTML = "Update Password";
      updatePasswordButtonRef.current.disabled = false;
      showToast("Password updated successfully", true);
      oldPasswordRef.current.value = null;
      newPasswordRef.current.value = null;
      confirmPasswordRef.current.value = null;
    }
  }, [updatePassword.isSuccess]);

  useEffect(() => {
    if (updatePassword.isError) {
      if (updatePassword.error.response.status === 406) {
        showToast(updatePassword.error.response.data.message);
      } else {
        showToast("Something went wrong", false);
      }
      updatePasswordButtonRef.current.innerHTML = "Update Password";
      updatePasswordButtonRef.current.disabled = false;
      oldPasswordRef.current.value = null;
      newPasswordRef.current.value = null;
      confirmPasswordRef.current.value = null;
      updatePassword.reset();
    }
  }, [updatePassword.isError]);

  const sendPassword = () => {
    const oldPassword = oldPasswordRef.current.value.trim();
    const newPassword = newPasswordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      return showToast("Fill up all the fields with valid data", false);
    }

    if (newPassword === confirmPassword && oldPassword !== newPassword) {
      updatePasswordButtonRef.current.innerHTML = "Updating...";
      updatePasswordButtonRef.current.disabled = true;
      updatePassword.mutate({
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
    } else {
      if (oldPassword === newPassword) {
        return showToast(
          "New password cannot be the same as old password",
          false
        );
      }
      showToast("Passwords doesn't match", false);
    }
  };

  const logout = () => {
    authCtx.setUserData(null);
    localStorage.setItem("user-data", null);
  };

  return (
    <div className="update-password-container">
      <span>Update Password</span>
      <label>Old Password</label>
      <input
        type="password"
        placeholder="Current Password"
        ref={oldPasswordRef}
      />
      <label>New Password</label>
      <input type="password" placeholder="New Password" ref={newPasswordRef} />
      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        ref={confirmPasswordRef}
      />
      <button onClick={sendPassword} ref={updatePasswordButtonRef}>
        Update Password
      </button>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UpdatePassword;
