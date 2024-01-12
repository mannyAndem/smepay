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
// when faced with a choice, choose both

/* 
this burning desire for God, sometimes like a rushing wind and 
at the same time like latex oozing from rubber...

it's an unexplainable hunger and thirst; as the craving 
for water experienced by one returning from the desert dies 
a short while after one returns to the "land of the living", 
so does this feeling fade away after the cares and 
worries of this world creep in, but deep down one still 
needs a drink everyday

Grace always abounds, but can we perpetually put one leg in God's
boat and another in the devil's? God forbid ~

Grace is not a license to sin, but the flesh still wants sin
Who shall deliver one from this body (yeah, you thought right,
this body of sin/death)

Unfolding mercies and grace shouldn't be taken for granted, for
one ought to seek to please God, rather than being merely grateful
for the availability of these gifts (that we do not deserve) 
from God, I mean, man is but mere "dust of the ground"
*/