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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    photos: [
      {
        type: String,
        validate: {
          validator: (value) => {
            // Custom validation for each photo URL
            // You can customize this validation based on your needs
            // For simplicity, this example checks if the value is a string
            return typeof value === "string";
          },
          message: "Invalid photo URL",
        },
      },
    ],
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

// Validation schema for updating photos
const updatePhotosSchema = Joi.object({
  photos: Joi.array().items(Joi.string().uri()).required(),
});

module.exports = { Car, updatePhotosSchema };
