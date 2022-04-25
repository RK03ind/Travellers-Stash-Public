/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ThemeContext } from "../../../../context/ThemeContext";
import bookmarkFilled from "../../../../assets/bookmark-filled.svg";
import bookmarkUnfillled from "../../../../assets/bookmark.svg";
import usePostItems from "../../../../hooks/usePostItems";
import useToast from "../../../../hooks/useToast";

const Bookmark = (props) => {
  const themeCtx = useContext(ThemeContext);
  const authCtx = useContext(AuthContext);
  const showToast = useToast();

  const [isBookmarked, setBookmark] = useState(
    authCtx.userData ? props.saves.includes(props.id) : false
  );

  const bookmark = usePostItems(
    `${process.env.REACT_APP_BASE_API_URL}/bookmark/${props.id}`,
    true
  );

  //if fetched data is different than the displayed data then update it
  //helps in using cached data reduces refetching of data
  /*
  Error fixed by the useEffect(holds the same for like button):
  the on/off state of this button was maintained locally 
  so when pages were changed it was using the cached or old data 
  to initialize the state and hence showing old state of bookmarked/not
  which isnt a expected behaviour we want the latest state
  since state is not persisted when a component is unmounted 
  even tho the right state(on/off) was toggled, successfully posted to backend and
  shown initially but wrong state was shown after a page transistion because of old cached data.
  First solution was disabling cached data but it wasnt a good approach since, 
  it was causing refetch on every page change thus, this useEffect was used to 
  compare the values of latest network fetched data(which is refetched milliseconds after the state is
  initialized with old cached data) and the current state if they aren't equal, the state is updated
  also it helps the state to get updated when network refetched data changes although the state is 
  maintained locally  
  PS: the amount of likes in like button directly depends on the network fetched latest data
  i.e. no local state is used, the network fetched data is directly displayed for amount of likes
   */

  useEffect(() => {
    if (authCtx.userData && props.saves.includes(props.id) !== isBookmarked) {
      setBookmark(!isBookmarked);
    }
  }, [props.saves]);

  const changeBookmark = () => {
    if (authCtx.userData) {
      if (authCtx.userData.uid === props.uid) {
        return showToast("Cannot save your own post", false);
      }
      bookmark.mutate({});
      setBookmark((prevState) => {
        return prevState === false;
      });
    } else {
      showToast("Login to save this post", false);
    }
  };

  useEffect(() => {
    if (bookmark.isError) {
      showToast("Something went wrong", false);
      bookmark.reset();
      setBookmark((prevState) => {
        return prevState === false;
      });
    }
  }, [bookmark.isError]);

  useEffect(() => {
    if (bookmark.isSuccess && isBookmarked) {
      showToast("Saved successfully !!", true);
    }
    bookmark.reset();
  }, [bookmark.isSuccess]);

  return (
    <img
      src={isBookmarked ? bookmarkFilled : bookmarkUnfillled}
      onClick={changeBookmark}
      alt=""
      style={{
        cursor: bookmark.isLoading ? "not-allowed" : "pointer",
        filter: themeCtx.isDarkMode
          ? "invert(81%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
          : "none",
      }}
    />
  );
};

export default Bookmark;
