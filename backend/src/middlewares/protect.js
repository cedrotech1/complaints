import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import db from "../database/entity/index.js";
const User = db["Users"];

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from the token
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});
