import "./ProfileNav.css";

const ProfileNav = (props) => {
  const setPostsActive = () => {
    props.setCurrentNavItem("Posts");
  };

  const setFollowersActive = () => {
    props.setCurrentNavItem("Followers");
  };

  const setFollowingActive = () => {
    props.setCurrentNavItem("Following");
  };

  return (
    <div className="profile-nav">
      <div
        className="profile-nav-item"
        onClick={setPostsActive}
        style={{
          borderBottom:
            props.currentNavItem === "Posts" ? "5px solid #c000d4" : "0px",
        }}
      >
        <span className="count">{props.postsCount}</span>
        <span className="title">{props.postsCount > 1 ? "Posts" : "Post"}</span>
      </div>
      <div
        className="profile-nav-item"
        onClick={setFollowersActive}
        style={{
          borderBottom:
            props.currentNavItem === "Followers" ? "5px solid #c000d4" : "0px",
        }}
      >
        <span className="count">{props.followersCount}</span>
        <span className="title">Followers</span>
      </div>
      <div
        className="profile-nav-item"
        onClick={setFollowingActive}
        style={{
          borderBottom:
            props.currentNavItem === "Following" ? "5px solid #c000d4" : "0px",
        }}
      >
        <span className="count">{props.followingCount}</span>
        <span className="title">Following</span>
      </div>
    </div>
  );
};

export default ProfileNav;
