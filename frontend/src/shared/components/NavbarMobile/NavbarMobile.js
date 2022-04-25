import home from "../../../assets/home.svg";
import explore from "../../../assets/explore.svg";
import add from "../../../assets/add-box.svg";
import bookmark from "../../../assets/bookmark.svg";
import user from "../../../assets/user.svg";
import "./NavbarMobile.css";
import NavbarItem from "./NavbarItem";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const NavbarMobile = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <nav>
      <NavbarItem src={home} to="/" active={props.active} alt="home" />
      <NavbarItem
        src={explore}
        to="/explore"
        active={props.active}
        alt="explore"
      />
      <NavbarItem src={add} to="/post/new" active={props.active} alt="add" />
      <NavbarItem
        src={bookmark}
        to="/saves"
        active={props.active}
        alt="bookmark"
      />
      <NavbarItem
        src={user}
        to={authCtx.userData ? `/user/${authCtx.userData.uid}` : "/login"}
        active={props.active}
        alt="user"
      />
    </nav>
  );
};
export default NavbarMobile;
