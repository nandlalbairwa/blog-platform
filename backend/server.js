const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// uploads folder access
app.use("/uploads", express.static("uploads"));

// frontend folder serve karo
app.use(express.static(path.join(__dirname, "../frontend")));

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});