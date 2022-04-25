import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import home from "../../../assets/home.svg";
import explore from "../../../assets/explore.svg";
import bookmark from "../../../assets/bookmark.svg";
import user from "../../../assets/user.svg";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const authCtx = useContext(AuthContext);

  return (
    <div className="sidebar-container">
      <Link to="/landing" style={{ textDecoration: "none" }}>
        <div
          className="sidebar-item"
          style={{
            background:
              props.active === "home"
                ? "var(--sidebar-highlight-color)"
                : "none",
          }}
        >
          <img
            src={home}
            style={{
              filter: themeCtx.isDarkMode
                ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                : "none",
            }}
            alt="home"
          />
          <span>Home</span>
        </div>
      </Link>
      <Link to="/saves" style={{ textDecoration: "none" }}>
        <div
          className="sidebar-item"
          style={{
            background:
              props.active === "bookmark"
                ? "var(--sidebar-highlight-color)"
                : "none",
          }}
        >
          <img
            src={bookmark}
            style={{
              filter: themeCtx.isDarkMode
                ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                : "none",
            }}
            alt="bookmark"
          />
          <span>Saves</span>
        </div>
      </Link>
      <Link to="/explore" style={{ textDecoration: "none" }}>
        <div
          className="sidebar-item"
          style={{
            background:
              props.active === "explore"
                ? "var(--sidebar-highlight-color)"
                : "none",
          }}
        >
          <img
            src={explore}
            style={{
              filter: themeCtx.isDarkMode
                ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                : "none",
            }}
            alt="explore"
          />
          <span>Explore</span>
        </div>
      </Link>
      <Link
        to={authCtx.userData ? `/user/${authCtx.userData.uid}` : "/login"}
        style={{ textDecoration: "none" }}
      >
        <div
          className="sidebar-item"
          style={{
            background:
              props.active === "user"
                ? "var(--sidebar-highlight-color)"
                : "none",
          }}
        >
          <img
            src={user}
            style={{
              filter: themeCtx.isDarkMode
                ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
                : "none",
            }}
            alt="profile"
          />
          <span>Profile</span>
        </div>
      </Link>
    </div>
  );
};
export default Sidebar;
