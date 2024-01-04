const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsController");

const { createCar, getCars, getCarById, updateCar, deleteCar, searchCars } =
  carsController;

router.post("/", createCar);
router.get("/search", searchCars); // Dodaj ścieżkę dla wyszukiwania przed ścieżkami z identyfikatorami ObjectId
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
