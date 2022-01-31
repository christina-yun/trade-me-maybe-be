const express = require("express");
const router = express.Router();

// middleware goes here
const { restricted } = require("../middleware/authMiddleware");

const {
  checkIfUserExists,
  checkIfLoggedInUser,
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
// restricted, checkIfUserExists
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
//TODO middleware that checks current user matches :user_id
//TODO need to figure out a way to make sure only that particular logged in user can update their own account
//restricted, checkifUserExists, checkIfLoggedInUser
router.put("/:user_id", restricted, checkIfUserExists, (req, res, next) => {
    Users.update(req.params.user_id, req.body)
    .then((updatedUser) => {
        res.status(200).json(updatedUser)
    })
    .catch(next)
});

//TODO how to handle updating password?

// [DELETE] /users/:user_id
//TODO need to figure out a way to make sure only that particular logged in user or an admin can delete the account
//checkIfUserExists, checkIfLoggedInUser
router.delete("/:user_id", restricted, checkIfUserExists, (req, res, next) => {
    Users.removeUser(req.params.user_id)
    .then((removed) => {
        console.log(removed)
    })
    .catch(next)
});

module.exports = router;
