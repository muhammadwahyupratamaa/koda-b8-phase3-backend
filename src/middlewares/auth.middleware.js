import { constants } from "node:http2";
import libjwt from "../lib/jwt.js";

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!token) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized : Token not found",
    });
  }

  try {
    const payload = libjwt.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "invalid or expired token",
    });
  }
}

export default authMiddleware;
