const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  followingList: [
    {
      uid: { type: String, required: true },
    },
  ],
  followersList: [
    {
      uid: { type: String, required: true },
    },
  ],
  saved: { type: Array, required: false },
});

userSchema.virtual("following", {
  ref: "user",
  localField: "followingList.uid",
  foreignField: "uid",
});

userSchema.virtual("followers", {
  ref: "user",
  localField: "followersList.uid",
  foreignField: "uid",
});
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("user", userSchema);
