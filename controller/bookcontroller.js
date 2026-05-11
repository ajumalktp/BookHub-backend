const { Book, Cart } = require("../models/books"); // ✅ Correct import

// ✅ Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ✅ Get single book
exports.getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch book" });
  }
};

// ✅ Add new book (with image support)
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBook = new Book({
      title,
      author,
      price,
      description,
      image: imagePath,
    });

    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add book" });
  }
};

// ✅ Update book (with image update support)
exports.updateBook = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = {
      title,
      author,
      price,
      description,
    };

    if (imagePath) updatedData.image = imagePath;

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook)
      return res.status(404).json({ success: false, message: "Book not found" });

    res.json({ success: true, data: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update book" });
  }
};

// ✅ Delete book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete book" });
  }
};

// ----------------- CART CONTROLLERS -----------------

// ✅ Get all cart items
exports.getCartItems = async (req, res) => {
  try {
    const items = await Cart.find().populate("book");
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Add book to cart
exports.addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const item = await Cart.findOne({ book: bookId });

    if (item) {
      return res.status(400).json({ message: "Already in cart" });
    }

    const newItem = new Cart({ book: bookId });
    await newItem.save();

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Remove book from cart
exports.removeFromCart = async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
