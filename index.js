const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const dns = require("dns");

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"])

// Debug (remove after deployment works)
console.log("MONGO_URI:", process.env.MONGO_URI ? "Found ✅" : "Missing ❌");


connectDB();
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/bills', require('./routes/billRoutes'))

const app = express();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Server running on port ${PORT}`);
});
=======
  console.log(`Server running on port ${PORT}`)
})
>>>>>>> 5864a8a01f818cc08df58c665f58e032896793f8
