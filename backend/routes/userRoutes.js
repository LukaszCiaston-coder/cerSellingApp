// userRoutes.js
const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/userController");
const emailVerificationMiddleware = require("../middleware/emailVerification");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../tmp"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", checkToken, userController.logout);
router.get("/current", checkToken, userController.getCurrentUser);
router.patch(
  "/avatars",
  checkToken,
  upload.single("avatar"),
  userController.uploadAvatar
);
router.get("/verify/:verificationToken", userController.verifyEmail);
router.post(
  "/verify",
  emailVerificationMiddleware,
  userController.sendVerificationEmail
);

module.exports = router;
