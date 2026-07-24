const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Booking = require("./models/booking");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://taxi-1-kvpm.onrender.com",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
].filter(Boolean);
const isAllowedOrigin = (origin) =>
  !origin ||
  allowedOrigins.includes(origin) ||
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
// Middleware
app.use((req, res, next) => {
  const origin = req.get("origin");

  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client")));


// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URL ||
  "mongodb://127.0.0.1:27017/cabtaxi";

if (!process.env.MONGO_URI && !process.env.MONGODB_URI && !process.env.MONGO_URL) {
  console.log("⚠️  No MongoDB env var found. Falling back to local MongoDB at:", mongoURI);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });


// Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "Backend is healthy",
    version: "v2"
  });
});

// Save Booking
app.post("/book-cab", async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      ride,
      vehicle,
      pickup,
      drop,
      date,
      time
    } = req.body;


    const booking = new Booking({
      name,
      email,
      phone,
      ride,
      vehicle,
      pickup,
      drop,
      date,
      time,
      status: "Pending"
    });


    await booking.save();


    res.json({
      success: true,
      message: "Booking Saved Successfully",
      booking
    });


  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});



// Get All Bookings (Admin Dashboard)
app.get("/bookings", async (req, res) => {

  try {

    const bookings = await Booking.find();
    res.json(bookings);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// Update Booking Status
app.put("/bookings/:id", async (req, res) => {

  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );


    res.json(booking);


  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// Delete Booking
app.delete("/bookings/:id", async (req, res) => {

  try {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking Deleted Successfully"
    });


  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});