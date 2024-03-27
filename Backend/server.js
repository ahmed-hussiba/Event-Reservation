require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 7000;
const regRoute = require("../Backend/Routes/Register.route");
const loginRoute = require("../Backend/Routes/Login.Route");
const reviewRoute = require("./Routes/Review.Route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/EventReservation")
  .then(() => {
    //register api
    app.use("/api/register", regRoute);

    //login api
    app.use("/api/login", loginRoute);

    //review api
    app.use("/api/reviews", reviewRoute);

    //route api
    app.use("/api/orders", orderRoute);
    app.listen(PORT, () => {
      console.log("listening on port http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("error in connection");
  });
