const express = require("express");
const router = express.Router();

//middleware
const { restricted, hashThePassword } = require("../middleware/authMiddleware");
const {
  checkIfUserExists,
  checkIfLoggedInUser,
  validateUser,
} = require("../middleware/userMiddleware"); 

const Users = require("../users/users_model");

// [GET] /users/:user_id
router.get("/:user_id", checkIfUserExists, restricted, (req, res, next) => {
    Users.findUser({user_id: req.params.user_id})
    .then((user) => {
        res.status(200).json(user)
    })
    .catch(next)
});

// [GET] /users/:user_id/iso
router.get("/:user_id/iso", restricted, checkIfUserExists, (req, res, next) => {
    Users.findUserIso(req.params.user_id)
    .then((iso => {
        res.status(200).json(iso)
    }))
    .catch(next)
});

// [GET] /users/:user_id/have
router.get("/:user_id/have", restricted, checkIfUserExists, (req, res, next) => {
    Users.findUserHave(req.params.user_id)
    .then((have) => {
        res.status(200).json(have)
    })
    .catch(next)
});

// [PUT] /users/:user_id
//TODO currently have it written as if pw can be changed, but need frontend to make it separate
router.put("/:user_id", restricted, validateUser, hashThePassword, checkIfUserExists, checkIfLoggedInUser, (req, res, next) => {
    Users.update(req.params.user_id, req.body)
    .then((updatedUser) => {
        res.status(200).json(updatedUser)
    })
    .catch(next)
});

//TODO how to handle updating password?

// [DELETE] /users/:user_id
//TODO need to figure out a way to make sure an admin can delete the account
router.delete("/:user_id", restricted, checkIfUserExists, checkIfLoggedInUser, (req, res, next) => {
    Users.removeUser(req.params.user_id)
    .then((removed) => {
        res.status(200).json(removed)
    })
    .catch(next)
});

module.exports = router;
