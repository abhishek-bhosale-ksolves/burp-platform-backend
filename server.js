const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");

// Configs
const connectDB = require("./config/dbconnection");
require("./config/passport")(passport);
dotenv.config();

// Routes
const positionRoute = require("./routes/positionRoute");
const referralRoute = require("./routes/referralRoute");
const authRoute = require("./routes/authRoute");
const requestRoute = require("./routes/requestRoute");

const app = express();
const port = 5000;

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://burp-ksolves.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // only for HTTPS
      sameSite: "None", // allows cross-site
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/positions", positionRoute);
app.use("/api/referrals", referralRoute);
app.use("/auth", authRoute);
app.use("/api/users/request", requestRoute);
app.use("/api/users", require("./routes/usersRoute"));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
