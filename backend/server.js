const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const placesRoutes = require("./routes/posts-route");
const usersRoute = require("./routes/users-route");
const bookmarkRoutes = require("./routes/bookmark-route");
const HttpError = require("./models/http-error");

const mongo = require("./config/mongoose");

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongo.connect();

app.use("/api/posts", placesRoutes);

app.use("/api/user", usersRoute);

app.use("/api/bookmark", bookmarkRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found :(" });
});

// app.use((error, req, res, next) => {
//   console.log("no error thrown");
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json(error.message || "Something went wrong");
// });

app.listen(process.env.PORT || 5000);
