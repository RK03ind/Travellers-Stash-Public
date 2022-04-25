import { useParams } from "react-router-dom";
import Loading from "../../shared/components/Loading/Loading";
import PostItem from "../../shared/components/PostItem/PostItem";
import useGetItems from "../../hooks/useGetItems";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";
import UserDetails from "../components/UserDetails";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileNav from "../components/ProfileNav";
import UserItem from "../components/UserItem";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const [currentNavItem, setCurrentNavItem] = useState("Posts");
  const { uid } = useParams();

  const user = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/${uid}/${
      authCtx.userData ? "logged-in" : ""
    }`,
    authCtx.userData ? true : false
  );

  return (
    <MainPageLayout
      active={
        authCtx.userData ? (authCtx.userData.uid === uid ? "user" : "") : ""
      }
    >
      {user.isLoading && <Loading />}
      {!user.isLoading && user.isSuccess && (
        <>
          <UserDetails
            {...user.data.user}
            isFollowing={
              authCtx.userData
                ? user.data.followingList.some((followedUser) => {
                    return followedUser.uid === uid;
                  })
                : false
            }
            invalidateKey={`${process.env.REACT_APP_BASE_API_URL}/user/${uid}/logged-in`}
          />
          <ProfileNav
            currentNavItem={currentNavItem}
            setCurrentNavItem={setCurrentNavItem}
            postsCount={user.data.posts.length}
            followersCount={user.data.user.followers.length}
            followingCount={user.data.user.following.length}
          />
          {currentNavItem === "Posts" &&
            user.data.posts.map((post) => {
              return (
                <PostItem
                  key={post._id}
                  id={post._id}
                  {...post}
                  saves={user.data.saves}
                  refetch={user.refetch}
                />
              );
            })}
          {currentNavItem === "Followers" &&
            user.data.user.followers.map((followingUser, index) => {
              return <UserItem {...followingUser} key={index} />;
            })}
          {currentNavItem === "Following" &&
            user.data.user.following.map((followedUser, index) => {
              return <UserItem {...followedUser} key={index} />;
            })}
        </>
      )}
    </MainPageLayout>
  );
};

export default UserProfile;
