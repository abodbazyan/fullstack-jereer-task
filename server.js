const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const users = require("./routes/usersRouter");
const posts = require("./routes/postsRouter");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded());

const database = require("./config/keys").mongoURI;
mongoose
  .connect(database)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

// Passport authentication middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
