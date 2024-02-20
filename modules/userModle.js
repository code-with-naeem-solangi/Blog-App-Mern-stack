const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is requierd"],
    },
    email: {
      type: String,
      required: [true, "Email is requierd"],
    },
    password: {
      type: String,
      required: [true, "Password is requierd"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);
const userModal = mongoose.model("user", userSchema);

module.exports = userModal;
