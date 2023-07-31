const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const sendToken = require("../helpers/jwtHelpers");
const { isAutheticated } = require("../middleWare/auth");

router.get("/get-user", isAutheticated, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found!",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});
router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exist!",
      });
    }
    const newUser = await userModel.create({
      userName,
      email,
      password,
    });
    sendToken(newUser, 200, res);
  } catch (err) {
    return res.status(400).json(err);
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAccount = await userModel.findOne({ email });
    if (!existingAccount) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const matchPassword = await existingAccount.comparePassword(password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    sendToken(existingAccount, 200, res);
  } catch (err) {
    return res.status(400).json(err);
  }
});
router.post("/logout", async (req, res) => {
  try {
    const options = {
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res.cookie("user", null, options);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});
module.exports = router;
