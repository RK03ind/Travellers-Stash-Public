/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePatchItems from "../../hooks/usePatchItems";
import useToast from "../../hooks/useToast";
import "./CommentItem.css";

const CommentItem = (props) => {
  const authCtx = useContext(AuthContext);
  const showToast = useToast();

  const commentDeleteApi = usePatchItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/${props.pid}`,
    true,
    "delete_comment"
  );

  useEffect(() => {
    if (commentDeleteApi.isSuccess) {
      commentDeleteApi.reset();
      showToast("Comment deleted successfully", true);
      props.refetch();
    }
  }, [commentDeleteApi.isSuccess]);

  useEffect(() => {
    if (commentDeleteApi.isError) {
      commentDeleteApi.reset();
      showToast("Unable to delete comment");
    }
  }, [commentDeleteApi.isError]);

  const deleteComment = () => {
    commentDeleteApi.mutate({
      id: props.id,
    });
  };

  return (
    <div className="comment-item">
      <div className="comment-user-details">
        <img src={props.profileImage} alt="profileImage" />
        <span>{`${props.uid}`}</span>
      </div>
      <div className="comment">{props.comment}</div>
      {authCtx.userData ? (
        authCtx.userData.uid === props.uid ? (
          <span onClick={deleteComment}>Delete</span>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default CommentItem;
