const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const carController = require("../controllers/carsController");
const checkToken = require("../middleware/checkToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add",
  checkToken,
  upload.array("images", 5),
  carController.addCar
);
router.get("/", carController.getAllCars);
router.get("/search", carController.searchCars);
router.get("/:carId", carController.getCar);
router.patch("/:carId", checkToken, carController.updateCar);
router.delete("/:carId", checkToken, carController.deleteCar);
router.patch("/favorite/:carId", checkToken, carController.toggleFavorite);

module.exports = router;
