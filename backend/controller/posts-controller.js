const mongoose = require("mongoose");
const getMapLink = require("../service/geocoding");
const User = require("../models/user");
const Post = require("../models/post");

const getPostsForFeed = async (req, res) => {
  const { followingList, saved } = await User.findOne({ _id: req.user });

  let followingIds = followingList.map((followedUser) => {
    return followedUser.uid;
  });

  if (followingList.length !== 0) {
    return res.json({
      posts: (
        await Post.find({ uid: { $in: followingIds } }).populate({
          path: "author",
          select: "name profileImage -_id",
        })
      ).reverse(),

      saves: saved,
    });
  }
  return res.json({ posts: [] });
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.pid })
      .populate({
        path: "author",
        select: "uid name profileImage -_id",
      })
      .populate({
        path: "comments.author",
        select: "uid profileImage -_id",
      });
    if (post) {
      return res.json({
        post: post,
      });
    }
    throw Error();
  } catch {
    return res.status(404).json("Post not found");
  }
};

const getPostByIdForLoggedInUser = async (req, res, next) => {
  try {
    const [post, { saved }] = await Promise.all([
      Post.findOne({ _id: req.params.pid })
        .populate({
          path: "author",
          select: "name profileImage -_id",
        })
        .populate({
          path: "comments.author",
          select: "uid profileImage -_id",
        }),
      User.findOne({ _id: req.user }),
    ]);

    if (post) {
      return res.json({
        post: post,
        saves: saved,
      });
    }
    throw Error();
  } catch {
    return res.status(404).json("Post not found");
  }
};

const createPost = async (req, res, next) => {
  const { title, imageLink, address, description } = req.body;
  const { uid } = await User.findOne({ _id: req.user });

  const createdPost = new Post({
    uid: uid,
    title: title,
    image: imageLink,
    location: address,
    mapLink: await getMapLink(address),
    desc: description,
  });

  res.json(await createdPost.save());
};

const updatePost = async (req, res) => {
  //check for modifiedCount === 1 (on no data change its equal to zero) in client side on every post request

  const [post, { uid }] = await Promise.all([
    Post.findOne({ _id: req.params.pid }).populate({
      path: "comments.author",
      select: "uid profileImage -_id",
    }),
    User.findOne({ _id: req.user }),
  ]);

  if (!post) return res.status(404).json({});

  const action = req.header("action");

  if (action === "like") {
    if (
      post.likes.some((like) => {
        return like.uid === uid;
      })
    ) {
      return res.json(
        await Post.updateOne(
          { _id: req.params.pid },
          { $pull: { likes: { uid: uid } } }
        )
      );
    }
    return res.json(
      await Post.updateOne(
        { _id: req.params.pid },
        {
          $push: { likes: { uid: uid } },
        }
      )
    );
  } else if (action === "comment") {
    if (req.body.comment !== undefined || req.body.comment !== "") {
      return res.json(
        await Post.updateOne(
          { _id: req.params.pid },
          {
            $push: {
              comments: {
                author: req.user,
                _id: new mongoose.Types.ObjectId(),
                comment: req.body.comment.trimEnd().trimStart(),
              },
            },
          }
        )
      );
    }
    return res.status(404).json("No comment found");
  } else if (action === "delete_comment") {
    if (req.body.id === undefined) return res.status(404).json({});
    if (
      post.comments.some((comment) => {
        return (
          comment._id.toString() === req.body.id && uid === comment.author.uid
        );
      })
    ) {
      return res.json(
        await Post.updateOne(
          { _id: req.params.pid },
          {
            $pull: {
              comments: {
                _id: new mongoose.Types.ObjectId(req.body.id),
              },
            },
          }
        )
      );
    }
    return res.status(403).json({});
  }
};

const deletePost = async (req, res) => {
  const [post, user] = await Promise.all([
    Post.findOne({ _id: req.params.pid }),
    User.findOne({ _id: req.user }),
  ]);

  if (!user || !post) return res.status(404).json({});

  if (post.uid === user.uid) {
    return res.json(await Post.deleteOne({ _id: req.params.pid }));
  }

  res.status(403).json("You're not allowed to delete this post");
};

module.exports = {
  getPostsForFeed,
  getPostById,
  getPostByIdForLoggedInUser,
  createPost,
  updatePost,
  deletePost,
};
