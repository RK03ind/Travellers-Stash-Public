import MediaQuery from "react-responsive";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import "./MainPageLayout.css";

const MainPageLayout = ({ children, active }) => {
  return (
    <>
      <MediaQuery minWidth={769}>
        <Header />
        <div className="main-container">
          <Sidebar active={active} />
          <div className="list">{children}</div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <Header />
        <div className="list">{children}</div>
        <NavbarMobile active={active} />
      </MediaQuery>
    </>
  );
};

export default MainPageLayout;
