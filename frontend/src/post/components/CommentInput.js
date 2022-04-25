/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePatchItems from "../../hooks/usePatchItems";
import useToast from "../../hooks/useToast";
import "./CommentInput.css";

const CommentInput = (props) => {
  const authCtx = useContext(AuthContext);
  const commentInputRef = useRef();
  const postButtonRef = useRef();
  const showToast = useToast();

  const postComment = usePatchItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/${props.id}`,
    true,
    "comment"
  );

  useEffect(() => {
    if (postComment.isSuccess) {
      postComment.reset();
      props.refetch();
      showToast("Commented successfully", true);
      postButtonRef.current.disabled = false;
      postButtonRef.current.innerHTML = "Post";
      commentInputRef.current.value = "";
      setTimeout(() => {
        props.scrollEnd();
      }, 1600);
    }
  }, [postComment.isSuccess]);

  useEffect(() => {
    if (postComment.isError) {
      postComment.reset();
      showToast("Something went wrong", false);
    }
  }, [postComment.isError]);

  const sendComment = () => {
    if (!authCtx.userData) {
      return showToast("Login to comment", false);
    }
    if (commentInputRef.current.value.trim() !== "") {
      postComment.mutate({
        comment: commentInputRef.current.value,
      });
      postButtonRef.current.disabled = true;
      postButtonRef.current.innerHTML = "Posting..";
    } else {
      showToast("Write Something to comment", false);
    }
  };

  return (
    <>
      <label>Comments</label>
      <div className="comment-input-container">
        <input
          ref={commentInputRef}
          type="text"
          placeholder="Enter your comment here"
        />
        <button ref={postButtonRef} onClick={sendComment}>
          Post
        </button>
      </div>
    </>
  );
};
export default CommentInput;
