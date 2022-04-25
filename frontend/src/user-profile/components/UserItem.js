import { useNavigate } from "react-router-dom";
import "./UserItem.css";

const UserItem = (props) => {
  const navigate = useNavigate();

  const goToUser = () => {
    navigate(`/user/${props.uid}`);
  };

  return (
    <div className="user-item-profile" onClick={goToUser}>
      <img src={props.profileImage} alt={props.uid} />
      <span>{props.uid}</span>
    </div>
  );
};

export default UserItem;
