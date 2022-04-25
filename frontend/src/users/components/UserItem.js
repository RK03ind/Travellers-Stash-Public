import { useNavigate } from "react-router-dom";
import "./UserItem.css";

const UserItem = (props) => {
  const navigate = useNavigate();

  const goToUser = () => {
    navigate(`/user/${props.uid}`);
  };
  return (
    <div className="user-item" onClick={goToUser}>
      <div className="user-image">
        <img src={props.profileImage} alt={props.name} />
      </div>
      <div className="user-info">
        <span className="user-name">{props.name}</span>
        <span className="user-places">{`@${props.uid}`}</span>
      </div>
    </div>
  );
};
export default UserItem;
