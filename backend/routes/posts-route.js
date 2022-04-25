const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const postsController = require("../controller/posts-controller");
const imageUpload = require("../middleware/image-upload");

router.get("/feed", auth, postsController.getPostsForFeed); //get all the posts for a users feed(user id would be passed by auth)

router.get("/:pid", postsController.getPostById);

//all protected routes

router.get("/:pid/logged-in", auth, postsController.getPostByIdForLoggedInUser);

router.patch("/:pid", auth, postsController.updatePost); //This route is used to update comments and likes

router.delete("/:pid", auth, postsController.deletePost); //verify if user id passed by auth middleware is equals to post uid

router.post(
  "/",
  auth,
  upload.single("image"),
  imageUpload,
  postsController.createPost
);

module.exports = router;
