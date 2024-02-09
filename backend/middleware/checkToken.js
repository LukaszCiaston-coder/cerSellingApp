const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Received Token:", token);

    if (!token) {
      // Brak nagłówka "Authorization", traktuj jako żądanie publiczne
      console.log("Public request, no Authorization header");
      return next();
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded User:", decoded);

    const user = await User.findOne({ _id: decoded.userId, token });

    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = checkToken;
