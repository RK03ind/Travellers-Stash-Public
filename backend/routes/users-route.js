const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const imageUpload = require("../middleware/image-upload");
const auth = require("../middleware/auth");

const userController = require("../controller/user-controller");

router.get("/:uid", userController.getUser);

router.get("/:uid/logged-in", auth, userController.getUserLoggedIn);

router.get("/", userController.getUsers);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.patch(
  "/profile-image",
  auth,
  upload.single("image"),
  imageUpload,
  userController.updateUserProfileImage
);

router.patch("/password", auth, userController.updateUserPassword);

router.patch("/follow", auth, userController.followUser);

module.exports = router;
