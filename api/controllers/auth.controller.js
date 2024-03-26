import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { validateEmail, validateUsername, validatePassword } from "../utils/validation.js";

const updateTokenExpiration = (res, token) => {
  // Set the expiration time for the token cookie
  const expiryDate = new Date(Date.now() + process.env.JWT_EXPIRATION * 1000); // Convert seconds to milliseconds
  res.cookie("access_token", token, {
    httpOnly: true,
    expires: expiryDate,
  });
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate username
  if (!validateUsername(username)) {
    return next(
      errorHandler(
        400,
        "Invalid username: should contains at least one number and one uppercase character"
      )
    );
  }
  // Validate email
  if (!validateEmail(email)) {
    return next(errorHandler(400, "Invalid email address"));
  }
  // Validate password
  if (!validatePassword(password)) {
    return next(
      errorHandler(
        400,
        "Invalid password: should contains at least 8 characters including one uppercase, one lowercase, one digit, and one special character"
      )
    );
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfuly!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    updateTokenExpiration(res, token); // Update token expiration
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      updateTokenExpiration(res, token); // Update token expiration
      res.status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      updateTokenExpiration(res, token); // Update token expiration
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
