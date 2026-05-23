

import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminEmail = decoded.email;

    next();
  } catch (error) {
    console.log("adminAuth error", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default adminAuth;

