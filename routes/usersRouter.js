const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const passport = require("passport");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

// * Routes that requires Auhtorization
router.use(passport.authenticate("jwt", { session: false }));

router.get("/current", (req, res) =>
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  })
);

module.exports = router;
