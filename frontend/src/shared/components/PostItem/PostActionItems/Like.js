/* eslint-disable react-hooks/exhaustive-deps */
import likeFillled from "../../../../assets/like.svg";
import likeUnfilled from "../../../../assets/like-unfilled.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import usePatchItems from "../../../../hooks/usePatchItems";
import { AuthContext } from "../../../../context/AuthContext";
import useToast from "../../../../hooks/useToast";

const Like = (props) => {
  const themeCtx = useContext(ThemeContext);
  const authCtx = useContext(AuthContext);
  const showToast = useToast();
  const likeCountRef = useRef();
  const [isLiked, setLike] = useState(
    authCtx.userData !== null
      ? props.likes.some((user) => {
          return user.uid === authCtx.userData.uid;
        })
      : false
  );

  const like = usePatchItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/${props.id}`,
    true,
    "like"
  );

  //if fetched data is different than the displayed data then update it
  //helps in using cached data reduces refetching of data
  //even when state is maintained locally helps in updating it when network fetched data changes
  useEffect(() => {
    if (
      authCtx.userData !== null &&
      props.likes.some((user) => {
        return user.uid === authCtx.userData.uid;
      }) !== isLiked
    ) {
      setLike(!isLiked);
    }
  }, [props.likes]);

  const sendLike = () => {
    if (authCtx.userData !== null) {
      like.mutate({});
      setLike((prevState) => {
        prevState
          ? likeCountRef.current.innerHTML--
          : likeCountRef.current.innerHTML++;
        return prevState === false;
      });
    } else {
      showToast("Login to like this post", false);
    }
  };

  useEffect(() => {
    if (like.isError) {
      like.reset();
      showToast("Something went wrong", false);
      setLike((prevState) => {
        prevState
          ? likeCountRef.current.innerHTML--
          : likeCountRef.current.innerHTML++;
        return prevState === false;
      });
    }
  }, [like.isError]);

  return (
    <div className="like">
      <img
        onClick={sendLike}
        src={isLiked ? likeFillled : likeUnfilled}
        alt="likeButton"
        style={{
          filter: themeCtx.isDarkMode
            ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
            : "none",
          cursor: like.isLoading ? "not-allowed" : "pointer",
        }}
      />
      <span ref={likeCountRef}>{props.likes.length}</span>
    </div>
  );
};
export default Like;
