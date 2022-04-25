const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

const setBookmark = async (req, res) => {
  const [{ saved }, post] = await Promise.all([
    User.findOne({ _id: req.user }),
    Post.findOne({ _id: req.params.pid }),
  ]);

  if (post) {
    if (saved.includes(req.params.pid)) {
      return res.json(
        await User.updateOne(
          { _id: req.user },
          {
            $pull: {
              saved: req.params.pid,
            },
          }
        )
      );
    }
    return res.json(
      await User.updateOne(
        { _id: req.user },
        {
          $push: {
            saved: req.params.pid,
          },
        }
      )
    );
  }
  return res.status(404).json({});
};

const getAllBookmarkedPost = async (req, res) => {
  try {
    const { saved } = await User.findOne({ _id: req.user });
    const savedPosts = await Post.find({ _id: { $in: saved } }).populate({
      path: "author",
      select: "name profileImage -_id",
    });
    res.json({
      posts: savedPosts,
      saves: saved,
    });
  } catch {
    res.status(500).json("Something went wrong");
  }
};

module.exports = { setBookmark, getAllBookmarkedPost };
