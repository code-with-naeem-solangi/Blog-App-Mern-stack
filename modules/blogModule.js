const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is Require"],
    },
    description: {
      type: String,
      require: [true, "Description is Require"],
    },
    image: {
      type: String,
      require: [true, "Image is Require"],
    },
    // prfImag: {
    //   type: String,
    //   require: [true, "Profife Image is Require"],
    // },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: [true, "user id is require"],
    },
  },
  { timestamps: true }
);

const blogModal = mongoose.model("Blog", blogSchema);

module.exports = blogModal;
