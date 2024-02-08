import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfuly!" });
  } catch (error) {
    next(error);
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, "User not found"));
//     const validPassword = await bcryptjs.compare(password, validUser.password);
//     if (!validPassword) return errorHandler(401, "Wrong credentials");
//   } catch (error) {
//     next(error);
//   }
// };
