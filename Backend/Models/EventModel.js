const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, minLength: 3, maxLength: 40, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Sports", "Theater", "Arts", "Concert", "Entertainment"],
  },
  description: { type: String, trim: true },
  imageURl: {
    type: String,
    required: true,
    pattern: "^(.+)(.jpg|.png|.jpeg)$",
  },
  performer: { type: String, required: true },
  organizer: { type: String, required: true },
  userReview: { type: [String] },
  promotion: { type: Number },
  ticketsAvailable: {
    type: [
      {
        level: { type: String, enum: ["silver", "golden", "platinum"] },
        price: Number,
        quantity: Number,
      },
    ],
  },
});

module.exports = mongoose.model("Event", eventSchema);
