const express = require("express");
const bodyparser = require("body-parser");
// const path = require('path')
const passport = require("passport");
const ckSession = require("cookie-session");
const multer = require("multer");

const userRoute = require("./routes/user");
const clientRoute = require("./routes/client");

// importing keys from files to use
const { port_no } = require("./config/secret_keys");
const { connectDB } = require("./config/db");
const { logger } = require("./config/logger");

const app = express();

require('./config/google_auth')

app.use(
  ckSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
// VERIFY THESE KEYS VALUES

// intialize passport to use in other parts of the application
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json());
// helps server understand all client json data

// to allow for uploading of images
// into a folder accessible locally
app.use(multer({ dest: "images/" }).single("image"));

// // ensure images are allowed and easily accessible
// app.use('/images', express.static(path.join(__dirname, 'images')))

// set headers to restrict authorization access only allowing user with
// token saved in the model
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// defining a test router for home page of the backend
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Smepay! You shouldn't be here though" });
});

// calling the new routes for accessibility by users
app.use(userRoute);

app.use("/smepay", clientRoute);

// errors from the above middlewares (see all catch in controllers)
// are sent to the middleware below (error middleware)

// creating a next middleware to handele of error
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message;
  const data = err.data;
  res.status(status).json({ message: msg, data: data });
});

// connect to database
connectDB();

// listen on port and send server starting info via logger
app.listen(port_no, "0.0.0.0", () =>
  logger.info(`Connection live on port: ${port_no}`)
);

// GUCHI - all over you
