import { constants } from "node:http2";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {function()} next
 * @returns
 */
function corsMiddleware(req, res, next) {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(constants.HTTP_STATUS_NO_CONTENT);
  }
  next();
}

export default corsMiddleware;
