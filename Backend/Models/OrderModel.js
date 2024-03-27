const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  userID: { type: Number, required: true },
  date: { type: Date, required: true },
  state: { type: String, enum: ["pending", "accepted", "rejected"] },
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
