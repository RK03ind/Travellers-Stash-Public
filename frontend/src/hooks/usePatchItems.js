import { useMutation } from "react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const usePatchItems = (url, isTokenRequired, action) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation(
    async (data) => {
      if (!isTokenRequired) {
        return await axios.patch(url, data);
      } else {
        return await axios.patch(url, data, {
          headers: {
            "x-auth-token": authCtx.userData.token,
            action: action,
          },
        });
      }
    },
    {
      onError: (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          authCtx.setUserData(null);
          localStorage.setItem("user-data", null);
          navigate("/login");
        }
      },
    }
  );
};

export default usePatchItems;
