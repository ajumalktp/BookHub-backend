const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ✅ Import your controller functions
const {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
  getCartItems,
  addToCart,
  removeFromCart
} = require("../controller/bookcontroller");

// ✅ Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

// ✅ Routes
router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBook);

// ✅ Add and update routes with image upload
router.post("/add", upload.single("image"), addBook);
router.put("/update/:id", upload.single("image"), updateBook);

router.delete("/delete/:id", deleteBook);

// ✅ Cart routes
router.get("/cart", getCartItems);
router.post("/cart", addToCart);
router.delete("/cart/:id", removeFromCart);

module.exports = router;
