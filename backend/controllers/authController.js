const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Model użytkownika
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", userSchema);

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Zapisz identyfikator użytkownika w sesji po rejestracji
    req.session.userId = newUser._id;

    res.status(201).json({
      user: { name: newUser.name, email: newUser.email, userId: newUser._id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Zapisz identyfikator użytkownika w sesji po udanym logowaniu
    req.session.userId = user._id;

    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, userId: user._id, name: user.name }, // Dodaj pole name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  // Wyloguj użytkownika usuwając sesję
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  User,
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
