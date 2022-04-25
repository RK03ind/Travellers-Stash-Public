const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
let validator = require("validator");
const User = require("../models/user");
const Post = require("../models/post");

const getUser = async (req, res, next) => {
  const [requestedUser, userPosts] = await Promise.all([
    User.findOne({ uid: req.params.uid }, { _id: 0, email: 0, password: 0 })
      .populate({ path: "followers", select: "uid profileImage -_id" })
      .populate({ path: "following", select: "uid profileImage -_id" }),
    Post.find({ uid: req.params.uid }).populate({
      path: "author",
      select: "name profileImage -_id",
    }),
  ]);

  if (requestedUser) {
    res.json({
      user: requestedUser,
      posts: userPosts ? userPosts : [],
      saves: [],
    });
  } else {
    res.status(404).json("User not found");
  }
};

const getUserLoggedIn = async (req, res) => {
  const [requestedUser, userPosts, { followingList, uid, saved }] =
    await Promise.all([
      User.findOne({ uid: req.params.uid }, { _id: 0, email: 0, password: 0 })
        .populate({ path: "followers", select: "uid profileImage -_id" })
        .populate({ path: "following", select: "uid profileImage -_id" }),
      Post.find({ uid: req.params.uid }).populate({
        path: "author",
        select: "name profileImage -_id",
      }),
      User.findOne({ _id: req.user }),
    ]);

  if (requestedUser) {
    return res.json({
      user: requestedUser,
      followingList: followingList,
      posts: userPosts ? userPosts : [],
      saves: uid !== req.params.uid ? saved : [],
    });
  }
  res.status(404).json("User not found");
};

const getUsers = async (req, res, next) => {
  res.json(await User.find({}, { _id: 0, email: 0, password: 0 }));
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const searchedUser = await User.findOne({ email: email });

  if (!searchedUser)
    return res.status(422).json({ message: "Email doesn't exist" });

  if (bcrypt.compareSync(password, searchedUser.password))
    return res.json({
      token: jwt.sign({ id: searchedUser._id }, process.env.JWT_SALT),
      uid: searchedUser.uid,
    });

  res.status(401);
  return res.json({ message: "Incorrect password" });
};

const signup = async (req, res, next) => {
  const { name, uid, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 8);

  if (!validator.isEmail(email)) {
    return res.status(422).json("Invalid email");
  }

  const searchedUser = await User.findOne({
    $or: [{ email: email }, { uid: uid }],
  });

  const createdUser = new User({
    uid: uid,
    name: name,
    email: email,
    password: passwordHash,
    profileImage: `https://avatars.dicebear.com/api/avataaars/${uid}.svg`,
  });

  if (searchedUser) {
    return res.status(409).json("User name or Email is already used");
  }
  const result = await createdUser.save();
  const token = jwt.sign({ id: result._id }, process.env.JWT_SALT);
  res.json({
    uid: uid,
    token: token,
  });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { password } = await User.findOne({ _id: req.user });
  if (bcrypt.compareSync(oldPassword, password)) {
    return res.json(
      await User.updateOne(
        { _id: req.user },
        { password: bcrypt.hashSync(newPassword, 8) }
      )
    );
  }
  return res.status(406).json({ message: "Incorrect password entered" });
};

const updateUserProfileImage = async (req, res) => {
  const { imageLink } = req.body;
  res.json(
    await User.updateOne({ _id: req.user }, { profileImage: imageLink })
  );
};

const followUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user });

  if (req.body.followId === user.uid) {
    return res.status(403).json("Some data was tampered on the server side");
  }

  if (
    user.followingList.some((followedUser) => {
      return followedUser.uid === req.body.followId;
    })
  ) {
    await User.updateOne(
      { _id: req.user },
      { $pull: { followingList: { uid: req.body.followId } } }
    );
    await User.updateOne(
      { uid: req.body.followId },
      { $pull: { followersList: { uid: user.uid } } }
    );
    return res.json({});
  }

  await User.updateOne(
    { _id: req.user },
    {
      $push: {
        followingList: {
          uid: req.body.followId,
        },
      },
    }
  );
  await User.updateOne(
    { uid: req.body.followId },
    { $push: { followersList: { uid: user.uid } } }
  );
  return res.json({});
};

module.exports = {
  getUsers,
  getUserLoggedIn,
  login,
  signup,
  getUser,
  updateUserPassword,
  updateUserProfileImage,
  followUser,
};
