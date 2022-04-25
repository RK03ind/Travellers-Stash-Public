const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bookmarkController = require("../controller/bookmark-controller");

router.get("/", auth, bookmarkController.getAllBookmarkedPost);

router.post("/:pid", auth, bookmarkController.setBookmark);

module.exports = router;
