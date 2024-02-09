// carModel.js

const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Make is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required"],
    },
    engineType: {
      type: String,
      required: [true, "Engine Type is required"],
    },
    transmission: {
      type: String,
      required: [true, "Transmission is required"],
    },
    fuelType: {
      type: String,
      required: [true, "Fuel Type is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: [String],
      required: true,
    },
    favoriteBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

function validateCar(car) {
  const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    mileage: Joi.number().required(),
    engineType: Joi.string().required(),
    transmission: Joi.string().required(),
    fuelType: Joi.string().required(),
    favorite: Joi.boolean().optional(),
    images: Joi.array().items(Joi.string()),
  });

  return schema.validate(car);
}

module.exports = { Car, validateCar };
