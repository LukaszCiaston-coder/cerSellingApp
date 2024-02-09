const mongoose = require("mongoose");
const { Car, validateCar } = require("../models/carModel");

const addCar = async (req, res, next) => {
  try {
    console.log("Decoded User:", req.user);
    const { error } = validateCar(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation error", error });
    }

    const images = req.files.map((file) => file.filename);

    const car = new Car({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      description: req.body.description,
      mileage: req.body.mileage,
      engineType: req.body.engineType,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      images: images,
    });

    car.owner = new mongoose.Types.ObjectId(req.user._id);

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

const getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.find().populate("owner", "email");
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

const getCar = async (req, res, next) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findById(carId).populate("owner", "email");

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const carId = req.params.carId;
    const updatedCar = req.body;

    const { error } = validateCar(updatedCar);
    if (error) {
      return res.status(400).json({ message: "Validation error", error });
    }

    const car = await Car.findByIdAndUpdate(carId, updatedCar, { new: true });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You are not the owner of this car" });
    }

    await car.remove();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const isFavorite = car.favoriteBy.includes(req.user._id);

    if (!isFavorite) {
      car.favoriteBy.push(req.user._id);
    } else {
      const index = car.favoriteBy.indexOf(req.user._id);
      car.favoriteBy.splice(index, 1);
    }

    await car.save();

    res.status(200).json({ favorite: !isFavorite });
  } catch (error) {
    next(error);
  }
};
const searchCars = async (req, res) => {
  const { query } = req.query;

  try {
    const cars = await Car.find({
      $or: [
        { make: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
      ],
    });

    if (cars.length === 0) {
      return res
        .status(404)
        .json({ message: "No advertisements found in the database." });
    }

    res.status(200).json({ cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addCar,
  getAllCars,
  getCar,
  updateCar,
  deleteCar,
  toggleFavorite,
  searchCars,
};
