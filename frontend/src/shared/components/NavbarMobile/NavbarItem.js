import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

const NavbarItem = (props) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Link to={props.to}>
      <img
        style={{
          filter:
            props.active === props.alt
              ? "brightness(0) saturate(100%) invert(35%) sepia(32%) saturate(7480%) hue-rotate(192deg) brightness(100%) contrast(83%)"
              : themeCtx.isDarkMode
              ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
              : "none",
          transform: props.active === props.alt ? "scale(1)" : "none",
          mixBlendMode: props.active === props.alt ? "difference" : "normal",
        }}
        src={props.src}
        alt={props.alt}
      />
    </Link>
  );
};
export default NavbarItem;
