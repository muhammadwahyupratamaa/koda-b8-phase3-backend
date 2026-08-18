import { constants } from "node:http2";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import libjwt from "../lib/jwt.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      return res.status(constants.HTTP_STATUS_CONFLICT).json({
        success: false,
        message: "Email already exist",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create(name, email, passwordHash);

    return res.status(constants.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Register Account Successfully",
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email, {
      withPassword: true,
    });

    if (!user) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "Email Password is Invalid",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "Email Password is Invalid",
      });
    }

    const token = libjwt.sign({
      id: user.id,
    });

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "Login success",
      token,
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

export default {
  register,
  login,
};
