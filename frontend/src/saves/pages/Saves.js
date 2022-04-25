/* eslint-disable react-hooks/exhaustive-deps */
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";
import PostItem from "../../shared/components/PostItem/PostItem";
import useGetItems from "../../hooks/useGetItems";
import { useEffect } from "react";
import Loading from "../../shared/components/Loading/Loading";
import useToast from "../../hooks/useToast";

const Saves = () => {
  const showToast = useToast();

  const posts = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/bookmark/`,
    true
  );

  useEffect(() => {
    if (posts.isError) {
      showToast("Something went wrong", false);
    }
  }, [posts.isError]);

  return (
    <MainPageLayout active="bookmark">
      {posts.isLoading && <Loading />}
      {!posts.isLoading &&
        !posts.isError &&
        posts.data.posts.map((post) => {
          return (
            <PostItem
              key={post._id}
              id={post._id}
              {...post}
              saves={posts.data.saves}
              refetch={posts.refetch}
            />
          );
        })}
      {!posts.isLoading && !posts.isError && posts.data.posts.length === 0 && (
        <h2
          style={{
            fontFamily: "Montserrat",
            textAlign: "center",
            marginTop: "5em",
            color: "var(--primary-text-color)",
          }}
        >
          No Saved Post Found
        </h2>
      )}
    </MainPageLayout>
  );
};

export default Saves;
