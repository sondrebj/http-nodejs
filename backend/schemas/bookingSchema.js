// we import mongoose
const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
    startBookingDate: {
      type: String,
      required: true,
      unique: true,
    },
    endBookingDate: {
      type: String,
      required: true,
    },
    toolName: {
      type: String,
      required: true,
    },
    toolID: {
      type: String,
      required: true,
    }
  });

// export 
    module.exports = mongoose.model("bookingSchema", bookingSchema)