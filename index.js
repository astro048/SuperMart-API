const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

// Use public DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Create Express app
const app = express();
app.set('trust proxy', 1);

// Debug
console.log("MONGO_URI:", process.env.MONGO_URI ? "Found ✅" : "Missing ❌");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});