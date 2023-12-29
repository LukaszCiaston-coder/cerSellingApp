const { Car } = require("../models/carModel");

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCar = async (req, res) => {
  const { make, model, year, price, description, owner } = req.body;

  try {
    // Import ObjectId z mongoose
    const { ObjectId } = require("mongoose").Types;

    // Sprawdź, czy owner jest poprawnym ObjectId
    if (!ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const newCar = new Car({ make, model, year, price, description, owner });
    await newCar.save();
    res.status(201).json({ car: newCar });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price, description } = req.body;

  try {
    const car = await Car.findByIdAndUpdate(
      id,
      { make, model, year, price, description },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
