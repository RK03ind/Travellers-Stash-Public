import useGetItems from "../../hooks/useGetItems";
import UserItem from "../components/UserItem";
import Loading from "../../shared/components/Loading/Loading";
import "./Users.css";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";

const Users = () => {
  const userData = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/user`,
    false
  );

  return (
    <>
      <MainPageLayout active="explore">
        {userData.isLoading && <Loading />}
        {!userData.isLoading &&
          userData.data.map((user) => {
            return (
              <UserItem
                key={user.uid}
                uid={user.uid}
                profileImage={user.profileImage}
                name={user.name}
              />
            );
          })}
      </MainPageLayout>
    </>
  );
};

export default Users;
