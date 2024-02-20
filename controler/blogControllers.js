const mongoose = require("mongoose");
const blogModal = require("../modules/blogModule");
const userModal = require("../modules/userModle");
// const uploadImage = require("../config/imageStore");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModal.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "Blog Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blog List",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs ",
      error,
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, user, image } = req.body;
    if (!title || !description || !user || !image) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all Fields ",
      });
    }

    const userExists = await userModal.findById(user);
    if (!userExists) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    // const imagDta = await uploadImage(req.file);
    // const image = imagDta.url;
    // consolo.log("imagDta", imagDta);

    const newBlog = new blogModal({ title, description, image, user });
    const seassion = await mongoose.startSession();
    seassion.startTransaction();
    await newBlog.save({ seassion });
    userExists.blogs.push(newBlog);
    await userExists.save({ seassion });
    await seassion.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blg Created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Blogs ",
      error,
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModal.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Blogs",
      error,
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not found with this ",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While geting single Blog",
      error,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModal
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted succes",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While deleting Blog",
      error,
    });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    const userBlog = await userModal.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blog not found this ID",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user Blog",
      error,
    });
  }
};
