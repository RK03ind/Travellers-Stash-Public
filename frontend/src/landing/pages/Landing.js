import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import passport from "../../assets/passport.png";
import "./Landing.css";
import use100vh from "../../hooks/use100vh";

const Landing = (props) => {
  return (
    <>
      <div className="landing-main-container" style={{ height: use100vh() }}>
        <div className="landing-header">
          <div className="landing-header-title">
            <img src={passport} alt="landing-header-icon" />
            <span>Travellers Stash</span>
          </div>
          <MediaQuery maxWidth={768}>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </MediaQuery>
          <MediaQuery minWidth={769}>
            <div className="button-header-desktop">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "var(--secondary-button)",
                  }}
                >
                  Signup
                </button>
              </Link>
            </div>
          </MediaQuery>
        </div>
        <div className="landing-content">
          <div className="landing-text">
            <span className="main-text-landing">
              <MediaQuery minWidth={769}>
                Share and discover the beauty <br />
                of this amazing world 🌎
              </MediaQuery>
              <MediaQuery maxWidth={768}>
                Share and discover the beauty of this amazing world 🌎
              </MediaQuery>
            </span>
            <span className="sub-text-landing">
              Share places you've visited or you want to visit
            </span>
            <Link to="/signup">
              <button className="get-started">Get started</button>
            </Link>
          </div>
          <div className="landing-hero">
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1645087018/landing-hero.8dbb7218927245d28f52_cgpji9.png"
              alt="landing-hero"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
