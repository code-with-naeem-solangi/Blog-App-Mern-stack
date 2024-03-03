const userModal = require("../modules/userModle");
const bcrypt = require("bcryptjs");
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const exsistingUser = await userModal.findOne({ email });
    if (exsistingUser) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModal({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register callback",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registerd",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login callback",
      error,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModal.find({});
    return res.status(201).send({
      userCount: users.length,
      success: true,
      message: "All User Data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error inGet all users",
      error,
    });
  }
};
