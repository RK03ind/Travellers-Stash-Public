/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePatchItems from "../../hooks/usePatchItems";
import useToast from "../../hooks/useToast";
import "./UserDetails.css";

const UserDetails = (props) => {
  const authCtx = useContext(AuthContext);
  const followButtonRef = useRef();
  const showToast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateFollow = usePatchItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/follow`,
    true
  );

  useEffect(() => {
    if (updateFollow.isSuccess) {
      updateFollow.reset();
      queryClient.invalidateQueries(props.invalidateKey);
    }
  }, [updateFollow.isSuccess]);

  useEffect(() => {
    if (updateFollow.isError) {
      updateFollow.reset();

      showToast("Something went wrong", false);
    }
  }, [updateFollow.isError]);

  const sendFollowData = () => {
    if (!updateFollow.isLoading) {
      updateFollow.mutate({
        followId: props.uid,
        followIdImage: props.profileImage,
      });
      followButtonRef.current.disabled = true;
      followButtonRef.current.innerHTML = "Hold on...";
    }
  };

  const goToEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-details">
        <img src={props.profileImage} alt="profileImage" />
        <div className="id">
          <span>{`@${props.uid}`}</span>
          <span>{props.name}</span>
          {authCtx.userData && (
            <>
              {authCtx.userData.uid !== props.uid && props.isFollowing && (
                <button
                  className="following-button"
                  onClick={sendFollowData}
                  ref={followButtonRef}
                >
                  Following
                </button>
              )}
              {authCtx.userData.uid !== props.uid && !props.isFollowing && (
                <button
                  className="follow-button"
                  onClick={sendFollowData}
                  ref={followButtonRef}
                >
                  Follow
                </button>
              )}

              {authCtx.userData.uid === props.uid && (
                <button className="edit-button" onClick={goToEdit}>
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
