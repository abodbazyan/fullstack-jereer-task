const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

// * Routes that requires Auhtorization
router.use(passport.authenticate("jwt", { session: false }));

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(postsController.createPost);

module.exports = router;
