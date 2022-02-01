const express = require("express");
const router = express.Router();

const Users = require("../users/users_model");

const {
  checkUserExists,
  checkForUsername,
  checkPasswordCorrect,
  checkForContact,
  hashThePassword,
} = require("../middleware/authMiddleware");

const { validateUser } = require("../middleware/userMiddleware");

//[POST] /auth/register
router.post(
  "/register",
  validateUser,
  checkForUsername,
  checkForContact,
  hashThePassword,
  (req, res, next) => {
    Users.create(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

//[POST] /auth/login
// TODO need to get user_id somehow. Not working
router.post(
  "/login",
  checkUserExists,
  checkPasswordCorrect,
  (req, res, next) => {
    try {
      res.status(200).json({
        user_id: req.user_id,
        message: `Welcome back ${req.body.username}`,
        token: req.token,
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
