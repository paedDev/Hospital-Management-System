import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// CRUD
// Create an account

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email has been already taken",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,

      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(`Registration error :`, error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// Login an account
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error(`Error in login`, error);
    res.status(500).json({
      message: "Error in login",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      users,
      message: "Fetched all the users",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
//Update an account
export const updateUsers = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, password } = req.body;
  if (!firstName && !lastName && !email && !password && !role === undefined) {
    return res.status(400).json({
      message: "At least one field must be provided for update",
    });
  }
  try {
    let updates = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, password },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {}
};
//Delete an account
export const deleteUsers = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error,
    });
  }
};
