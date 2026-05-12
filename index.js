const dns = require("node:dns/promises")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const path = require("path");


const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ FIXED: Allow both local + deployed frontend
const allowedOrigins = [
  "http://localhost:5174",
  
  "https://fullstack-frontent.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
const bookRoute = require("./routes/bookroutes");
app.use("/api/books", bookRoute);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running...");
});

// ✅ Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
