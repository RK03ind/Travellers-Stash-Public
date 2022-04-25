import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useGetItems = (url, isTokenRequired) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return useQuery(
    url,
    async () => {
      if (!isTokenRequired) {
        const { data } = await axios.get(url);
        return data;
      } else {
        const { data } = await axios.get(url, {
          headers: {
            "x-auth-token": authCtx.userData.token,
          },
        });
        return data;
      }
    },
    {
      refetchOnWindowFocus: false,
      // cacheTime: 0,
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

export default useGetItems;
