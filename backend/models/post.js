const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  mapLink: { type: String, required: false },
  desc: { type: String, required: true },
  likes: { type: Array, required: false },
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      comment: { type: String, required: true },
    },
  ],
});

postSchema.virtual("author", {
  ref: "user",
  localField: "uid",
  foreignField: "uid",
  justOne: true,
});

postSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("post", postSchema);
