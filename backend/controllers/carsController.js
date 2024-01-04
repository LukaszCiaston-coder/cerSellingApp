const { Car } = require("../models/carModel");
const { ObjectId } = require("mongoose").Types;

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ cars });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCar = async (req, res) => {
  const { make, model, year, price, description, owner, photos } = req.body;

  try {
    // Ensure that photoId values are valid ObjectId instances
    const validatedPhotos = photos.map((photo) => ({
      photoId: new ObjectId(photo.photoId),
      url: photo.url,
    }));

    // Sprawdź, czy owner jest poprawnym ObjectId
    if (!ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const newCar = new Car({
      make,
      model,
      year,
      price,
      description,
      owner,
      photos: validatedPhotos,
    });

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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchCars = async (req, res) => {
  const { query } = req.query;

  try {
    const cars = await Car.find({
      $or: [
        { make: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCars,
};
