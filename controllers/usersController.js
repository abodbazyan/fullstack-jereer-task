const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./../config/keys");

exports.register = (req, res, next) => {
  const { email, username, password, number, countryCode } = req.body;
  User.findOne({ $or: [{ email }, { username }] }).then((user) => {
    if (user) {
      return res.status(400).json({
        errorMsg: "Email or Username already exists",
      });
    } else {
      const newUser = new User({
        username,
        email,
        password,
        phone: {
          number,
          countryCode,
        },
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(404).json({ errorMsg: "Wrong Credentials" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };
        jwt.sign(payload, keys.jwtKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        return res.status(400).json({ errorMsg: "Wrong Credentials" });
      }
    });
  });
};
