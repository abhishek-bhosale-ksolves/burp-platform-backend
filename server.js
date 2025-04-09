const express = require("express");
const connectDB = require("./config/dbconnection");
const port = 5000;
const app = express();
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require("./config/passport")(passport);

// Database connection
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://burp-ksolves.netlify.app",
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: "https://burp-ksolves.netlify.app",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "None",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://burp-ksolves.netlify.app",
    failureRedirect: "https://burp-ksolves.netlify.app",
  })
);

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/api/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

// Position routes
const positionRoute = require("./routes/positionRoute");
app.use("/api/positions", positionRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
