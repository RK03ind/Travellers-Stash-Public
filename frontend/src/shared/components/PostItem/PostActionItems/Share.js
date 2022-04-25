import share from "../../../../assets/share.svg";
import copy from "copy-to-clipboard";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import useToast from "../../../../hooks/useToast";

const Share = (props) => {
  const themeCtx = useContext(ThemeContext);
  const showToast = useToast();

  const copyPostLink = () => {
    copy(`https://travellers-stash.netlify.app/post/${props.id}`);
    showToast("Link copied successfully!!", true);
  };

  return (
    <img
      src={share}
      onClick={copyPostLink}
      alt=""
      style={{
        filter: themeCtx.isDarkMode
          ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
          : "none",
      }}
    />
  );
};

export default Share;
