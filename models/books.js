const mongoose = require("mongoose");

// --- Book Schema ---
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Book author is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Book price is required"],
    min: [0, "Price must be a positive number"],
  },
  description: {
    type: String,
    required: [true, "Book description is required"],
    trim: true,
  },
  image: {
    type: String,
  },
  language: {
    type: String,
    default: "English",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// --- Cart Schema ---
const cartSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Make sure this matches the Book model name
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Quantity cannot be less than 1"],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// --- Models ---
const Book = mongoose.model("Book", bookSchema);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Book, Cart };
