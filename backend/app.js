const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");
const usersRoutes = require("./routes/users");

dotenv.config();

const app = express();

// Połączenie z bazą danych MongoDB przy użyciu mongoose
mongoose.connect(process.env.MONGODB_URI, {});

// Obsługa zdarzenia połączenia z bazą danych
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Konfiguracja i użycie sesji
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Obsługa middleware
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

// Ustawienie tras
app.use("/auth", authRoutes);
app.use("/cars", carsRoutes);
app.use("/users", usersRoutes);

module.exports = app;
