import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useGetItems from "../../hooks/useGetItems";
import Loading from "../../shared/components/Loading/Loading";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";
import PostItem from "../../shared/components/PostItem/PostItem";
import CommnentContainer from "../components/CommentContainer";
import "./Post.css";

const Post = (props) => {
  const authCtx = useContext(AuthContext);
  const { pid } = useParams();

  const postData = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/${pid}/${
      !authCtx.userData ? "" : "logged-in"
    }`,
    !authCtx.userData ? false : true
  );

  if (!postData.isLoading && (!postData.data || !postData.data.post)) {
    return (
      <MainPageLayout>
        <div className="not-found">
          <span>404</span>
          <span>Post not found</span>
        </div>
      </MainPageLayout>
    );
  } else {
    return (
      <MainPageLayout>
        {postData.isLoading && <Loading />}
        {!postData.isLoading && (
          <PostItem
            key={postData.data.post._id}
            id={postData.data.post._id}
            saves={postData.data.saves}
            refetch={postData.refetch}
            {...postData.data.post}
          />
        )}
        {!postData.isLoading && (
          <CommnentContainer
            comments={postData.data.post.comments}
            refetch={postData.refetch}
            id={postData.data.post._id}
          />
        )}
      </MainPageLayout>
    );
  }
};

export default Post;
