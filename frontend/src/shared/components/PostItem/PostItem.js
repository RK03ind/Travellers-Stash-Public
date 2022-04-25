/* eslint-disable react-hooks/exhaustive-deps */
import comment from "../../../assets/comment.svg";
import kebabIcon from "../../../assets/kebab-vertical.svg";
import deletePostSvg from "../../../assets/delete.svg";
import location from "../../../assets/location.svg";
import "./PostItem.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Like from "./PostActionItems/Like";
import Bookmark from "./PostActionItems/Bookmark";
import { AuthContext } from "../../../context/AuthContext";
import Share from "./PostActionItems/Share";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";
import useDeleteItems from "../../../hooks/useDeleteItems";

const PostItem = (props) => {
  const themeCtx = useContext(ThemeContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const showToast = useToast();
  const [showDeleteButton, setShowDelete] = useState(false);

  const deletePost = useDeleteItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/${props.id}/`,
    true
  );

  const sendDelete = () => {
    deletePost.mutate();
  };

  useEffect(() => {
    if (deletePost.isSuccess) {
      props.refetch();
      showToast("Deleted Successfully", true);
    }
  }, [deletePost.isSuccess]);

  const openGoogleMap = () => {
    if (props.mapLink) window.open(`${props.mapLink}`, "_blank");
  };

  const goToUserProfile = () => {
    navigate(`/user/${props.uid}`);
  };

  const goToPost = () => {
    navigate(`/post/${props.id}`);
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <img
          src={props.author.profileImage}
          onClick={goToUserProfile}
          alt="profileImage"
        />
        <div className="post-user-details" onClick={goToUserProfile}>
          <span>{props.author.name}</span>
          <span>@{props.uid}</span>
        </div>

        {authCtx.userData && authCtx.userData.uid === props.uid && (
          <>
            <div
              style={{ display: showDeleteButton ? "flex" : "none" }}
              onClick={sendDelete}
            >
              <img src={deletePostSvg} alt="" />
              Delete
            </div>
            <img
              src={kebabIcon}
              alt="kebab-menu"
              onClick={() => {
                setShowDelete((prevState) => {
                  return prevState === false;
                });
              }}
              data="Delete"
              style={{
                marginLeft: showDeleteButton ? "-0.6em" : "auto",
                filter: themeCtx.isDarkMode
                  ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                  : "none",
              }}
            />
          </>
        )}
      </div>
      <img
        className="post-image"
        src={props.image}
        onClick={goToPost}
        alt="postMainImage"
      />
      <div className="post-desc">
        <span>{props.title}</span>
        <div className="location" onClick={openGoogleMap}>
          <img
            src={location}
            alt=""
            style={{
              filter: themeCtx.isDarkMode
                ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                : "none",
              height: "28px",
            }}
          />
          <span>{props.location}</span>
        </div>
        <span>{props.desc}</span>
      </div>
      <div className="user-actions">
        <Like likes={props.likes} id={props.id} />
        <div className="comment" onClick={goToPost}>
          <img
            src={comment}
            alt=""
            style={{
              filter: themeCtx.isDarkMode
                ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                : "none",
            }}
          />
          <span>{props.comments.length}</span>
        </div>
        <Bookmark id={props.id} uid={props.uid} saves={props.saves} />
        <Share id={props.id} />
      </div>
    </div>
  );
};

export default PostItem;
