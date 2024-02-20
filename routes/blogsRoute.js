const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controler/blogControllers");
const multer = require("multer");
const upload = multer({});
const router = express.Router();

router.get("/all-blog", getAllBlogsController);

router.post("/create-blog", upload.single("image"), createBlogController);

router.put("/update-blog/:id", updateBlogController);

router.get("/get-blog/:id", getBlogByIdController);

router.delete("/delete-blog/:id", deleteBlogController);

router.get("/user-blg/:id", userBlogController);

module.exports = router;
