const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const Booking = require("./models/booking");

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options(/(.*)/, cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client")));


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cabtaxi")
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
  res.json({ ok: true, message: "Backend is healthy" });
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