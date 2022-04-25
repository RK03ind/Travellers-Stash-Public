/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as AddImage } from "../../assets/add-image.svg";
import { ReactComponent as Location } from "../../assets/location.svg";
import "./NewPost.css";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";
import { useEffect, useRef, useState } from "react";
import usePostItems from "../../hooks/usePostItems";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

const NewPost = () => {
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("/");
  const imagePickerRef = useRef();
  const titleRef = useRef();
  const locationRef = useRef();
  const descRef = useRef();
  const submitButtonRef = useRef();
  const showToast = useToast();
  const navigate = useNavigate();
  const formData = new FormData();

  const addPost = usePostItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/`,
    true
  );

  useEffect(() => {
    if (addPost.isSuccess) {
      showToast("Post added successfully !!", true);
      navigate(`/post/${addPost.data.data._id}`);
      addPost.reset();
      submitButtonRef.current.disabled = false;
      submitButtonRef.current.innerHTML = "Post";
      titleRef.current.innerHTML = "";
      locationRef.current.innerHTML = "";
      descRef.current.innerHTML = "";
      setShowImage(false);
    }
  }, [addPost.isSuccess]);

  useEffect(() => {
    if (addPost.isError) {
      addPost.reset();
      showToast("Something went wrong try again", true);
    }
  }, [addPost.isError]);

  const sendPost = () => {
    const title = titleRef.current.innerText.trim();
    const address = locationRef.current.innerText.trim();
    const description = descRef.current.innerText.trim();

    if (showImage) {
      if (title === "" || address === "" || description === "") {
        showToast("Fill up all the fields", false);
      } else {
        formData.append("title", title);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("image", imagePickerRef.current.files[0]);
        submitButtonRef.current.disabled = true;
        submitButtonRef.current.innerHTML = "Posting...";
        addPost.mutate(formData);
      }
    } else {
      showToast("Add an image");
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
      if (file.size > 6291456) {
        showToast("Image cannot be greater than 6MB", false);
      } else {
        fileToBase64(file)
          .then((result) => {
            setImageSrc(result);
            setShowImage(true);
          })
          .catch(() => {
            showToast("Invalid or Corrupted image", false);
          });
      }
    } else {
      showToast("Not an image", false);
    }
  };

  return (
    <>
      <MainPageLayout active="add">
        <div className="new-post-container">
          {showImage && <img className="display-image" src={imageSrc} alt="" />}
          <div
            className="image-input"
            style={{ display: showImage ? "none" : "flex" }}
          >
            <AddImage />
            <label>
              Add Image
              <input
                type="file"
                ref={imagePickerRef}
                name="image"
                accept=".jpg,.png,.jpeg"
                onChange={onImageSelect}
              />
            </label>
          </div>

          <div
            className="title"
            ref={titleRef}
            contentEditable="true"
            type="text"
            spellCheck="false"
            data-placeholder="Enter a Title"
          ></div>
          <div className="location-container">
            <Location />
            <div
              ref={locationRef}
              contentEditable="true"
              type="text"
              spellCheck="false"
              data-placeholder="Enter location of the place"
            ></div>
          </div>
          <div
            ref={descRef}
            className="description"
            contentEditable="true"
            type="text"
            spellCheck="false"
            data-placeholder="Enter a description of the place"
          ></div>
        </div>
        <button
          onClick={sendPost}
          ref={submitButtonRef}
          className="post-button"
        >
          Post
        </button>
      </MainPageLayout>
    </>
  );
};

export default NewPost;
