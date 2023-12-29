const express = require("express");
const router = express.Router();
const usersController = require("../controllers/authController");

// Teraz masz dostęp do wszystkich funkcji eksportowanych przez usersController
const { getUsers, getUserById, updateUser, deleteUser } = usersController;
// Upewnij się, że register jest zdefiniowane przed użyciem w router.post
console.log("Before registerUser");
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
