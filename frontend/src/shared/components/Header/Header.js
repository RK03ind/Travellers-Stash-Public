import passport from "../../../assets/passport.png";
import MediaQuery from "react-responsive";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  const themeCtx = useContext(ThemeContext);
  return (
    <>
      <header className="main-header">
        <div className="header-title-container">
          <img src={passport} alt="header-icon" />
          <span>
            Travellers <span>Stash</span>
          </span>
        </div>

        <MediaQuery maxWidth={768}>
          <DarkModeSwitch
            size={32}
            style={{
              marginRight: "1.2em",
              WebkitTapHighlightColor: "transparent",
              hover: "var(--sidebar-highlight-color)",
            }}
            checked={themeCtx.isDarkMode}
            onChange={themeCtx.toggleTheme}
          />
        </MediaQuery>
        <MediaQuery minWidth={769}>
          {/* <DarkModeToggle
          size={60}
          onChange={themeCtx.toggleTheme}
          checked={themeCtx.isDarkMode}
          className="dark-mode-button"
        /> */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <DarkModeSwitch
              size={32}
              style={{
                WebkitTapHighlightColor: "transparent",
                hover: "var(--sidebar-highlight-color)",
              }}
              checked={themeCtx.isDarkMode}
              onChange={themeCtx.toggleTheme}
            />
            <Link to="/post/new">
              <button>+ New Post</button>
            </Link>
          </div>
        </MediaQuery>
      </header>
    </>
  );
};

export default Header;
