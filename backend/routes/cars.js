const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsController");

// Teraz masz dostęp do wszystkich funkcji eksportowanych przez carsController
const { createCar, getCars, getCarById, updateCar, deleteCar } = carsController;
// Upewnij się, że createCar jest zdefiniowane przed użyciem w router.post
console.log("Before createCar");
router.post("/", createCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
