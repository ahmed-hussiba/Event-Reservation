const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: { type: Number, required: true },
  date: { type: Date, required: true },
  totalPrice: { type: Number },
  countOfTickets: { type: Number },
  orderDetails: {
    type: [
      {
        eventId: Number,
        numberOfTickets: Number,
        totalPrice: Number,
        level: { type: String, enum: ["golden", "silver", "platinum"] },
      },
    ],
  },
});

module.exports = mongoose.model("Order", orderSchema);
