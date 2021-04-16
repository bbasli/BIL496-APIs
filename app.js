const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");
const earthquakeRoutes = require("./routes/earthquake");
const postRoutes = require("./routes/post");
const contactRoutes = require("./routes/contact");
const locationRoutes = require("./routes/location");
const fireRoutes = require("./routes/fire");
const floodRoutes = require("./routes/flood");
const commentRoutes = require("./routes/comment");
const emergencyRoutes = require("./routes/emergency");

const app = express();
dotenv.config();

app.use(helmet());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/earthquake", earthquakeRoutes);
app.use("/api/post", postRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/fire", fireRoutes);
app.use("/api/flood", floodRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/emergency", emergencyRoutes);

app.use((error, req, res, next) => {
  console.log("error middleware :(", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use((req, res, next) => {
  res.send("No data to show/send");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mycluster.i3aby.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    console.log("CONNECTED TO DATABASE");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log("DBConnection Error", err);
  });
