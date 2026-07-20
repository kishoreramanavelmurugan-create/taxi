const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  ride: {
    type: String,
    required: true
  },

  vehicle: {
    type: String,
    required: true
  },

  pickup: {
    type: String,
    required: true
  },

  drop: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

});

module.exports = mongoose.model("Booking", bookingSchema);