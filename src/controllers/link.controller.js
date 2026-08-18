import { constants } from "node:http2";
import linkModel from "../models/link.model.js";

export async function createLink(req, res) {
  try {
    const { original_url, slug } = req.body;
    const newLink = await linkModel.create(req.user.id, original_url, slug);

    return res.status(constants.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Link created successfully",
      data: newLink,
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}



