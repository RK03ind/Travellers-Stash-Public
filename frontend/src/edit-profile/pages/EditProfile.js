import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useGetItems from "../../hooks/useGetItems";
import Loading from "../../shared/components/Loading/Loading";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";
import ProfileImage from "../components/ProfileImage";
import UpdatePassword from "../components/UpdatePassword";

const EditProfile = () => {
  const authCtx = useContext(AuthContext);

  const userData = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/${authCtx.userData.uid}`,
    false
  );

  return (
    <MainPageLayout>
      {userData.isRefetching && <Loading />}
      {userData.isLoading && <Loading />}
      {!userData.isLoading && !userData.isRefetching && (
        <>
          <ProfileImage
            profileImage={userData.data.user.profileImage}
            refetch={userData.refetch}
          />
          <UpdatePassword />
        </>
      )}
    </MainPageLayout>
  );
};

export default EditProfile;
