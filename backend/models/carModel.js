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
        photoId: {
          type: mongoose.Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId, // Wywołaj funkcję, aby uzyskać nowy ObjectId
          unique: true,
        },
        url: {
          type: String,
          validate: {
            validator: (value) => typeof value === "string",
            message: "Invalid photo URL",
          },
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
