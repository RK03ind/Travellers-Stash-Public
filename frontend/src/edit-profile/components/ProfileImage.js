/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import usePatchItems from "../../hooks/usePatchItems";
import upload from "../../assets/upload.svg";
import confirm from "../../assets/confirm.svg";
import "./ProfileImage.css";
import useToast from "../../hooks/useToast";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

const ProfileImage = (props) => {
  const [profileImageSrc, setProfileImageSrc] = useState(props.profileImage);
  const [isImageValid, setImageValid] = useState(false);
  const showToast = useToast();
  const confirmRef = useRef();
  const imagePickerRef = useRef();

  const updateImage = usePatchItems(
    `${process.env.REACT_APP_BASE_API_URL}/user/profile-image`,
    true
  );

  useEffect(() => {
    if (updateImage.isError) {
      showToast("Something went wrong", false);
      confirmRef.current.innerHTML = "Confirm";
      updateImage.reset();
    }
  }, [updateImage.isError]);

  useEffect(() => {
    if (updateImage.isSuccess) {
      showToast("Image updated successfully", true);
      confirmRef.current.innerHTML = "Confirm";
      updateImage.reset();
      props.refetch();
    }
  }, [updateImage.isSuccess]);

  const sendSelectedImage = () => {
    if (!updateImage.isLoading && isImageValid) {
      const formData = new FormData();
      formData.append("image", imagePickerRef.current.files[0]);
      updateImage.mutate(formData);
      confirmRef.current.innerHTML = "....";
      confirmRef.current.disabled = true;
    } else if (!updateImage.isLoading) {
      showToast("Select an image", false);
    }
  };

  const onImageSelect = (event) => {
    const file = event.target.files[0];
    if (
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png") &&
      file.size > 0
    ) {
      if (file.size > 4194304) {
        showToast("Image cannot be greater than 4MB", false);
        setImageValid(false);
      } else {
        fileToBase64(file)
          .then((result) => {
            setProfileImageSrc(result);
            setImageValid(true);
          })
          .catch(() => {
            showToast("Invalid or Corrupted image", false);
            setImageValid(false);
          });
      }
    } else {
      setImageValid(false);
      showToast("Not an image", false);
    }
  };

  return (
    <div className="profile-image-container">
      <img src={profileImageSrc} alt="profileImage" className="profile-image" />
      <div className="user-action-container">
        <div className="upload">
          <img src={upload} alt="upload" />
          <label>
            Upload
            <input
              type="file"
              name="image"
              onChange={onImageSelect}
              ref={imagePickerRef}
              accept=".jpg,.png,.jpeg"
            />
          </label>
        </div>
        <div className="confirm" onClick={sendSelectedImage}>
          <img src={confirm} alt="confirm" />
          <span ref={confirmRef}>Confirm</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
