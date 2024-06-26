require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7000;
const regRoute = require("../Backend/Routes/Register.route");
const loginRoute = require("../Backend/Routes/Login.Route");
const reviewRoute = require("./Routes/Review.Route");
const userRoute = require("./Routes/User.Route");
const orderRoute = require("./Routes/Order.Route");
const eventRoute = require("./Routes/Event.Route");
const path = require("path");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "User-Profile-Images")));
// mongodb+srv://peterashrafmail:crossplatformPeter@cluster0.cwjy943.mongodb.net/Tiatro
// mongodb://localhost:27017/EventReservation
mongoose
  .connect(
    "mongodb+srv://peterashrafmail:crossplatformPeter@cluster0.cwjy943.mongodb.net/Tiatro"
  )
  .then(() => {
    // app.use(cors());
    app.use(
      cors({
        exposedHeaders: ["x-auth-token"],
         // Specify the headers you want to expose
      })
    );
    //register api
    app.get("/",(req,res)=>{
      res.send("hello to server")
    })
    app.use("/api/register", regRoute);

    //login api
    app.use("/api/login", loginRoute);

    //review api
    app.use("/api/reviews", reviewRoute);

    //users api
    app.use("/api/users", userRoute);

    //event api
    app.use("/api/event", eventRoute);

    //orders api
    app.use("/api/orders", orderRoute);

    app.listen(PORT, () => {
      console.log("listening on port http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("error in connection");
  });
